import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AudioService } from './audio.service';
import { PublicRoute } from 'src/decorators/public-route.decorator';

@Controller('Audio')
export class AudioController {
  constructor(private audioService: AudioService) {}

  @PublicRoute()
  @Get('GetAudioUrl')
  async getAudioUrl(@Query() text: string) {
    const url = await this.audioService.getAudioUrl(text);
    return url;
  }
}
// a
