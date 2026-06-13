import { Injectable, InternalServerErrorException,NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async createTeam(name: string, userId: string) {
    const inviteCode = crypto.randomBytes(4).toString('hex');

    try {
      return await this.prisma.$transaction(async (tx) => {
        // チームをデータベースに作成
        const newTeam = await tx.team.create({
          data: {
            name: name,
            inviteCode: inviteCode,
          },
        });

        // 作成した本人の teamId を、今作ったチームのIDで更新
        await tx.user.update({
          where: { id: Number(userId)},
          data: { teamId: newTeam.id },
        });

        // 作成されたチーム情報（型定義が更新されたのでエラーになりません）を返す
        return newTeam;
      });
    } catch (error) {
      console.error('チーム作成エラー:', error);
      throw new InternalServerErrorException('チームの作成に失敗しました。');
    }
  }

  //joinTeam用
  async joinTeam(inviteCode: string, userId: string) {
    const team = await this.prisma.team.findUnique({
      where: { inviteCode: inviteCode },
    });

    if (!team) {
      throw new NotFoundException('無効な招待コードです。');
    }
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: Number(userId) },
        data: { teamId: team.id },
      });
      return {
        message: 'チームに参加しました。',
        teamId: team.id,
        teamName: team.name,
      };
    } catch (error) {
      console.error('チーム参加エラー:', error);
      throw new InternalServerErrorException('チームへの参加に失敗しました。');
          
    }
  }
}