import { Body, Controller, Post } from '@nestjs/common';
import { CredentialsDto } from './dto/Credentials.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { PublicRoute } from 'src/decorators/public-route.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Logs user into the system.' })
  @PublicRoute()
  @Post('login')
  async login(@Body() credentials: CredentialsDto) {
    const userToken = await this.userService.login(credentials);
    return { userToken };
  }

  @ApiOperation({ summary: 'Creates new user.' })
  @PublicRoute()
  @Post('registration')
  async register(@Body() credentials: CredentialsDto) {
    return await this.userService.register(credentials);
  }
}
