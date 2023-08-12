import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserInfo } from 'src/user-info/user-info.entity';


@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async createUser(userDto: any): Promise<User> {
    const userInfo = new UserInfo();
    userInfo.name = userDto.name;
    userInfo.surname = userDto.surname;
    userInfo.job_position = userDto.job_position;

    const user = new User();
    user.email = userDto.email;
    user.password = userDto.password;
    user.userInfo = userInfo;

    return this.save(user);
  }
}