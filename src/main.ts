import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'https://64243a57a7a6f1126a1c345a--unrivaled-gingersnap-14ff90.netlify.app',
      'https://unrivaled-gingersnap-14ff90.netlify.app/',
      'http://localhost:4200',
    ],
  });

  const config = new DocumentBuilder()
    .setTitle('Language App')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
