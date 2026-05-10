/*
  Warnings:

  - The values [DRAFT,APPROVED] on the enum `seminars_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `seminars` MODIFY `status` ENUM('RESERVED', 'SUBMITTED', 'DEFENDED', 'DECLINED') NOT NULL;
