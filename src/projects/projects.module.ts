import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import { ServersService } from '../servers/servers.service';
import { Server } from '../servers/server.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Server])],
  controllers: [ProjectsController],
  providers: [ProjectsService, ServersService],
})
export class ProjectsModule {}
