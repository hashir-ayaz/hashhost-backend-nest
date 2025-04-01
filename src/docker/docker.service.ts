import { Injectable } from '@nestjs/common';
import * as Dockerode from 'dockerode';

@Injectable()
export class DockerService {
  docker = new Dockerode();

  createContainer() {
    return this.docker.createContainer({
      Image: 'ubuntu',
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
}
