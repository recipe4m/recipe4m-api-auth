/*
  Warnings:

  - You are about to alter the column `user_id` on the `auth_info` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `auth_info` MODIFY `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `auth_info` ADD CONSTRAINT `auth_info_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
