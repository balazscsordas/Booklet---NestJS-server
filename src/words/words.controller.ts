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
    @Query('randomLanguage') randomLanguage: string,
  ) {
    const profile_id: number = req['profile_id'];
    const quizSettings: GetRandomWordDto = {
      languageFrom,
      randomLanguage,
    };
    const randomWordDto = await this.wordsService.getOneRandom(
      profile_id,
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
    const profile_id: number = req['profile_id'];
    const words = await this.wordsService.getAll(
      Number(page),
      searchParam,
      profile_id,
    );
    return words;
  }

  @Get('GetMaxPageNumber')
  async getMaxPageNumber(@Req() req: Request) {
    const profile_id: number = req['profile_id'];
    const maxPageNumber = await this.wordsService.getMaxPageNumber(profile_id);
    return maxPageNumber;
  }

  @Post('AddNewWord')
  async addNewWord(@Body() newWordData: AddNewWordDto, @Req() req: Request) {
    const profile_id: number = req['profile_id'];
    return await this.wordsService.addNewWord(newWordData, profile_id);
  }

  @Put('EditWord')
  async editWord(@Body() newWordData: EditWordDto, @Req() req: Request) {
    const profile_id: number = req['profile_id'];
    return await this.wordsService.editWord(newWordData, profile_id);
  }

  @Delete('DeleteOneById/:id')
  async deleteOneById(@Param('id') id: number) {
    return await this.wordsService.deleteOneById(id);
  }
}
