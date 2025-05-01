import { Injectable } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Server } from './server.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
@Injectable()
export class ServersService {
  private readonly logger = new Logger(ServersService.name);
  // will inject the repo class here
  constructor(
    @InjectRepository(Server)
    private readonly serverRepository: Repository<Server>,
  ) {}
  async createServer(createServerDto: CreateServerDto) {
    this.logger.log('Creating new server:', createServerDto);
    try {
      const newServer = this.serverRepository.create(createServerDto);
      await this.serverRepository.save(newServer);
      this.logger.log('Server created:', newServer);
      return newServer;
    } catch (error) {
      this.logger.error('Failed to create server:', error.message, error.stack);
      throw new InternalServerErrorException('Failed to create server');
    }
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
