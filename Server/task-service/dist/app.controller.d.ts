import { AppService } from './app.service';
import { Log } from './log/log.entity';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    createLog(log: Log): Promise<Log>;
}