import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrebuiltResourceService } from './prebuilt-resource.service';
import { CreatePrebuiltResourceDto } from './dto/create-prebuilt-resource.dto';
import { UpdatePrebuiltResourceDto } from './dto/update-prebuilt-resource.dto';

@Controller('prebuilt-resource')
export class PrebuiltResourceController {
  constructor(private readonly prebuiltResourceService: PrebuiltResourceService) {}

  @Post()
  create(@Body() createPrebuiltResourceDto: CreatePrebuiltResourceDto) {
    return this.prebuiltResourceService.create(createPrebuiltResourceDto);
  }

  @Get()
  findAll() {
    return this.prebuiltResourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prebuiltResourceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrebuiltResourceDto: UpdatePrebuiltResourceDto) {
    return this.prebuiltResourceService.update(+id, updatePrebuiltResourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prebuiltResourceService.remove(+id);
  }
}
