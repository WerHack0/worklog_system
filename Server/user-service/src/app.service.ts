import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserInfo } from './user-info/user-info.entity';
import { User } from './user/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserInfo)
    private userInfoRepo: Repository<UserInfo>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async getAllWorkers(): Promise<UserInfo[]>{
    return this.userInfoRepo.find();
  }
  async createUser(userDto: any): Promise<User> {
    const userInfo = new UserInfo();
    userInfo.name = userDto.name;
    userInfo.surname = userDto.surname;
    userInfo.job_position = userDto.job_position;
    const user = new User();
    user.email = userDto.email;
    user.password = userDto.password;
    const savedUser = await this.userRepository.save(user);
    userInfo.user_ID = savedUser.ID;
    await this.userInfoRepo.save(userInfo);
    return savedUser;
}
async getUser(id: number): Promise<User> {
  const user = await this.userRepository.findOne({ where: { ID: id }, relations: ["userInfo"] });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}
async updateUser(id: number, userDto: any): Promise<User> {
  const user = await this.userRepository.findOne({ where: { ID: id }, relations: ["userInfo"] });
  if (!user) {
    throw new Error('User not found');
  }
  console.log(user);
  user.email = userDto.email;
  user.password = userDto.password;
  user.userInfo.name = userDto.name;
  user.userInfo.surname = userDto.surname;
  user.userInfo.job_position = userDto.job_position;
  await this.userRepository.save(user);
  await this.userInfoRepo.save(user.userInfo);
  return user;
}
}
