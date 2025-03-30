import { Module } from '@nestjs/common';
import { PrebuiltResourceService } from './prebuilt-resource.service';
import { PrebuiltResourceController } from './prebuilt-resource.controller';

@Module({
  controllers: [PrebuiltResourceController],
  providers: [PrebuiltResourceService],
})
export class PrebuiltResourceModule {}
