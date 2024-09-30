/*
  Warnings:

  - You are about to drop the column `commune` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `Users` table. All the data in the column will be lost.
  - Added the required column `countryID` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "commune",
DROP COLUMN "region",
ADD COLUMN     "communeID" INTEGER,
ADD COLUMN     "countryID" TEXT NOT NULL,
ADD COLUMN     "regionID" TEXT;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_countryID_fkey" FOREIGN KEY ("countryID") REFERENCES "Countries"("countryID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_regionID_fkey" FOREIGN KEY ("regionID") REFERENCES "Regions"("regionID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_communeID_fkey" FOREIGN KEY ("communeID") REFERENCES "Communes"("communeID") ON DELETE SET NULL ON UPDATE CASCADE;
