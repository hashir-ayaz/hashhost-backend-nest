import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpStatus,
  Res,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { Response } from 'express';

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
  async createProject(@Body() body: CreateProjectDto, @Res() res: Response) {
    try {
      const project = await this.projectService.createProject({ ...body });
      res.status(HttpStatus.CREATED).json(project);
    } catch (error) {
      throw new NotFoundException({
        message: 'Failed to create project',
        error: error.message,
      });
    }
  }
}
