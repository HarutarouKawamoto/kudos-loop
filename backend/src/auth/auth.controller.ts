import { Body , Controller, Post} from '@nestjs/common'
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service'  

@Controller('auth')
export class AuthController{
    
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ){}
    @Post('signup')
    async signup(@Body() signupDto: SignupDto){
        //DBに保存せず、受け取ったデータをそのまま返すテスト用の処理
        console.log('受け取ったデータ：',signupDto);
        return this.usersService.createUser(signupDto)
    }
    @Post('login')
    async login(@Body() dto : LoginDto){
        return this.authService.login(dto);
    }


}