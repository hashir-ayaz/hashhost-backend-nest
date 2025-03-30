import { Injectable } from '@nestjs/common';
import { CreatePrebuiltResourceDto } from './dto/create-prebuilt-resource.dto';
import { UpdatePrebuiltResourceDto } from './dto/update-prebuilt-resource.dto';

@Injectable()
export class PrebuiltResourceService {
  create(createPrebuiltResourceDto: CreatePrebuiltResourceDto) {
    return 'This action adds a new prebuiltResource';
  }

  findAll() {
    return `This action returns all prebuiltResource`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prebuiltResource`;
  }

  update(id: number, updatePrebuiltResourceDto: UpdatePrebuiltResourceDto) {
    return `This action updates a #${id} prebuiltResource`;
  }

  remove(id: number) {
    return `This action removes a #${id} prebuiltResource`;
  }
}
