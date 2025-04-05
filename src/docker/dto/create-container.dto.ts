import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateContainerDto {
  @IsNotEmpty()
  image: string;

  @IsOptional()
  cmd?: string[];

  @IsOptional()
  volume?: Record<string, object>;

  //   needs to have = beech mein (eg API_URL=https://hashirayaz.site/api ) or that value will be ignored
  @IsOptional()
  env?: string[];

  @IsOptional()
  labels?: Record<string, string>;

  @IsOptional()
  exposedPorts?: Record<string, object>;

  @IsOptional()
  // maps host path to container path for volumes
  binds?: string[];
}
