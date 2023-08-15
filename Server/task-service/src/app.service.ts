import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Log } from './log/log.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Log)
    private logRepo: Repository<Log>,
  ){}

  async getTasks(userId: number, month: number): Promise<Log[]> {
    return await this.logRepo.findBy({ user_id: userId, month: month });
}
async seedTask(userId: number, month: number): Promise<any>{
  return await this.logRepo.update({user_id: userId, month: month}, {seend: true});
}
  async createLog(log: Log): Promise<Log>{
    return await this.logRepo.save(log)
  }
  async getLogsStatus(userId: number): Promise<Log[]> {
    return await this.logRepo.findBy({user_id: userId});
}
async getNewLogs(): Promise<Log[]> {
 
  return this.logRepo.findBy({ seend: true, check: false });
}

async approveLog(logId: number): Promise<any> {
  return this.logRepo.update(logId, { check: true });
}

async rejectLog(logId: number): Promise<any> {
  return this.logRepo.update(logId, { seend: false, check: true });
}
async approveLogs(logIds: number[]): Promise<any> {
  return this.logRepo.update({ id: In(logIds) }, { check: true });
}

async rejectLogs(logIds: number[]): Promise<any> {
  return this.logRepo.update({ id: In(logIds) }, { seend: false, check: true });
}

}
