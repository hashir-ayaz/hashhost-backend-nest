import { Injectable } from '@nestjs/common';
import { CreatePrebuiltResourceInstanceDto } from './dto/create-prebuilt-resource-instance.dto';
import { UpdatePrebuiltResourceInstanceDto } from './dto/update-prebuilt-resource-instance.dto';
import { Repository } from 'typeorm';
import { PrebuiltResourceInstance } from './entities/prebuilt-resource-instance.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class PrebuiltResourceInstanceService {
  constructor(
    @InjectRepository(PrebuiltResourceInstance)
    private readonly prebuiltResourceInstanceRepo: Repository<PrebuiltResourceInstance>,
  ) {}

  create(createPrebuiltResourceInstanceDto: CreatePrebuiltResourceInstanceDto) {
    return this.prebuiltResourceInstanceRepo.save(
      createPrebuiltResourceInstanceDto,
    );
  }

  findAll() {
    return this.prebuiltResourceInstanceRepo.find();
  }

  async findOne(id: number) {
    await this.prebuiltResourceInstanceRepo.findOneByOrFail({ id: id });
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
