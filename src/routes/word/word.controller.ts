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
import { GetRandomWordDto } from './dto/GetRandomWord.dto';
import { TextTranslateDto } from './dto/TextTranslate.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WordService } from './word.service';

@ApiTags('word')
@Controller('word')
export class WordController {
  constructor(private wordService: WordService) {}

  @ApiOperation({
    summary: 'Returns a random word from the word list of a specific profile.',
  })
  @Get('random')
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
    const randomWordDto = await this.wordService.getOneRandom(
      profile_id,
      quizSettings,
    );
    return randomWordDto;
  }

  @ApiOperation({
    summary: 'Returns a specific word from the list of a specific profile.',
  })
  @Get('getOneById/:id')
  async getOneById(@Param('id') id: number) {
    const word = await this.wordService.getOneById(id);
    return word;
  }

  @ApiOperation({
    summary: 'Returns a list of words from the list of a specific profile.',
  })
  @Get('all')
  async getAll(
    @Query('page') page: string,
    @Query('searchParam') searchParam: string,
    @Req() req: Request,
  ) {
    const profile_id: number = req['profile_id'];
    const words = await this.wordService.getAll(
      Number(page),
      searchParam,
      profile_id,
    );
    return words;
  }

  @ApiOperation({
    summary:
      'Returns the maximum number of pages for the word list, based on the number of words in the list of a specific profile.',
  })
  @Get('maxPageNumber')
  async getMaxPageNumber(@Req() req: Request) {
    const profile_id: number = req['profile_id'];
    const maxPageNumber = await this.wordService.getMaxPageNumber(profile_id);
    return maxPageNumber;
  }

  @ApiOperation({
    summary:
      'Returns the translation for a specific word based on specific settings.',
  })
  @Post('translate')
  async getTranslation(@Body() translateParams: TextTranslateDto) {
    return await this.wordService.getTranslation(translateParams);
  }

  @ApiOperation({
    summary: 'Creates a new word in the list of a specific profile.',
  })
  @Post()
  async addNewWord(@Body() newWordData: AddNewWordDto, @Req() req: Request) {
    const profile_id: number = req['profile_id'];
    return await this.wordService.addNewWord(newWordData, profile_id);
  }

  @ApiOperation({
    summary: 'Edits a specific word.',
  })
  @Put()
  async editWord(@Body() newWordData: EditWordDto, @Req() req: Request) {
    const profile_id: number = req['profile_id'];
    return await this.wordService.editWord(newWordData, profile_id);
  }

  @ApiOperation({
    summary: 'Deletes a specific word.',
  })
  @Delete(':id')
  async deleteOneById(@Param('id') id: number) {
    return await this.wordService.deleteOneById(id);
  }
}
