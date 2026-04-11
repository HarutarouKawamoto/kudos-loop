import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from '../auth/dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}
    async createUser(data: SignupDto){

        const hashedPassword = await bcrypt.hash(data.password, 10);
        console.log('ハッシュ化済みパスワード:', hashedPassword);
        return this.prisma.user.create({
            data:{
                email: data.email,
                name: data.name,
                password: hashedPassword,

            }
        })
    }

    async findOneByEmail(email: string){
        return this.prisma.user.findUnique({
            where: { email},
        });
    }
}

