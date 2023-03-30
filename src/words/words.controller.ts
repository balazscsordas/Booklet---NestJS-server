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

@Controller('Words')
export class WordsController {
  constructor(private wordsService: WordsService) {}

  @Get('GetOneRandom')
  async getOneRandom(@Req() req: Request) {
    console.log(req['user']);
    const randomWordDto = await this.wordsService.getOneRandom();
    return randomWordDto;
  }

  @Get('GetOneById/:id')
  async getOneById(@Param('id') id: number) {
    const word = await this.wordsService.getOneById(id);
    return word;
  }

  @Get('GetAll')
  async getAll(@Query('page') page: string) {
    console.log(page);
    const words = await this.wordsService.getAll(Number(page));
    return words;
  }

  @Post('AddNewWord')
  async addNewWord(@Body() newWordData: AddNewWordDto) {
    return await this.wordsService.addNewWord(newWordData);
  }

  @Put('EditWord')
  async editWord(@Body() newWordData: EditWordDto) {
    return await this.wordsService.editWord(newWordData);
  }

  @Delete('DeleteOneById/:id')
  async deleteOneById(@Param('id') id: number) {
    return await this.wordsService.deleteOneById(id);
  }
}
