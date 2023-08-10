import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AppService {
  constructor(
    private userService: UserService,
    
    private jwtService: JwtService,
  ) {}
 
async getUserInfo(userId: number): Promise< any> {
  return await this.userService.getUserInfo(userId);
}

  async validateUser(username: string, password: string): Promise<any>{
    const user = await this.userService.findOne(username);
    console.log('User:', user); 
  console.log('UserInfo:', user?.userInfo);
    return user && user.password === password
  ? { access_token: this.jwtService.sign({ username: user.email, sub: user.ID }), user_id: user.ID, job_position: user.userInfo.job_position }
  : { success: false, message: 'Błąd logowania' };
  }
  async validateUserByPayload(payload: any): Promise<any> {
    const user = await this.userService.findOne(payload.username);
    if (user) {
      return { username: user.email, ID: user.ID};
    }
    throw new UnauthorizedException();
  }
}

  
  

