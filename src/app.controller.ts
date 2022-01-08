import { Controller, Get } from '@nestjs/common';

import { ApiOkResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('auth/healthy')
  @ApiOkResponse({ type: String })
  healthy(): string {
    return this.appService.healthy();
  }
}
