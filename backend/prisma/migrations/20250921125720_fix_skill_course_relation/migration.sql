-- AlterTable
ALTER TABLE "public"."Skill" ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "public"."Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "provider" TEXT,
    "url" TEXT,
    "skillId" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_RelatedRoles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RelatedRoles_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_RelatedRoles_B_index" ON "public"."_RelatedRoles"("B");

-- AddForeignKey
ALTER TABLE "public"."Course" ADD CONSTRAINT "Course_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "public"."Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_RelatedRoles" ADD CONSTRAINT "_RelatedRoles_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."CareerPath"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_RelatedRoles" ADD CONSTRAINT "_RelatedRoles_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
