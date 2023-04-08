import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { NewProfileDataDto } from './dto/NewProfileData.dto';
import { Request } from 'express';

@Controller('Profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post('AddNewProfile')
  async addNewProfile(
    @Body() profileData: NewProfileDataDto,
    @Req() req: Request,
  ) {
    const user_id: number = req['user_id'];
    return this.profileService.addNewProfile(profileData, user_id);
  }

  @Get('GetProfiles')
  async getProfiles(@Req() req: Request) {
    const user_id: number = req['user_id'];
    return this.profileService.getProfiles(user_id);
  }

  @Post('SetProfile')
  async setProfile(@Body() Body: { profile_id: number }, @Req() req: Request) {
    const { profile_id } = Body;
    const user_id: number = req['user_id'];
    const profileToken = await this.profileService.setProfile(
      profile_id,
      user_id,
    );
    return { profileToken };
  }

  @Get('GetLanguageOptions')
  async getLanguageOptions(@Req() req: Request) {
    const profile_id: number = req['profile_id'];
    const languageOptions = await this.profileService.getLanguageOptions(
      profile_id,
    );
    return languageOptions;
  }
}
