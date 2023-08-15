import { Repository } from 'typeorm';
import { UserInfo } from './user-info/user-info.entity';
import { CreatedUserDto } from './created-user-dto/created-user-dto';
import { JwtService } from '@nestjs/jwt';
export declare class AppService {
    private userInfoRepo;
    private jwtService;
    constructor(userInfoRepo: Repository<UserInfo>, jwtService: JwtService);
    private client;
    onModuleInit(): void;
    getAllWorkers(): Promise<UserInfo[]>;
    getUserInfo(token: string): Promise<UserInfo>;
    updateUser(id: number, dto: any): Promise<any>;
    createUser(userDto: any): Promise<number>;
    saveUserInfo(userId: number, userDto: CreatedUserDto): Promise<UserInfo>;
    getUserById(id: number): Promise<UserInfo>;
}
