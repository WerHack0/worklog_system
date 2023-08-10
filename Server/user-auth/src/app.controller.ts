import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from './local.strategy';
import { UserInfo } from './user-info/user-info.entity';


@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}
 
  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  async getUserInfo(@Request() req){
    const userId = req.user.ID;
    return await this.appService.getUserInfo(userId);
  } 


  @Post('login')
  async login(@Body() user: User){
    const result = await this.appService.validateUser(user.email, user.password);
    console.log('Login response:', result);
    return result;
    
  }

}
