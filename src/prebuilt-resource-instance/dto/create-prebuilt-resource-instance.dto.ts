import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreatePrebuiltResourceInstanceDto {
  @IsNotEmpty()
  Image: string;

  @IsOptional()
  Cmd: string[];

  @IsOptional()
  Volume: Record<string, any>;

  //   needs to have = beech mein
  @IsOptional()
  Env: string[];
}
