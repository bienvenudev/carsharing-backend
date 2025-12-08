import { IsString, IsUrl } from 'class-validator';

export class CreateCarTypeDto {
  @IsString()
  name: string;

  @IsUrl()
  imageUrl: string;
}
