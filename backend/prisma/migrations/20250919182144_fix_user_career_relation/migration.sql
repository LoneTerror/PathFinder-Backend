/*
  Warnings:

  - You are about to drop the `_CareerPathToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_CareerPathToUser" DROP CONSTRAINT "_CareerPathToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_CareerPathToUser" DROP CONSTRAINT "_CareerPathToUser_B_fkey";

-- DropTable
DROP TABLE "public"."_CareerPathToUser";

-- CreateTable
CREATE TABLE "public"."_UserCareerGoals" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserCareerGoals_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserCareerGoals_B_index" ON "public"."_UserCareerGoals"("B");

-- AddForeignKey
ALTER TABLE "public"."_UserCareerGoals" ADD CONSTRAINT "_UserCareerGoals_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."CareerPath"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserCareerGoals" ADD CONSTRAINT "_UserCareerGoals_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
