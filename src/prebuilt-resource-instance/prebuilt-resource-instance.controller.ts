import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PrebuiltResourceInstanceService } from './prebuilt-resource-instance.service';
import { CreatePrebuiltResourceInstanceDto } from './dto/create-prebuilt-resource-instance.dto';
import { UpdatePrebuiltResourceInstanceDto } from './dto/update-prebuilt-resource-instance.dto';

@Controller('prebuilt-resource-instance')
export class PrebuiltResourceInstanceController {
  constructor(
    private readonly prebuiltResourceInstanceService: PrebuiltResourceInstanceService,
  ) {}

  @Post()
  create(
    @Body()
    createPrebuiltResourceInstanceDto: CreatePrebuiltResourceInstanceDto,
  ) {
    return this.prebuiltResourceInstanceService.create(
      createPrebuiltResourceInstanceDto,
    );
  }

  @Get()
  findAll() {
    return this.prebuiltResourceInstanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('container id to find is ', id);
    return this.prebuiltResourceInstanceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updatePrebuiltResourceInstanceDto: UpdatePrebuiltResourceInstanceDto,
  ) {
    return this.prebuiltResourceInstanceService.update(
      +id,
      updatePrebuiltResourceInstanceDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prebuiltResourceInstanceService.remove(+id);
  }
}
