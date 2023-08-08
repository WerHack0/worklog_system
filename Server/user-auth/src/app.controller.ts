import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user/user.entity';


@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  async getClients(): Promise<User[]>{
      return this.appService.getAllClients();
  }
  @Post()
    async createClient(@Body() user: User): Promise<User>{
        return this.appService.createUser(user);
    }
  @Post('login')
  async login(@Body() user: User){
    const result = await this.appService.validateUser(user.email, user.password);
    console.log('Login response:', result);
    return result;
    //return await this.appService.validateUser(user.email, user.password);
  }

}
