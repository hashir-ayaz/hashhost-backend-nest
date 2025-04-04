import { Module } from '@nestjs/common';
import { PrebuiltResourceInstanceService } from './prebuilt-resource-instance.service';
import { PrebuiltResourceInstanceController } from './prebuilt-resource-instance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrebuiltResourceInstance } from './entities/prebuilt-resource-instance.entity';
import { DockerModule } from 'src/docker/docker.module';
import { PrebuiltResource } from 'src/prebuilt-resource/entities/prebuilt-resource.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([PrebuiltResourceInstance, PrebuiltResource]),
    DockerModule,
  ],
  controllers: [PrebuiltResourceInstanceController],
  providers: [PrebuiltResourceInstanceService],
})
export class PrebuiltResourceInstanceModule {}
