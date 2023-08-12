import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getWorkersList(): Promise<import("./user-info/user-info.entity").UserInfo[]>;
    getUser(id: number): Promise<import("./user/user.entity").User>;
    createUser(userDto: any): Promise<{
        ID: number;
        email: string;
        password: string;
    }>;
    updateUser(id: number, userDto: any): Promise<import("./user/user.entity").User>;
}
