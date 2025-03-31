import { Injectable } from '@nestjs/common';
import { CreatePrebuiltResourceInstanceDto } from './dto/create-prebuilt-resource-instance.dto';
import { UpdatePrebuiltResourceInstanceDto } from './dto/update-prebuilt-resource-instance.dto';

@Injectable()
export class PrebuiltResourceInstanceService {
  create(createPrebuiltResourceInstanceDto: CreatePrebuiltResourceInstanceDto) {
    return 'This action adds a new prebuiltResourceInstance';
  }

  findAll() {
    return `This action returns all prebuiltResourceInstance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prebuiltResourceInstance`;
  }

  update(id: number, updatePrebuiltResourceInstanceDto: UpdatePrebuiltResourceInstanceDto) {
    return `This action updates a #${id} prebuiltResourceInstance`;
  }

  remove(id: number) {
    return `This action removes a #${id} prebuiltResourceInstance`;
  }
}
