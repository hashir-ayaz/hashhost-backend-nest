import { PartialType } from '@nestjs/mapped-types';
import { CreatePrebuiltResourceDto } from './create-prebuilt-resource.dto';

export class UpdatePrebuiltResourceDto extends PartialType(CreatePrebuiltResourceDto) {}
