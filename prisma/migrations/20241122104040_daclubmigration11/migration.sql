/*
  Warnings:

  - You are about to drop the column `categories` on the `Club` table. All the data in the column will be lost.
  - You are about to drop the column `photos` on the `Club` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Club" DROP COLUMN "categories",
DROP COLUMN "photos";
