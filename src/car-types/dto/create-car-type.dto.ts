import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateCarTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;
}
