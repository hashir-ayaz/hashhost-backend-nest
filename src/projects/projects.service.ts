import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {
    console.log('ProjectsService instantiated');
  }

  async createProject(name: string, description: string) {
    const project = this.projectRepo.create({ name, description });
    return await this.projectRepo.save(project);
  }
}
