import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatedUserDto } from './created-user-dto/created-user-dto';
import { MessagePattern } from '@nestjs/microservices';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('get_users')
  async getWorkersList(){
    return await this.appService.getAllWorkers();
  }
  @MessagePattern('get_user')
  async getUserInfo(token: string){
    return this.appService.getUserInfo(token);
  }
  @MessagePattern('update_user')
  async updateUser(data: any) {
    return this.appService.updateUser(data.id, data);
}
  @MessagePattern('create_user_info')
  async createUser(@Body() userDto: CreatedUserDto) {
    const userId = await this.appService.createUser(userDto);
    const userInfo = await this.appService.saveUserInfo(userId, userDto);
    return { ID: userId,
    userInfo: userInfo };
  }
  @MessagePattern('get_user_info')
  async getUserById(id: number) {
    return await this.appService.getUserById(id);
}

}
