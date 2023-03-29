import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/Credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('Login')
  async login(@Body() credentials: CredentialsDto) {
    return await this.authService.login(credentials);
  }
}
