import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS Setting - Local
  app.enableCors({ 
    origin : 'http://localhost:3000',
    methods : 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials : true
  });

  await app.listen(4000);
  console.log("NestJS Running.")
}

bootstrap()

