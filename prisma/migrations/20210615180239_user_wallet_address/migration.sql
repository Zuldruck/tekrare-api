/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[pseudo]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `walletAddress` VARCHAR(191);

-- DropTable
DROP TABLE `Post`;

-- CreateIndex
CREATE UNIQUE INDEX `User.pseudo_unique` ON `User`(`pseudo`);
