/*
  Warnings:

  - You are about to drop the column `uhid` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_uhid_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "uhid";
