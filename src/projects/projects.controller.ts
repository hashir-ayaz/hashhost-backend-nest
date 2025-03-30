import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}
  @Get()
  getProjects() {
    return this.projectService.getAllProjects();
  }

  @Get(':id')
  getProject(@Param('id') id: string) {
    return this.projectService.getProjectById(id);
  }

  @Post()
  createProject(@Body() body: CreateProjectDto) {
    return this.projectService.createProject({ ...body });
  }
}
