import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { todo } from 'node:test';
import { Log } from './log/log.entity';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('getTasks')
  async getTasks(@Body() query: { userId: number, month: number }): Promise<Log[]> {
    return this.appService.getTasks(query.userId, query.month);
}
@MessagePattern('seedTask')
  async seedTask(@Body() data:{userId: number, month: number}): Promise<any>{
    return this.appService.seedTask(data.userId, data.month);
  }
  @MessagePattern('createLog')
  async createLog(@Body() log:Log): Promise<Log>{
    return this.appService.createLog(log);
  }
  @MessagePattern('getLogsStatus')
async getLogsStatus(@Body() data: { userId: number }): Promise<Log[]> {
    return this.appService.getLogsStatus(data.userId);
}
@MessagePattern('getNewLogs')
async getNewLogs() {
    return this.appService.getNewLogs();
}

@MessagePattern('approveLogs')
async approveLogs(logIds: number[]): Promise<any> {
    return await this.appService.approveLogs(logIds);
}

@MessagePattern('rejectLogs')
async rejectLogs(logIds: number[]): Promise<any> {
    return await this.appService.rejectLogs(logIds);
}


@MessagePattern('rejectLog')
async rejectLog(data: { logId: number }) {
    return this.appService.rejectLog(data.logId);
}
}

