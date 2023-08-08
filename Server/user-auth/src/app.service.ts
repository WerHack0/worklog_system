import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './user/user.entity';
@Injectable()
export class AppService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async getAllClients(): Promise<User[]>{
    return await this.userService.getAllClients();
}
async createUser(user: User): Promise<User>{
  return await this.userService.createUser(user);
}
  async validateUser(username: string, password: string): Promise<any>{
    const user = await this.userService.findOne(username);

    return user && user.password === password
  ? { access_token: this.jwtService.sign({ username: user.email, sub: user.ID }) }
  : { success: false, message: 'Błąd logowania' };
  }
}

  
  

