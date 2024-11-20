/*
  Warnings:

  - You are about to drop the `_UserInterests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_admins` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "_UserInterests" DROP CONSTRAINT "_UserInterests_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserInterests" DROP CONSTRAINT "_UserInterests_B_fkey";

-- DropForeignKey
ALTER TABLE "_admins" DROP CONSTRAINT "_admins_A_fkey";

-- DropForeignKey
ALTER TABLE "_admins" DROP CONSTRAINT "_admins_B_fkey";

-- DropTable
DROP TABLE "_UserInterests";

-- DropTable
DROP TABLE "_admins";

-- CreateTable
CREATE TABLE "_USER" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_USER_AB_unique" ON "_USER"("A", "B");

-- CreateIndex
CREATE INDEX "_USER_B_index" ON "_USER"("B");

-- AddForeignKey
ALTER TABLE "_USER" ADD CONSTRAINT "_USER_A_fkey" FOREIGN KEY ("A") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_USER" ADD CONSTRAINT "_USER_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
