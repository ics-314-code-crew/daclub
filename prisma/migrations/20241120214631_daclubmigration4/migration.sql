/*
  Warnings:

  - You are about to drop the `_ClubAdmins` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ClubAdmins" DROP CONSTRAINT "_ClubAdmins_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClubAdmins" DROP CONSTRAINT "_ClubAdmins_B_fkey";

-- DropTable
DROP TABLE "_ClubAdmins";

-- CreateTable
CREATE TABLE "_admins" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_admins_AB_unique" ON "_admins"("A", "B");

-- CreateIndex
CREATE INDEX "_admins_B_index" ON "_admins"("B");

-- AddForeignKey
ALTER TABLE "_admins" ADD CONSTRAINT "_admins_A_fkey" FOREIGN KEY ("A") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admins" ADD CONSTRAINT "_admins_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
