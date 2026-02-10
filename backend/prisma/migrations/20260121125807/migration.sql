/*
  Warnings:

  - You are about to drop the column `teacherId` on the `topic` table. All the data in the column will be lost.
  - Added the required column `subjectId` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `topic` DROP FOREIGN KEY `Topic_teacherId_fkey`;

-- DropIndex
DROP INDEX `Topic_teacherId_fkey` ON `topic`;

-- AlterTable
ALTER TABLE `topic` DROP COLUMN `teacherId`,
    ADD COLUMN `subjectId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Topic` ADD CONSTRAINT `Topic_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
