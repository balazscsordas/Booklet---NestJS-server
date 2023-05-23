import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { NewProfileDataDto } from './dto/NewProfileData.dto';
import { Request } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @ApiOperation({ summary: 'Creates a new profile in an account.' })
  @Post('addNewProfile')
  async addNewProfile(
    @Body() profileData: NewProfileDataDto,
    @Req() req: Request,
  ) {
    const user_id: number = req['user_id'];
    return this.profileService.addNewProfile(profileData, user_id);
  }

  @ApiOperation({ summary: 'Returns all of the profiles of a specific user.' })
  @Get('getProfiles')
  async getProfiles(@Req() req: Request) {
    const user_id: number = req['user_id'];
    return this.profileService.getProfiles(user_id);
  }

  @ApiOperation({
    summary: 'Returns a JWT token, which contains the profile_id.',
  })
  @Post('setProfile')
  async setProfile(@Body() Body: { profile_id: number }, @Req() req: Request) {
    const { profile_id } = Body;
    const user_id: number = req['user_id'];
    const profileToken = await this.profileService.setProfile(
      profile_id,
      user_id,
    );
    return { profileToken };
  }

  @ApiOperation({
    summary: 'Returns the language options of a specific profile.',
  })
  @Get('getLanguageOptions')
  async getLanguageOptions(@Req() req: Request) {
    const profile_id: number = req['profile_id'];
    const languageOptions = await this.profileService.getLanguageOptions(
      profile_id,
    );
    return languageOptions;
  }
}
