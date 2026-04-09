import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsEmail({}, { message: '有効なメールアドレスを入力してください' })
  @IsNotEmpty({ message: 'メールアドレスは必須です' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'パスワードは必須です' })
  @MinLength(8, { message: 'パスワードは8文字以上で入力してください' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: '名前は必須です' })
  name: string;
}