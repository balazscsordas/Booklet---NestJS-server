import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './word.entity';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';
import { WordHelperService } from 'src/helpers/word-helper.service';

@Module({
  imports: [TypeOrmModule.forFeature([Word])],
  controllers: [WordsController],
  providers: [WordsService, WordHelperService],
})
export class WordsModule {}
