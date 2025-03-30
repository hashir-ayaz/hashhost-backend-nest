import { Injectable } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Server } from './server.entity';

@Injectable()
export class ServersService {
  // will inject the repo class here
  constructor(
    @InjectRepository(Server)
    private readonly serverRepository: Repository<Server>,
  ) {}
  async createServer(createServerDto: CreateServerDto) {
    return await this.serverRepository.save(createServerDto);
  }

  async findAll() {
    return await this.serverRepository.find();
  }

  async findOne(id: string) {
    return await this.serverRepository.findOne({ where: { id } });
  }

  async update(id: string, updateServerDto: CreateServerDto) {
    return await this.serverRepository.update(id, updateServerDto);
  }

  async remove(id: string) {
    return await this.serverRepository.delete(id);
  }
}
