import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PublicRoute } from './decorators/public-route.decorator';
import { CredentialsDto } from './dto/Credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicRoute()
  @Post('Login')
  async login(@Body() credentials: CredentialsDto) {
    return await this.authService.login(credentials);
  }

  @PublicRoute()
  @Post('Registration')
  async register(@Body() credentials: CredentialsDto) {
    return await this.authService.register(credentials);
  }
}