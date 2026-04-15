import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform: true,
  }));

  //CORSの設定有効化（3000番からのアクセスを許可）
  app.enableCors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATH,POST,DELETE",
    credentials:true,
  });
    // 3001番ポートで待ち受け開始
    await app.listen(3000);
    console.log(`アプリケーションは http://localhost:3001 で実行されています。`);
  

}
bootstrap();
