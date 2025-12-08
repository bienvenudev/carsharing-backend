import 'dotenv/config';
import { Pool, PoolConfig } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { Prisma, PrismaClient } from '../generated/prisma/client';

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL env variable is not defined');
  }

  const poolConfig: PoolConfig = { connectionString };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const pool = new Pool(poolConfig);
  const adapter = new PrismaPg(pool);
  const clientOptions: Prisma.PrismaClientOptions = { adapter };

  return new PrismaClient(clientOptions);
}

const prisma = createPrismaClient();

const carTypes = [
  {
    name: 'Car 550',
    imageUrl:
      'https://res.cloudinary.com/dgwh59vry/image/upload/c_pad,ar_1:1/v1725970842/Mercedes-Benz-Car_vsm9cu.webp',
  },
  {
    name: 'Car Prime',
    imageUrl:
      'https://res.cloudinary.com/dgwh59vry/image/upload/c_pad,ar_1:1/v1725970827/Hyundai-Tucson-Car_o70jlc.webp',
  },
  {
    name: 'Car Cross',
    imageUrl:
      'https://res.cloudinary.com/dgwh59vry/image/upload/c_pad,ar_1:1/v1725970824/Fortuner-TRD-Sportivo-Car_ncrmin.webp',
  },
  {
    name: 'Kia Sportage',
    imageUrl:
      'https://autoland.de/media/image/42/54/07/FL735328_w_1280x1280.jpg',
  },
];

// sportage: https://cache4.pakwheels.com/system/car_generation_pictures/7734/original/Sportage_white.jpeg
// kia: https://autoland.de/media/image/42/54/07/FL735328_w_1280x1280.jpg

async function seed() {
  console.info('Resetting CarType table and ID sequence...');
  await prisma.$executeRaw`TRUNCATE TABLE "CarType" RESTART IDENTITY CASCADE`;

  console.info('Seeding default car types...');
  await prisma.carType.createMany({ data: carTypes });

  console.info('Seed complete.');
}

seed()
  .catch(async (error) => {
    console.error('Seeding failed:', error);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
