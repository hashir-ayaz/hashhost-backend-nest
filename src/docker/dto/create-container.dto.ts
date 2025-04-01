import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateContainer {
  @IsNotEmpty()
  Image: string;

  @IsOptional()
  Cmd: string[];

  @IsOptional()
  Volume: Record<string, any>;

  @IsOptional()
  //   needs to have = beech mein
  Env: string[];
}
