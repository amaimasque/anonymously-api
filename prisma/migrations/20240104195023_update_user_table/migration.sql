/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "accessToken" SET DATA TYPE VARCHAR;

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
