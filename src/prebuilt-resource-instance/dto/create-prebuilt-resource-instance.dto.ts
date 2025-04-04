// src/prebuilt-resource-instance/dto/create-prebuilt-resource-instance.dto.ts

import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsJSON,
  IsObject,
} from 'class-validator';

export class CreatePrebuiltResourceInstanceDto {
  @IsNumber()
  projectId: number;

  @IsNumber()
  resourceId: number;

  @IsString()
  @IsOptional()
  name?: string; // defaults to "Instance" in entity

  @IsObject()
  @IsOptional()
  custom_config?: Record<string, any>;

  @IsArray()
  @IsNotEmpty()
  assigned_ports: number[];

  @IsString()
  @IsOptional()
  assigned_server?: string; // defaults to "127.0.0.1"

  @IsString()
  @IsOptional()
  volumes?: string[];

  @IsString()
  @IsOptional()
  status?: string; // defaults to "pending"

  @IsObject()
  @IsOptional()
  environment_variables?: string[];
}
