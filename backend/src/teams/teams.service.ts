import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async createTeam(name: string, userId: string) {
    const inviteCode = crypto.randomBytes(4).toString('hex');

    try {
      return await this.prisma.$transaction(async (tx) => {
        // 1. チームをデータベースに作成
        const newTeam = await tx.team.create({
          data: {
            name: name,
            inviteCode: inviteCode,
          },
        });

        // 2. 作成した本人の teamId を、今作ったチームのIDで更新
        await tx.user.update({
          where: { id: userId as any},
          data: { teamId: newTeam.id },
        });

        // 3. 作成されたチーム情報（型定義が更新されたのでエラーになりません）を返す
        return newTeam;
      });
    } catch (error) {
      console.error('チーム作成エラー:', error);
      throw new InternalServerErrorException('チームの作成に失敗しました。');
    }
  }
}