import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, QueryFailedError, Repository } from 'typeorm';
import { AddNewWordDto } from './dto/AddNewWord.dto';
import { EditWordDto } from './dto/EditWord.dto';
import { GetRandomWordDto } from './dto/GetRandomWord.dto';
import { WordFormatter } from './helper/word-formatter';
import { TextTranslateDto } from './dto/TextTranslate.dto';
import { TranslatorService } from 'src/services/translator/translator.service';
import { Word } from 'src/models/word.entity';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word) private wordRepository: Repository<Word>,
    private translatorService: TranslatorService,
  ) {}

  async getOneRandom(profile_id: number, quizSettings: GetRandomWordDto) {
    try {
      const randomWord = await this.wordRepository
        .createQueryBuilder('word')
        .select()
        .where({ profile_id })
        .orderBy('RAND()')
        .getOne();
      if (randomWord == null) {
        throw new HttpException('Word list is empty', HttpStatus.NO_CONTENT);
      }
      const formattedWord = WordFormatter(randomWord, quizSettings);
      return formattedWord;
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

  async getAll(page: number, searchParam: string, profile_id: number) {
    try {
      const words = await this.wordRepository
        .createQueryBuilder('word')
        .select()
        .where({ profile_id })
        .andWhere(
          new Brackets(qb => {
            if (searchParam) {
              qb.where('word.primaryLanguage LIKE :searchParam', {
                searchParam: `%${searchParam}%`,
              }).orWhere('word.secondaryLanguage LIKE :searchParam', {
                searchParam: `%${searchParam}%`,
              });
            }
          }),
        )
        .skip((page - 1) * 20)
        .take(20)
        .getMany();
      if (words.length === 0 || !words) {
        throw new HttpException('Havent added any word', HttpStatus.NO_CONTENT);
      }
      return words;
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

  async getMaxPageNumber(profile_id: number) {
    try {
      const numberOfWords = await this.wordRepository.count({
        where: { profile_id },
      });
      if (numberOfWords === 0) {
        return 1;
      }
      const maxPageNumber = Math.ceil(numberOfWords / 20);
      return maxPageNumber;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        `Serverside error occured.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTranslation(translateParams: TextTranslateDto) {
    try {
      const translatedText = await this.translatorService.translateText(
        translateParams,
      );
      return { translatedText };
    } catch (err) {
      if (err.status == 204) {
        throw new HttpException(
          'Daily translation quota has been exceeded.',
          HttpStatus.EXPECTATION_FAILED,
        );
      } else {
        throw new HttpException(
          `Serverside error occured.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getOneById(id: number) {
    try {
      const word = await this.wordRepository.findOne({ where: { id } });
      if (!word) {
        throw new NotFoundException();
      }
      const returnedWord = {
        id: word.id,
        primaryLanguage: word.primaryLanguage,
        secondaryLanguage: word.secondaryLanguage,
      };
      return returnedWord;
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

  async addNewWord(newWordData: AddNewWordDto, profile_id: number) {
    try {
      const newWord = this.wordRepository.create({
        ...newWordData,
        profile_id,
      });
      await this.wordRepository.save(newWord);
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

  async editWord(newWordData: EditWordDto, profile_id: number) {
    try {
      await this.wordRepository.update(
        { id: newWordData.id },
        { ...newWordData, profile_id },
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
