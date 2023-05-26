import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WordList } from 'src/models/word-list.entity';
import { Repository } from 'typeorm';
import { NewWordListDto } from './dto/NewWordList.dto';

@Injectable()
export class WordListService {
  constructor(
    @InjectRepository(WordList)
    private wordListRepository: Repository<WordList>,
  ) {}

  async getWordLists(profile_id: number) {
    try {
      const wordLists = await this.wordListRepository.find({
        where: { profile_id },
      });
      return wordLists;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Serverside error occured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createWordList(newWordListData: NewWordListDto, profile_id: number) {
    try {
      const newWordList = this.wordListRepository.create({
        ...newWordListData,
        profile_id,
      });
      return await this.wordListRepository.save(newWordList);
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Serverside error occured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
