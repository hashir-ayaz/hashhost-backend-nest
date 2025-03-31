import { Injectable } from '@nestjs/common';
import * as Dockerode from 'dockerode';

@Injectable()
export class DockerService {
  docker = new Dockerode();

  createContainer() {
    return this.docker.createContainer({
      Image: 'busybox',
      Cmd: ['/bin/sh'],
      Tty: true,
      OpenStdin: true,
      StdinOnce: true,
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

  update(id: number) {
    return `This action updates a #${id} docker`;
  }

  remove(id: number) {
    return `This action removes a #${id} docker`;
  }
}
