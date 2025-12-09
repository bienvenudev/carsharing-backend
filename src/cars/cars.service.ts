import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.car.findMany();
  }

  create(createCarDto: CreateCarDto) {
    return this.prisma.car.create({
      data: {
        ...createCarDto,
        ownerId: 1,
        state: 'LOCKED',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.car.findUnique({ where: { id } });
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return this.prisma.car.update({
      where: {
        id,
      },
      data: updateCarDto,
    });
  }

  delete(id: number) {
    return this.prisma.car.delete({ where: { id } });
  }
}
