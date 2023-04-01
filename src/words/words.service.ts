import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { AddNewWordDto } from './dto/AddNewWord.dto';
import { EditWordDto } from './dto/EditWord.dto';
import { Word } from './word.entity';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(Word) private wordRepository: Repository<Word>,
  ) {}

  async getOneRandom(userId: number) {
    try {
      const randomWord = await this.wordRepository
        .createQueryBuilder('word')
        .select()
        .where({ user_id: userId })
        .orderBy('RAND()')
        .getOne();
      if (randomWord == null) {
        throw new HttpException('Word list is empty', HttpStatus.NO_CONTENT);
      }
      const randomWordDto = {
        id: randomWord.id,
        wordFrom: randomWord.hun,
        wordTo: randomWord.eng,
      };
      return randomWordDto;
    } catch (err) {
      if (err.status == 204) {
        throw new HttpException('Word list is empty', HttpStatus.NO_CONTENT);
      } else {
        throw new HttpException(
          `Serverside error occured.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getAll(page: number, userId: number) {
    try {
      const words = await this.wordRepository
        .createQueryBuilder('word')
        .select()
        .where({ user_id: userId })
        .skip((page - 1) * 20)
        .take(20)
        .getMany();
      if (words.length === 0 || !words) {
        throw new HttpException('Havent added any word', HttpStatus.NO_CONTENT);
      }
      return words;
    } catch (err) {
      console.log(err);
      if (err.status == 204) {
        throw new HttpException('Word list is empty', HttpStatus.NO_CONTENT);
      } else {
        throw new HttpException(
          `Serverside error occured.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getMaxPageNumber(userId: number) {
    try {
      const numberOfWords = await this.wordRepository.count({
        where: { user_id: userId },
      });
      if (numberOfWords === 0) {
        return 1;
      }
      const maxPageNumber = Math.ceil(numberOfWords / 20);
      console.log(maxPageNumber);
      return maxPageNumber;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        `Serverside error occured.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getLanguageOptions(userId: number) {
    try {
      const languageOptions = ['hun', 'eng'];
      return languageOptions;
    } catch (err) {
      console.log(err);
    }
  }

  async getOneById(id: number) {
    try {
      const word = await this.wordRepository.findOne({ where: { id } });
      if (!word) {
        throw new NotFoundException();
      }
      return word;
    } catch (err) {
      console.log(err);
      if (err.status == 404) {
        throw new HttpException(
          `There isnt any user with id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new HttpException(
          `Serverside error occured.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async addNewWord(newWordData: AddNewWordDto, userId: number) {
    try {
      const newWord = this.wordRepository.create({
        ...newWordData,
        user_id: userId,
      });
      const savedWord = await this.wordRepository.save(newWord);
    } catch (err) {
      console.log(err);
      if (err instanceof QueryFailedError) {
        throw new HttpException(
          `Data validation failed while saving the new word to the database.`,
          HttpStatus.NOT_IMPLEMENTED,
        );
      } else {
        throw new HttpException(
          'Serverside error occured',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async editWord(newWordData: EditWordDto, userId: number) {
    try {
      const word = await this.wordRepository.update(
        { id: newWordData.id },
        { ...newWordData, user_id: userId },
      );
      const editedWord = await this.wordRepository.findOne({
        where: { id: newWordData.id },
      });
      return editedWord;
    } catch (err) {
      console.log(err);
      if (err instanceof QueryFailedError) {
        throw new HttpException(
          `Data validation failed while saving the new word to the database.`,
          HttpStatus.NOT_IMPLEMENTED,
        );
      } else {
        throw new HttpException(
          'Serverside error occured',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async deleteOneById(id: number) {
    try {
      const deletedWord = await this.wordRepository.delete({ id });
      if (deletedWord.affected < 1 || !deletedWord) {
        throw new NotFoundException();
      }
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Serverside error occured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
