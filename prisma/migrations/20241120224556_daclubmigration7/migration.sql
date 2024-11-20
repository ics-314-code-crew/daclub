/*
  Warnings:

  - You are about to drop the `_USER` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `admins` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_USER" DROP CONSTRAINT "_USER_A_fkey";

-- DropForeignKey
ALTER TABLE "_USER" DROP CONSTRAINT "_USER_B_fkey";

-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "admins" TEXT NOT NULL;

-- DropTable
DROP TABLE "_USER";
