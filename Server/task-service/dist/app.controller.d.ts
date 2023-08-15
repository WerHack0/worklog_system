import { AppService } from './app.service';
import { Log } from './log/log.entity';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getTasks(query: {
        userId: number;
        month: number;
    }): Promise<Log[]>;
    seedTask(data: {
        userId: number;
        month: number;
    }): Promise<any>;
    createLog(log: Log): Promise<Log>;
    getLogsStatus(data: {
        userId: number;
    }): Promise<Log[]>;
    getNewLogs(): Promise<Log[]>;
    approveLogs(logIds: number[]): Promise<any>;
    rejectLogs(logIds: number[]): Promise<any>;
    rejectLog(data: {
        logId: number;
    }): Promise<any>;
}
