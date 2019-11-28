// @ts-ignore
import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('search')
  async search(@Query('key') key) {
    return await this.appService.search(key);
  }
}
