import { Injectable } from '@nestjs/common';
import { CreatePrebuiltResourceInstanceDto } from './dto/create-prebuilt-resource-instance.dto';
import { UpdatePrebuiltResourceInstanceDto } from './dto/update-prebuilt-resource-instance.dto';
import { Repository } from 'typeorm';
import { PrebuiltResourceInstance } from './entities/prebuilt-resource-instance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DockerService } from 'src/docker/docker.service';
@Injectable()
export class PrebuiltResourceInstanceService {
  constructor(
    @InjectRepository(PrebuiltResourceInstance)
    private readonly prebuiltResourceInstanceRepo: Repository<PrebuiltResourceInstance>,
    private readonly dockerService: DockerService,
  ) {}

  async create(
    createPrebuiltResourceInstanceDto: CreatePrebuiltResourceInstanceDto,
  ) {
    await this.prebuiltResourceInstanceRepo.save(
      createPrebuiltResourceInstanceDto,
    );

    await this.dockerService.createContainer();

    return 'successfully made a busybox contianer';
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
