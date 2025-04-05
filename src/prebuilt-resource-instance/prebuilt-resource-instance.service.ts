import { Injectable } from '@nestjs/common';
import { CreatePrebuiltResourceInstanceDto } from './dto/create-prebuilt-resource-instance.dto';
import { UpdatePrebuiltResourceInstanceDto } from './dto/update-prebuilt-resource-instance.dto';
import { Repository } from 'typeorm';
import { PrebuiltResourceInstance } from './entities/prebuilt-resource-instance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DockerService } from 'src/docker/docker.service';
import { PrebuiltResource } from 'src/prebuilt-resource/entities/prebuilt-resource.entity';
import { CreateContainerDto } from '../docker/dto/create-container.dto';

@Injectable()
export class PrebuiltResourceInstanceService {
  constructor(
    @InjectRepository(PrebuiltResourceInstance)
    private readonly prebuiltResourceInstanceRepo: Repository<PrebuiltResourceInstance>,
    @InjectRepository(PrebuiltResource)
    private readonly prebuiltResourceRepo: Repository<PrebuiltResource>,
    private readonly dockerService: DockerService,
  ) {}

  async create(
    createPrebuiltResourceInstanceDto: CreatePrebuiltResourceInstanceDto,
  ) {
    console.log('In the prebuilt resource service');

    await this.prebuiltResourceInstanceRepo.save(
      createPrebuiltResourceInstanceDto,
    );
    console.log('Created the prebuilt resource instance in the DB');

    // Get the resource details from the resource ID
    const resource: PrebuiltResource =
      await this.prebuiltResourceRepo.findOneByOrFail({
        id: createPrebuiltResourceInstanceDto.resourceId,
      });

    if (!resource) {
      throw new Error('Resource not found');
    } else {
      console.log('The resource found is:', resource);
    }

    // Prepare volumes and bind mounts
    const volumeMap: Record<string, object> = {}; // For Docker's Volumes
    const bindMounts: string[] = []; // For Docker's HostConfig.Binds

    console.log('the resource volume paths are', resource.volumePath);

    // Add resource-defined volume paths
    // JSON.parse(resource.volumePath);
    for (const volumePath of resource.volumePath || []) {
      volumeMap[volumePath] = {};
    }
    console.log(
      'the volume being stored is of shape in prebuilt resource instance service',
      volumeMap,
    );

    // Parse bind strings like "myvolume:/var/lib/mysql"
    for (const bind of createPrebuiltResourceInstanceDto.binds || []) {
      const parts = bind.split(':');
      if (parts.length !== 2) {
        throw new Error(`Invalid bind format: ${bind}`);
      }

      const [hostPath, containerPath] = parts;
      bindMounts.push(`${hostPath}:${containerPath}`);
      volumeMap[containerPath] = {};
    }

    // Create the container DTO
    const container: CreateContainerDto = {
      image: resource.image,
      volume: volumeMap,
      env: createPrebuiltResourceInstanceDto.environment_variables,
      binds: bindMounts,
    };

    // Create and start container
    const createdContainer =
      await this.dockerService.createContainer(container);
    await createdContainer.start();

    console.log(`Container ${resource.image} started`);

    return createdContainer;
  }

  findAll() {
    return this.prebuiltResourceInstanceRepo.find();
  }

  findOne(id: string) {
    return this.dockerService.findOne(id);
  }

  update(
    id: number,
    updatePrebuiltResourceInstanceDto: UpdatePrebuiltResourceInstanceDto,
  ) {
    return `This action updates a #${id} prebuiltResourceInstance`;
  }

  async remove(id: number) {
    return await this.prebuiltResourceInstanceRepo.delete({ id: id });
  }
}
