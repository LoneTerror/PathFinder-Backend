/*
  Warnings:

  - A unique constraint covering the columns `[userId,careerId]` on the table `Recommendation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "highestQualification" TEXT,
ADD COLUMN     "longTermGoal" TEXT;

-- CreateTable
CREATE TABLE "public"."Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "githubLink" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_CareerPathToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CareerPathToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CareerPathToUser_B_index" ON "public"."_CareerPathToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Recommendation_userId_careerId_key" ON "public"."Recommendation"("userId", "careerId");

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CareerPathToUser" ADD CONSTRAINT "_CareerPathToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."CareerPath"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CareerPathToUser" ADD CONSTRAINT "_CareerPathToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
