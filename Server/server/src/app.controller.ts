import { Body, Controller, Get, Post, Headers, Param, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user_info')
  async getUserInfo(@Headers('authorization') token: string){
    return await this.appService.getUserInfo(token);
  }
  @Get('users')
  async getUsers(){
    return this.appService.getUsers();
  }
  @Get('user/:id')
  async getUserById(@Param('id') id: number) {
    return await this.appService.getUserById(id);
}
  @Get('logsStatus')
  async getLogsStatus(@Query('userId') userId: number): Promise<any> {
    return this.appService.getLogsStatus(userId);
}
  @Get('admin/newLogs')
    async getNewLogs() {
    return this.appService.getNewLogs();
}
  @Get('tasks')
  async getTasks(@Query('userId') userId: number, @Query('month') month: number): Promise<any> {
    return this.appService.getTasks(userId, month);
}
  @Post('createUser')
  async createUser(@Body() dto: any){
    return this.appService.createUser(dto);
  }
  @Post('auth/login')
  async loginUser(@Payload() dto: any){
    return this.appService.loginUser(dto);
  }
  @Put('user/:id')
  async updateUser(@Param('id') id:number, @Body() dto:any){
    return this.appService.updateUser(id, dto);
  }
  @Put('admin/approveLogs')
async approveLogs(@Body('logIds') logIds: number[]): Promise<any> {
    return this.appService.approveLogs(logIds);
}

@Put('admin/rejectLogs')
async rejectLogs(@Body('logIds') logIds: number[]): Promise<any> {
    return this.appService.rejectLogs(logIds);
}
@Post('seedTask')
async seedTask(@Body() data: { userId: number, month: number }): Promise<any> {
  return this.appService.seedTask(data.userId, data.month);
}
@Post('createLog')
async createLog(@Body() log: any): Promise<any> {
  return this.appService.createLog(log);
}
}
