-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

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

-- CreateTable
CREATE TABLE "Users" (
    "userID" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "countryID" TEXT NOT NULL,
    "regionID" TEXT,
    "communeID" INTEGER,
    "street" TEXT,
    "number" TEXT,
    "dpto" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "avatar" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "lastConnection" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Communes" ADD CONSTRAINT "Communes_regionID_fkey" FOREIGN KEY ("regionID") REFERENCES "Regions"("regionID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Regions" ADD CONSTRAINT "Regions_countryID_fkey" FOREIGN KEY ("countryID") REFERENCES "Countries"("countryID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_countryID_fkey" FOREIGN KEY ("countryID") REFERENCES "Countries"("countryID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_regionID_fkey" FOREIGN KEY ("regionID") REFERENCES "Regions"("regionID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_communeID_fkey" FOREIGN KEY ("communeID") REFERENCES "Communes"("communeID") ON DELETE SET NULL ON UPDATE CASCADE;
