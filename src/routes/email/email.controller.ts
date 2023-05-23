import { Body, Controller, Post } from '@nestjs/common';
import { PublicRoute } from 'src/decorators/public-route.decorator';
import { EmailService } from './email.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('email')
@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @ApiOperation({
    summary:
      'Sends a reset password link to a specific email (if it is in the database), which includes a link with a token.',
  })
  @PublicRoute()
  @Post('sendNewPasswordLink')
  async resetPassword(@Body() body: { email: string }) {
    return await this.emailService.sendNewPasswordLink(body.email);
  }

  @ApiOperation({
    summary: 'Checks if the reset password token is valid or not.',
  })
  @PublicRoute()
  @Post('verifyNewPasswordToken')
  async verifyNewPasswordToken(@Body() body: { token: string }) {
    return await this.emailService.verifyNewPasswordToken(body.token);
  }

  @ApiOperation({
    summary: 'Modifies the current password of a specific user.',
  })
  @PublicRoute()
  @Post('setNewPassword')
  async setNewPassword(@Body() body: { newPassword: string; token: string }) {
    return await this.emailService.setNewPassword(body.newPassword, body.token);
  }
}
