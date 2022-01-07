/*
  Warnings:

  - You are about to drop the `auth_info` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `auth_info` DROP FOREIGN KEY `auth_info_user_id_fkey`;

-- DropTable
DROP TABLE `auth_info`;

-- CreateTable
CREATE TABLE `auth` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `provider` ENUM('GOOGLE', 'APPLE') NOT NULL,
    `o_auth_id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `auth_o_auth_id_key`(`o_auth_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `auth` ADD CONSTRAINT `auth_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
