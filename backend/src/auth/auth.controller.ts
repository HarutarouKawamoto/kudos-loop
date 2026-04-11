import { Body , Controller, Post} from '@nestjs/common'
import { SignupDto } from './dto/signup.dto';
import { UsersService } from '../users/users.service'  

@Controller('auth')
export class AuthController{
    
    constructor(private readonly usersService: UsersService){}
    @Post('signup')
    async signup(@Body() signupDto: SignupDto){
        //DBに保存せず、受け取ったデータをそのまま返すテスト用の処理
        console.log('受け取ったデータ：',signupDto);
        return this.usersService.createUser(signupDto)
    }
}