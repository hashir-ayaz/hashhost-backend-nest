import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateContainerDto {
  @IsNotEmpty()
  Image: string;

  @IsOptional()
  Cmd?: string[];

  @IsOptional()
  Volume?: Record<string, object>;

  //   needs to have = beech mein (eg API_URL=https://hashirayaz.site/api ) or that value will be ignored
  @IsOptional()
  Env?: string[];
}
