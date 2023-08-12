import { Repository } from 'typeorm';
import { UserInfo } from './user-info/user-info.entity';
import { User } from './user/user.entity';
export declare class AppService {
    private userInfoRepo;
    private readonly userRepository;
    constructor(userInfoRepo: Repository<UserInfo>, userRepository: Repository<User>);
    getAllWorkers(): Promise<UserInfo[]>;
    createUser(userDto: any): Promise<User>;
    getUser(id: number): Promise<User>;
    updateUser(id: number, userDto: any): Promise<User>;
}
