/*
  Warnings:

  - You are about to drop the column `privider` on the `auth_info` table. All the data in the column will be lost.
  - Added the required column `provider` to the `auth_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `auth_info` DROP COLUMN `privider`,
    ADD COLUMN `provider` ENUM('GOOGLE', 'APPLE') NOT NULL;
