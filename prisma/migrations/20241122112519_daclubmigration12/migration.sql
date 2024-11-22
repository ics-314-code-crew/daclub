/*
  Warnings:

  - You are about to drop the column `admins` on the `Club` table. All the data in the column will be lost.
  - You are about to drop the column `contactEmail` on the `Club` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Club` table. All the data in the column will be lost.
  - You are about to drop the column `expiration` on the `Club` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Club` table. All the data in the column will be lost.
  - You are about to drop the column `meetingTime` on the `Club` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Club` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Club" DROP COLUMN "admins",
DROP COLUMN "contactEmail",
DROP COLUMN "description",
DROP COLUMN "expiration",
DROP COLUMN "location",
DROP COLUMN "meetingTime",
DROP COLUMN "website";
