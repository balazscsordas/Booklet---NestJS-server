import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AddNewWordDto } from './dto/AddNewWord.dto';
import { EditWordDto } from './dto/EditWord.dto';
import { WordsService } from './words.service';
import { GetRandomWordDto } from './dto/GetRandomWord.dto';

@Controller('Words')
export class WordsController {
  constructor(private wordsService: WordsService) {}

  @Get('GetOneRandom')
  async getOneRandom(
    @Req() req: Request,
    @Query('languageFrom') languageFrom: string,
    @Query('languageTo') languageTo: string,
    @Query('randomLanguage') randomLanguage: string,
  ) {
    const userId: number = req['userId'];
    const quizSettings: GetRandomWordDto = {
      languageFrom,
      languageTo,
      randomLanguage,
    };
    const randomWordDto = await this.wordsService.getOneRandom(
      userId,
      quizSettings,
    );
    return randomWordDto;
  }

  @Get('GetOneById/:id')
  async getOneById(@Param('id') id: number) {
    const word = await this.wordsService.getOneById(id);
    return word;
  }

  @Get('GetAll')
  async getAll(
    @Query('page') page: string,
    @Query('searchParam') searchParam: string,
    @Req() req: Request,
  ) {
    const userId: number = req['userId'];
    const words = await this.wordsService.getAll(
      Number(page),
      searchParam,
      userId,
    );
    return words;
  }

  @Get('GetMaxPageNumber')
  async getMaxPageNumber(@Req() req: Request) {
    const userId: number = req['userId'];
    const maxPageNumber = await this.wordsService.getMaxPageNumber(userId);
    return maxPageNumber;
  }

  @Get('GetLanguageOptions')
  async getLanguageOptions(@Req() req: Request) {
    const userId: number = req['userId'];
    const languageOptions = await this.wordsService.getLanguageOptions(userId);
    return languageOptions;
  }

  @Post('AddNewWord')
  async addNewWord(@Body() newWordData: AddNewWordDto, @Req() req: Request) {
    const userId: number = req['userId'];
    return await this.wordsService.addNewWord(newWordData, userId);
  }

  @Put('EditWord')
  async editWord(@Body() newWordData: EditWordDto, @Req() req: Request) {
    const userId: number = req['userId'];
    return await this.wordsService.editWord(newWordData, userId);
  }

  @Delete('DeleteOneById/:id')
  async deleteOneById(@Param('id') id: number) {
    return await this.wordsService.deleteOneById(id);
  }
}
