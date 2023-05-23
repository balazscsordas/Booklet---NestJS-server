import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Booklet API')
  .setDescription(
    'This is a server built with Nest.js for an application called Booklet.',
  )
  .setVersion('1.0')
  .build();

export default swaggerConfig;
