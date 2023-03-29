import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './auth.entity';
import { CredentialsDto } from './dto/Credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async login(credentials: CredentialsDto) {
    try {
      const foundUser = await this.userRepository.findOne({
        where: { username: credentials.username },
      });
      if (!foundUser) {
        throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED);
      }
    } catch (err) {
      console.log(err);
      if (err.status == 401) {
        throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED);
      } else {
        throw new HttpException(
          `Serverside error occured.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
