-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "commune" TEXT,
ADD COLUMN     "dpto" TEXT,
ADD COLUMN     "number" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "region" TEXT,
ADD COLUMN     "street" TEXT;

-- CreateTable
CREATE TABLE "Communes" (
    "communeID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "regionID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Communes_pkey" PRIMARY KEY ("communeID")
);

-- CreateTable
CREATE TABLE "Countries" (
    "countryID" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Countries_pkey" PRIMARY KEY ("countryID")
);

-- CreateTable
CREATE TABLE "Regions" (
    "regionID" TEXT NOT NULL,
    "romanNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "countryID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Regions_pkey" PRIMARY KEY ("regionID")
);

-- AddForeignKey
ALTER TABLE "Communes" ADD CONSTRAINT "Communes_regionID_fkey" FOREIGN KEY ("regionID") REFERENCES "Regions"("regionID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Regions" ADD CONSTRAINT "Regions_countryID_fkey" FOREIGN KEY ("countryID") REFERENCES "Countries"("countryID") ON DELETE RESTRICT ON UPDATE CASCADE;
