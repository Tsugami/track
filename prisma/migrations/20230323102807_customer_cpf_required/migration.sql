-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "cpf_required" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "identify_cpf" DROP NOT NULL;
