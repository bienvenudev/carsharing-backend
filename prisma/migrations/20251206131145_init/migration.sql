-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarType" (
    "id" SERIAL NOT NULL,
    "carTypeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "fuelType" TEXT NOT NULL,
    "horsepower" INTEGER NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "info" TEXT,

    CONSTRAINT "CarType_pkey" PRIMARY KEY ("id")
);
