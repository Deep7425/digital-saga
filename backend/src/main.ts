import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
app.setGlobalPrefix('api');
 
  // Enable CORS
  app.enableCors({
origin: ['https://digitalsaga.in', 'http://localhost:5173'],
    credentials: true,
  });
 
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
 
  await app.listen(3001);
  console.log('Application is running on: http://localhost:3001');
}
bootstrap();