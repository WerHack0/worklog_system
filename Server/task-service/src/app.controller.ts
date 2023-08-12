import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('log')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createLog(@Body() log:Log): Promise<Log>{
    return this.appService.createLog(log);
  }
}
