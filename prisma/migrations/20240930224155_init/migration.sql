-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_countryID_fkey";

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "surname" DROP NOT NULL,
ALTER COLUMN "countryID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_countryID_fkey" FOREIGN KEY ("countryID") REFERENCES "Countries"("countryID") ON DELETE SET NULL ON UPDATE CASCADE;
