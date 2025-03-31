import { Injectable } from '@nestjs/common';
import { CreatePrebuiltResourceDto } from './dto/create-prebuilt-resource.dto';
import { UpdatePrebuiltResourceDto } from './dto/update-prebuilt-resource.dto';
import { Repository } from 'typeorm';
import { PrebuiltResource } from './entities/prebuilt-resource.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class PrebuiltResourceService {
  constructor(
    @InjectRepository(PrebuiltResource)
    private readonly prebuiltResourceRepo: Repository<PrebuiltResource>,
  ) {}

  create(createPrebuiltResourceDto: CreatePrebuiltResourceDto) {
    return this.prebuiltResourceRepo.save(createPrebuiltResourceDto);
  }

  findAll() {
    return this.prebuiltResourceRepo.find();
  }

  async findOne(id: number) {
    return await this.prebuiltResourceRepo.findOneByOrFail({ id: id });
  }

  update(id: number, updatePrebuiltResourceDto: UpdatePrebuiltResourceDto) {
    return `This action updates a #${id} prebuiltResource`;
  }

  async remove(id: number) {
    const prebuiltResource = await this.prebuiltResourceRepo.findOneByOrFail({
      id: id,
    });

    return this.prebuiltResourceRepo.remove(prebuiltResource);
  }
}
