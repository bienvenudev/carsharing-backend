import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarTypeDto } from './dto/create-car-type.dto';
import { UpdateCarTypeDto } from './dto/update-car-type.dto';

@Injectable()
export class CarTypesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.carType.findMany();
  }

  create(createCarTypeDto: CreateCarTypeDto) {
    return this.prisma.carType.create({
      data: createCarTypeDto,
    });
  }

  findOne(id: number) {
    return this.prisma.carType.findUnique({ where: { id } });
  }

  update(id: number, updateCarTypeDto: UpdateCarTypeDto) {
    return this.prisma.carType.update({
      where: { id },
      data: updateCarTypeDto,
    });
  }
}
