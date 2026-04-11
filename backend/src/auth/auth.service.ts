import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService} from '../users/users.service';
import { LoginDto} from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,

    ){}

    async validateUser(dto : LoginDto){
        const user = await this.usersService.findOneByEmail(dto.email);

        if (user && (await bcrypt.compare(dto.password, user.password))){
            const { password, ...result } = user;
            return result;
        }

        throw new UnauthorizedException('メールアドレスまたはパスワードが間違っています');
    }
    async login(dto: LoginDto) {
        const user = await this.validateUser(dto);
        //通行証（Payload）に入れる中身を決める
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}