/*
  Warnings:

  - You are about to drop the column `token` on the `auth_info` table. All the data in the column will be lost.
  - Added the required column `o_auth_id` to the `auth_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `auth_info` DROP COLUMN `token`,
    ADD COLUMN `o_auth_id` VARCHAR(191) NOT NULL;
