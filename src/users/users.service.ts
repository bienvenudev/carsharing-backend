import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    // Return all users without passwords
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
      },
    });
  }

  delete(id: number) {
    return this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        name: true,
      },
    });
  }
}
