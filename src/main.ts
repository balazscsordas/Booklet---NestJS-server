import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    origin: [process.env.CLIENT_URL],
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Booklet API')
    .setDescription(
      'This is a server built with Nest.js for an application called Booklet.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
