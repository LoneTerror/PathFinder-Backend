/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `CareerPath` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CareerPath_title_key" ON "public"."CareerPath"("title");
