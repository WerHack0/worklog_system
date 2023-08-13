import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { todo } from 'node:test';
import { Repository } from 'typeorm';
import { Log } from './log/log.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Log)
    private logRepo: Repository<Log>,
  ){}

  async createLog(log: Log): Promise<Log>{
    return await this.logRepo.save(log)
  }
}
