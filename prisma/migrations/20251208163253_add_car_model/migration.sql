-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "carTypeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "fuelType" TEXT NOT NULL,
    "horsepower" INTEGER NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "info" TEXT,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Car_licensePlate_key" ON "Car"("licensePlate");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_carTypeId_fkey" FOREIGN KEY ("carTypeId") REFERENCES "CarType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
