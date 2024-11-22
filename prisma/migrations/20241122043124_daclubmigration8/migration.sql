/*
  Warnings:

  - You are about to drop the `Interest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClubInterests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_clubId_fkey";

-- DropForeignKey
ALTER TABLE "_ClubInterests" DROP CONSTRAINT "_ClubInterests_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClubInterests" DROP CONSTRAINT "_ClubInterests_B_fkey";

-- DropTable
DROP TABLE "Interest";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "_ClubInterests";
