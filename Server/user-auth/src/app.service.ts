import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './user/user.entity';
@Injectable()
export class AppService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
 
  async getUserAuthInfo(id: number): Promise<any> {
    console.log(id);
    return this.userService.findOneById(id);
  }
  
  async updateUserAuthInfo(id: number, dto: any): Promise<any> {
    console.log(id);
    return this.userService.updateUser(id, dto);
  }
  async createUser(createUserDto: any): Promise<User> {
    const user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password; 
    return await this.userService.createUser(user);
}

  async validateUser(username: string, password: string): Promise<any>{
    const user = await this.userService.findOne(username);
    console.log('User:', user); 
    return user && user.password === password
  ? { access_token: this.jwtService.sign({ username: user.email, sub: user.ID }), user_id: user.ID }
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

  
  

