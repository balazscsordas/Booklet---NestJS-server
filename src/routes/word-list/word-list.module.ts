import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordListController } from './word-list.controller';
import { WordListService } from './word-list.service';
import { WordList } from 'src/models/word-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WordList])],
  controllers: [WordListController],
  providers: [WordListService],
})
export class WordListModule {}
