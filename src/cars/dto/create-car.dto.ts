import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCarDto {
  @IsNumber()
  carTypeId: number;

  @IsString()
  name: string;

  @IsString()
  fuelType: string;

  @IsNumber()
  horsepower: number;

  @IsString()
  licensePlate: string;

  @IsString()
  @IsOptional()
  info?: string;
}
