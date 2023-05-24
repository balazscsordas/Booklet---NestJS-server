import { Controller, Get } from '@nestjs/common';
import { PublicRoute } from './decorators/public-route.decorator';

@Controller()
export class AppController {
  @PublicRoute()
  @Get()
  getHello(): string {
    return 'Hello';
  }
}
