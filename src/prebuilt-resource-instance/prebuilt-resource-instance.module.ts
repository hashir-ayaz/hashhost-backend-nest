import { Module } from '@nestjs/common';
import { PrebuiltResourceInstanceService } from './prebuilt-resource-instance.service';
import { PrebuiltResourceInstanceController } from './prebuilt-resource-instance.controller';

@Module({
  controllers: [PrebuiltResourceInstanceController],
  providers: [PrebuiltResourceInstanceService],
})
export class PrebuiltResourceInstanceModule {}
