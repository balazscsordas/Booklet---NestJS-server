import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    origin: [process.env.CLIENT_URL],
  });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
