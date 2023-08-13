import { Repository } from 'typeorm';
import { Log } from './log/log.entity';
export declare class AppService {
    private logRepo;
    constructor(logRepo: Repository<Log>);
    createLog(log: Log): Promise<Log>;
}
