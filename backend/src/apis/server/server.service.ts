import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Server } from './entities/server.entity';

@Injectable()
export class ServerService {
  constructor(@InjectRepository(Server) private readonly serverRepository: Repository<Server>) {}

  async create(name: string) {
    return await this.serverRepository.save({ name });
  }
}
