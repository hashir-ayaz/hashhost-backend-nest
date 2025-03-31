import { PartialType } from '@nestjs/mapped-types';
import { CreatePrebuiltResourceInstanceDto } from './create-prebuilt-resource-instance.dto';

export class UpdatePrebuiltResourceInstanceDto extends PartialType(CreatePrebuiltResourceInstanceDto) {}
