/*
  Warnings:

  - You are about to drop the column `postion` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Task` DROP COLUMN `postion`,
    ADD COLUMN `position` INTEGER NULL;
