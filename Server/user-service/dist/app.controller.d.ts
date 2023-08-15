import { AppService } from './app.service';
import { CreatedUserDto } from './created-user-dto/created-user-dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getWorkersList(): Promise<import("./user-info/user-info.entity").UserInfo[]>;
    getUserInfo(token: string): Promise<import("./user-info/user-info.entity").UserInfo>;
    updateUser(data: any): Promise<any>;
    createUser(userDto: CreatedUserDto): Promise<{
        ID: number;
        userInfo: import("./user-info/user-info.entity").UserInfo;
    }>;
    getUserById(id: number): Promise<import("./user-info/user-info.entity").UserInfo>;
}
