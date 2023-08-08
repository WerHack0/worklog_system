import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User> 
    ){}
    
      async findOne(email: string): Promise<User> {
        console.log(email);
        return this.userRepo.findOne({where: {email}});
      }

      async getAllClients(): Promise<User[]>{
        return await this.userRepo.find();
    }
    async createUser(user: User): Promise<User>{
        return await this.userRepo.save(user);
    }
}
