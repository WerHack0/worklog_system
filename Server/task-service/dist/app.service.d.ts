import { Repository } from 'typeorm';
import { Log } from './log/log.entity';
export declare class AppService {
    private logRepo;
    constructor(logRepo: Repository<Log>);
    getTasks(userId: number, month: number): Promise<Log[]>;
    seedTask(userId: number, month: number): Promise<any>;
    createLog(log: Log): Promise<Log>;
    getLogsStatus(userId: number): Promise<Log[]>;
    getNewLogs(): Promise<Log[]>;
    approveLog(logId: number): Promise<any>;
    rejectLog(logId: number): Promise<any>;
    approveLogs(logIds: number[]): Promise<any>;
    rejectLogs(logIds: number[]): Promise<any>;
}
