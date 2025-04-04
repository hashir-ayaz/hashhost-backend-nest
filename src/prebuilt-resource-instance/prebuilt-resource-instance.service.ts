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
    private readonly dockerService: DockerService,
    @InjectRepository(PrebuiltResource)
    private readonly prebuiltResourceRepo: Repository<PrebuiltResource>,
  ) {}

  async create(
    createPrebuiltResourceInstanceDto: CreatePrebuiltResourceInstanceDto,
  ) {
    await this.prebuiltResourceInstanceRepo.save(
      createPrebuiltResourceInstanceDto,
    );

    if (!createPrebuiltResourceInstanceDto.volumes) {
      throw new Error('No volumes provided');
    }

    // get the resource details from the resource id
    const resource: PrebuiltResource =
      await this.prebuiltResourceRepo.findOneByOrFail({
        id: createPrebuiltResourceInstanceDto.resourceId,
      });

    if (!resource) {
      throw new Error('Resource not found');
    }

    // map the volumes into container volume format
    const volumes: Record<string, object> = {};

    // the first volume should be the default volume from the resource
    // volumePath is an array of strings for required volume paths
    for (const volume of resource.volumePath) {
      volumes[volume] = {};
    }

    // add the volumes from the createPrebuiltResourceInstanceDto
    for (const volume of createPrebuiltResourceInstanceDto.volumes) {
      volumes[volume] = {};
    }
    // TODO create the container dto here, get the required fields from the createPrebuiltResourceInstanceDto
    const container: CreateContainerDto = {
      Image: resource.image,
    };

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
