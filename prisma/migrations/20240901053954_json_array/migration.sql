/*
  Warnings:

  - The `data` column on the `Text` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Text" DROP COLUMN "data",
ADD COLUMN     "data" JSONB[];
