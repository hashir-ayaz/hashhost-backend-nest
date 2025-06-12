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
import { renderCompose } from 'src/utils/template-processing-utils';
import { dummyConfigData } from 'src/utils/dummy_data';
import { Logger } from '@nestjs/common';

@Controller('prebuilt-resource-instance')
export class PrebuiltResourceInstanceController {
  constructor(
    private readonly prebuiltResourceInstanceService: PrebuiltResourceInstanceService,
    private readonly logger: Logger,
  ) {}

  @Post()
  create(
    @Body()
    createPrebuiltResourceInstanceDto: CreatePrebuiltResourceInstanceDto,
  ) {
    console.log('in the prebuilt resource instance controller');
    return this.prebuiltResourceInstanceService.create(
      createPrebuiltResourceInstanceDto,
    );
  }

  @Post('/docker-compose')
  createDockerComposeAndDeploy(@Body() body: any) {
    this.logger.log('Creating docker compose and deploying');
    const resourceId: number = body.resourceId;
    // using dummy data to find the config and output paths
    const configData = dummyConfigData.find(
      (data) => data.serviceId === resourceId,
    );
    if (!configData) {
      throw new Error('Config data not found');
    }
    renderCompose(
      body.config,
      configData.pathToConfig,
      configData.pathToOutput,
    );
    this.logger.log('Docker compose created and deployed');
    return 'Docker compose created and deployed';
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
