import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>, 
       
    ){}
    
      async findOne(email: string): Promise<User> {
        console.log(email);
        return this.userRepo.findOne({where: {email}});
      }
      async createUser(user: User): Promise<User> {
        return this.userRepo.save(user);
    }
    async findOneById(id: number): Promise<User> {
      const user = await this.userRepo.findOne({where: {ID:id}});
      console.log(user);
      if (!user) {
          throw new NotFoundException('Użytkownik nie został znaleziony');
      }
      return user;
  }
    async updateUser(id: number, dto: any): Promise<User> {
      const user = await this.userRepo.findOne({where:{ID:id}});
      return this.userRepo.save({ ...user, ...dto });
  }
  
}
