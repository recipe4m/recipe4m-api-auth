/*
  Warnings:

  - A unique constraint covering the columns `[o_auth_id]` on the table `auth_info` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `auth_info_o_auth_id_key` ON `auth_info`(`o_auth_id`);
