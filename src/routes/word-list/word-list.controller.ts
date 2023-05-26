import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WordListService } from './word-list.service';
import { Request } from 'express';
import { NewWordListDto } from './dto/NewWordList.dto';

@ApiTags('word-list')
@Controller('word-list')
export class WordListController {
  constructor(private wordListService: WordListService) {}

  @ApiOperation({
    summary: 'Returns all of the word lists of a specific profile.',
  })
  @Get('all')
  async getWordLists(@Req() req: Request) {
    const profile_id: number = req['profile_id'];
    const result = await this.wordListService.getWordLists(profile_id);
    console.log(result);
    return result;
  }

  @ApiOperation({
    summary:
      'Creates and returns the freshly created word list for a specific profile.',
  })
  @Post()
  async createWordList(
    @Body() newWordListData: NewWordListDto,
    @Req() req: Request,
  ) {
    const profile_id: number = req['profile_id'];
    return await this.wordListService.createWordList(
      newWordListData,
      profile_id,
    );
  }
}
