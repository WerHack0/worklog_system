import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from './local.strategy';
import { EventPattern, MessagePattern } from '@nestjs/microservices';


@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}
 // potwiedzenie użytkownika
  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  async getUserInfo(@Request() req){
    const userId = req.user.ID;
   // return await this.appService.getUserInfo(userId);
  } 

  @MessagePattern('create_user')
  async createUser(@Body() createUserDto: User): Promise<{ID: number}>{
    const createdUser = await this.appService.createUser(createUserDto);
    return {ID: createdUser.ID}
  }

  @MessagePattern('auth' )
  async login(@Body() user: { email: string; password: string }): Promise<any>{
    const result = await this.appService.validateUser(user.email, user.password);
    console.log('Login response:', result);
    return result;
    
  }
  @MessagePattern('get_user_auth_info')
  async getUserAuthInfo(id: number) {
    console.log(id);
   return this.appService.getUserAuthInfo(id);
}

@MessagePattern('update_user_auth_info')
async updateUserAuthInfo(data: any) {
  console.log(data);
  return this.appService.updateUserAuthInfo(data.id, data);
}
}
