import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './auth.entity';
import { CredentialsDto } from './dto/Credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(credentials: CredentialsDto) {
    try {
      const foundUser = await this.userRepository.findOne({
        where: { email: credentials.email },
      });
      if (!foundUser) {
        throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED);
      }
      const isMatch = await bcrypt.compare(
        credentials.password,
        foundUser.password,
      );
      if (!isMatch) {
        throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED);
      }
      const jwtPayload = { email: foundUser.email, id: foundUser.id };
      const accessToken = await this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_SECRET,
      });
      return accessToken;
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

  async register(credentials: CredentialsDto) {
    try {
      const foundUser = await this.userRepository.findOne({
        where: { email: credentials.email },
      });
      if (foundUser) {
        throw new HttpException('User already exists', HttpStatus.FORBIDDEN);
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(credentials.password, salt);
      const newUser: CredentialsDto = {
        email: credentials.email,
        password: hashedPassword,
      };
      const userToSave = this.userRepository.create({ ...newUser });
      const savedUser = await this.userRepository.save(userToSave);
      if (!savedUser) {
        throw new HttpException(
          `Serverside error occured.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return { message: 'Registered' };
    } catch (err) {
      console.log(err);
      if (err.status == 403) {
        throw new HttpException('User already exists', HttpStatus.FORBIDDEN);
      } else {
        throw new HttpException(
          `Serverside error occured.`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
