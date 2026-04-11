import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: 'super-secret-key' ,
            signOptions: { expiresIn: '60ms'},
        }),
    ],
    providers:[AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
