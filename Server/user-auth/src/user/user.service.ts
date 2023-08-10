import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserInfo } from 'src/user-info/user-info.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>, 
        @InjectRepository(UserInfo)
        private userInfoRepo: Repository<UserInfo> 
    ){}
    
      async findOne(email: string): Promise<User> {
        console.log(email);
        return this.userRepo.findOne({where: {email}, relations:['userInfo']});
      }

      

    async getUserInfo(userId: number): Promise<UserInfo> {
        return this.userInfoRepo.findOne({ where: { user_ID: userId }, relations: ['user'] });
      }
}
