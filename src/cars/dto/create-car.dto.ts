import {
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsString,
  IsPositive,
} from 'class-validator';

export class CreateCarDto {
  @IsInt()
  @IsPositive()
  carTypeId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  fuelType: string;

  @IsInt()
  @IsPositive()
  horsepower: number;

  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @IsString()
  @IsOptional()
  info?: string;
}
