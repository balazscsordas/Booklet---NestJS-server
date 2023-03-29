import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordsModule } from './words/words.module';
import { Word } from './words/word.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PW,
      database: process.env.DB,
      entities: [Word],
      synchronize: true,
    }),
    WordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
