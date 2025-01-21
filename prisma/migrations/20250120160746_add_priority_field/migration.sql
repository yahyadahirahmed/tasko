/*
  Warnings:

  - You are about to drop the column `position` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Task` DROP COLUMN `position`,
    ADD COLUMN `priority` ENUM('high', 'medium', 'low') NOT NULL DEFAULT 'medium';
