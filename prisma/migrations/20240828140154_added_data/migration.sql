/*
  Warnings:

  - Added the required column `data` to the `Text` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Text" ADD COLUMN     "data" JSONB NOT NULL;
