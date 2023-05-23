import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { NewProfileDataDto } from './dto/NewProfileData.dto';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'src/models/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    private jwtService: JwtService,
  ) {}

  async addNewProfile(profileData: NewProfileDataDto, user_id: number) {
    try {
      const newProfile = this.profileRepository.create({
        ...profileData,
        user_id,
      });
      const savedProfile = await this.profileRepository.save(newProfile);
    } catch (err) {
      console.log(err);
      if (err instanceof QueryFailedError) {
        throw new HttpException(
          `Data validation failed while saving the new profile to the database.`,
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

  async getProfiles(user_id: number) {
    try {
      const profiles = await this.profileRepository.find({
        where: { user_id },
      });
      return profiles;
    } catch (err) {
      console.log(err);
      if (err.status == 204) {
        throw new HttpException(
          'User doesnt have any profiles',
          HttpStatus.NO_CONTENT,
        );
      } else {
        throw new HttpException(
          `Serverside error occured.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async setProfile(profile_id: number, user_id: number) {
    try {
      const jwtPayload = { profile_id, user_id };
      const profileToken = await this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_SECRET,
      });
      return profileToken;
    } catch (err) {
      throw new HttpException(
        `Serverside error occured, please try again later.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getLanguageOptions(profile_id: number) {
    try {
      const profile = await this.profileRepository.findOne({
        where: { id: profile_id },
      });
      if (!profile) {
        throw new UnauthorizedException();
      }
      const languageOptions = {
        primaryLanguage: profile.primaryLanguage,
        secondaryLanguage: profile.secondaryLanguage,
      };
      return languageOptions;
    } catch (err) {
      console.log(err);
      if (err.status == 401) {
        throw new HttpException(
          'User doesnt have any profiles',
          HttpStatus.NO_CONTENT,
        );
      } else {
        throw new HttpException(
          `Serverside error occured.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
