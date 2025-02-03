-- AlterEnum
ALTER TYPE "TaskState" ADD VALUE 'Approved';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "rewardPoints" INTEGER NOT NULL DEFAULT 0;
