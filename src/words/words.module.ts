import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './word.entity';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';
import { TranslatorService } from 'src/services/translator/translator.service';

@Module({
  imports: [TypeOrmModule.forFeature([Word])],
  controllers: [WordsController],
  providers: [WordsService, TranslatorService],
})
export class WordsModule {}
