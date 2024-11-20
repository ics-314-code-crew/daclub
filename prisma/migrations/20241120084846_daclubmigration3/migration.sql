/*
  Warnings:

  - Added the required column `logo` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "logo" TEXT NOT NULL;
