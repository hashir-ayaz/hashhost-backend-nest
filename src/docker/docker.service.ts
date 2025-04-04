import { Injectable } from '@nestjs/common';
import * as Dockerode from 'dockerode';
import { CreateContainerDto } from './dto/create-container.dto';

@Injectable()
export class DockerService {
  docker = new Dockerode();

  async createContainer(createContainerDto: CreateContainerDto) {
    // if image doesnt exist then pull the image first
    const images = await this.findAllImages();
    if (
      images &&
      !images.find(
        (image) =>
          image.RepoTags && image.RepoTags.includes(createContainerDto.Image),
      )
    ) {
      await this.docker.pull(createContainerDto.Image);
    }

    return this.docker.createContainer({
      Image: createContainerDto.Image,
      Cmd: createContainerDto.Cmd,
      Volumes: createContainerDto.Volume,
      Env: createContainerDto.Env,
    });
  }

  //   lists all the docker containers on the current host machine
  async findAll() {
    try {
      const containers = await this.docker.listContainers({ all: true });
      return containers;
    } catch (error) {
      throw new Error(`Failed to list containers ${error}`);
    }
  }

  findOne(id: string) {
    console.log('getting container with id', id);
    const container = this.docker.getContainer(id.toString());

    if (!container) {
      throw new Error(`Container with id ${id} not found`);
    }

    return container.inspect();
  }

  stopContainer(id: string) {
    const container = this.docker.getContainer(id.toString());

    if (!container) {
      throw new Error(`Container with id ${id} not found`);
    }

    return container.stop();
  }

  startContainer(id: string) {
    const container = this.docker.getContainer(id.toString());

    if (!container) {
      throw new Error(`Container with id ${id} not found`);
    }

    return container.start();
  }

  restartContainer(id: string) {
    const container = this.docker.getContainer(id.toString());

    if (!container) {
      throw new Error(`Container with id ${id} not found`);
    }

    return container.restart();
  }

  update(id: number) {
    return `This action updates a #${id} docker`;
  }

  removeContainer(id: string) {
    const container = this.docker.getContainer(id.toString());

    if (!container) {
      throw new Error(`Container with id ${id} not found`);
    }

    return container.remove();
  }

  findAllImages() {
    return this.docker.listImages();
  }
}
