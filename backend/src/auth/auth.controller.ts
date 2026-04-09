import { Body , Controller, Post} from '@nestjs/common'
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController{
    @Post('signup')
    signup(@Body() signupDto: SignupDto){
        //DBに保存せず、受け取ったデータをそのまま返すテスト用の処理
        console.log('受け取ったデータ：',signupDto);
        return {
            message: 'DTOのバリデーション通過を確認',
            data: signupDto,
        };
    }    
}