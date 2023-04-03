import { NestFactory } from '@nestjs/core';
import cookieParser = require('cookie-parser');
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    origin: [process.env.CLIENT_URL],
  });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
