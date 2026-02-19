-- DropIndex
DROP INDEX "Category_slug_key";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "image" TEXT,
ALTER COLUMN "slug" DROP NOT NULL,
ALTER COLUMN "slug" DROP DEFAULT;
