/*
  Warnings:

  - The `status` column on the `Article` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Category` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "CategoryStatus" AS ENUM ('ACTIVE', 'DRAFT');

-- CreateEnum
CREATE TYPE "ArticleStatus" AS ENUM ('ACTIVE', 'DRAFT');

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "status",
ADD COLUMN     "status" "ArticleStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "status",
ADD COLUMN     "status" "CategoryStatus" NOT NULL DEFAULT 'DRAFT';

-- DropEnum
DROP TYPE "Status";
