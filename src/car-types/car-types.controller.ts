import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarTypesService } from './car-types.service';
import { CreateCarTypeDto } from './dto/create-car-type.dto';
import { UpdateCarTypeDto } from './dto/update-car-type.dto';

@Controller('car-types')
export class CarTypesController {
  constructor(private carTypesService: CarTypesService) {}

  @Get()
  findAll() {
    return this.carTypesService.findAll();
  }

  @Post()
  create(@Body() createCarTypeDto: CreateCarTypeDto) {
    return this.carTypesService.create(createCarTypeDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.carTypesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCarTypeDto: UpdateCarTypeDto,
  ) {
    return this.carTypesService.update(id, updateCarTypeDto);
  }
}
