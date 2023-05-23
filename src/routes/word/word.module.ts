import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslatorService } from 'src/services/translator/translator.service';
import { Word } from 'src/models/word.entity';
import { WordController } from './word.controller';
import { WordService } from './word.service';

@Module({
  imports: [TypeOrmModule.forFeature([Word])],
  controllers: [WordController],
  providers: [WordService, TranslatorService],
})
export class WordModule {}
