import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from '../auth/dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}
    async createUser(data: SignupDto){
        return this.prisma.user.create({
            data:{
                email: data.email,
                password: data.password,
                name: data.name,
            }
        })
    }
}

