/*
  Warnings:

  - Made the column `position` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Task` MODIFY `position` INTEGER NOT NULL;
