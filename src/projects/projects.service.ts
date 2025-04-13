import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { ServersService } from '../servers/servers.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
    private readonly serverService: ServersService,
  ) {
    console.log('ProjectsService instantiated');
  }

  async createProject(project: CreateProjectDto) {
    // check if the server exists
    const server = await this.serverService.findOne(project.serverId);
    if (!server) {
      throw new Error('Server not found');
    }
    const newProject = this.projectRepo.create(project);
    return await this.projectRepo.save(newProject);
  }

  async getAllProjects() {
    return await this.projectRepo.find();
  }

  async getProjectById(id: string) {
    return await this.projectRepo.findOne({
      where: { id },
      relations: ['server'],
    });
  }

  async updateProject(id: string, name: string, description: string) {
    return await this.projectRepo.update(id, { name, description });
  }
}
