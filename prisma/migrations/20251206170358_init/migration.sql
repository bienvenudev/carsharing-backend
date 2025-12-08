/*
  Warnings:

  - You are about to drop the column `carTypeId` on the `CarType` table. All the data in the column will be lost.
  - You are about to drop the column `fuelType` on the `CarType` table. All the data in the column will be lost.
  - You are about to drop the column `horsepower` on the `CarType` table. All the data in the column will be lost.
  - You are about to drop the column `info` on the `CarType` table. All the data in the column will be lost.
  - You are about to drop the column `licensePlate` on the `CarType` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `CarType` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `CarType` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `CarType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CarType" DROP COLUMN "carTypeId",
DROP COLUMN "fuelType",
DROP COLUMN "horsepower",
DROP COLUMN "info",
DROP COLUMN "licensePlate",
DROP COLUMN "ownerId",
DROP COLUMN "state",
ADD COLUMN     "imageUrl" TEXT NOT NULL;
