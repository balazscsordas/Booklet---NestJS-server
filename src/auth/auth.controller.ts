import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { PublicRoute } from './decorators/public-route.decorator';
import { CredentialsDto } from './dto/Credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicRoute()
  @Post('Login')
  async login(
    @Body() credentials: CredentialsDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const accessToken = await this.authService.login(credentials);
    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return { accessToken };
  }

  @PublicRoute()
  @Post('Registration')
  async register(@Body() credentials: CredentialsDto) {
    return await this.authService.register(credentials);
  }
}
