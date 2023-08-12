import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('list')
  async getWorkersList(){
    return await this.appService.getAllWorkers();
  }
  @Get('user/:id')
async getUser(@Param('id') id: number) {
  return this.appService.getUser(id);
}
  @Post('user')
  async createUser(@Body() userDto: any) {
    const user = await this.appService.createUser(userDto);
    const { userInfo, ...userWithoutUserInfo } = user;
    return userWithoutUserInfo;
  }
  @Post('user/:id')
  async updateUser(@Param('id') id: number, @Body() userDto: any) {
    console.log("Aktualizacja")
    return this.appService.updateUser(id, userDto);
  }
}
