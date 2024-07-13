/*
  Warnings:

  - Added the required column `status` to the `investments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InvestmentStatus" AS ENUM ('ATIVO', 'ENCERRADO');

-- AlterTable
ALTER TABLE "investments" ADD COLUMN     "status" "InvestmentStatus" NOT NULL;
