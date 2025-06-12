import { Logger, Module } from '@nestjs/common';
import { PrebuiltResourceService } from './prebuilt-resource.service';
import { PrebuiltResourceController } from './prebuilt-resource.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrebuiltResource } from './entities/prebuilt-resource.entity';
@Module({
  imports: [TypeOrmModule.forFeature([PrebuiltResource])],
  controllers: [PrebuiltResourceController],
  providers: [PrebuiltResourceService, Logger],
})
export class PrebuiltResourceModule {}
