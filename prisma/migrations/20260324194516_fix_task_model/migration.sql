/*
  Warnings:

  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `status` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `priority` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Task" DROP CONSTRAINT "Task_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL,
DROP COLUMN "priority",
ADD COLUMN     "priority" TEXT NOT NULL,
ALTER COLUMN "assignedTo" SET DATA TYPE TEXT,
ALTER COLUMN "projectId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Task_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Task_id_seq";
