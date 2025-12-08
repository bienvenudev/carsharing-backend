import { Module } from '@nestjs/common';
import { CarTypesService } from './car-types.service';
import { CarTypesController } from './car-types.controller';

@Module({
  providers: [CarTypesService],
  controllers: [CarTypesController]
})
export class CarTypesModule {}
