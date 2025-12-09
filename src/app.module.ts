import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CarTypesModule } from './car-types/car-types.module';
import { PrismaModule } from './prisma/prisma.module';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [PrismaModule, UsersModule, CarTypesModule, CarsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
