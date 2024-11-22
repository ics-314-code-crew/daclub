/*
  Warnings:

  - You are about to drop the column `catagories` on the `Club` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Club" DROP COLUMN "catagories",
ADD COLUMN     "categories" TEXT[];
