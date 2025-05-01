import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ServersService } from './servers.service';
import { CreateServerDto } from './dto/create-server.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { HttpCode, HttpStatus } from '@nestjs/common';

@Controller('servers')
export class ServersController {
  constructor(
    private readonly serversService: ServersService,
    private readonly logger: Logger,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createServer(@Body() body: CreateServerDto) {
    try {
      const server = await this.serversService.createServer(body);
      return {
        message: 'Server created successfully',
        server,
      };
    } catch (error) {
      this.logger.error(
        `Failed to create server: ${error.message}`,
        error.stack,
      );

      throw new InternalServerErrorException('Failed to create server');
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.serversService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serversService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: CreateServerDto) {
    return this.serversService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serversService.remove(id);
  }
}
