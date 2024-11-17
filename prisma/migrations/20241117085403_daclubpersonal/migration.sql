/*
  Warnings:

  - Made the column `uhId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "uhId" SET NOT NULL;
