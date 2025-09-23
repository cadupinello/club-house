/*
  Warnings:

  - Added the required column `updatedAt` to the `like` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."like" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "public"."_CommentToLike" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CommentToLike_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CommentToLike_B_index" ON "public"."_CommentToLike"("B");

-- AddForeignKey
ALTER TABLE "public"."_CommentToLike" ADD CONSTRAINT "_CommentToLike_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CommentToLike" ADD CONSTRAINT "_CommentToLike_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."like"("id") ON DELETE CASCADE ON UPDATE CASCADE;
