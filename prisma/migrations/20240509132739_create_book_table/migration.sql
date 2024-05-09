-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('TO_READ', 'CURRENTLY_READING', 'DID_NOT_FINISH', 'READ');

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "googleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "BookStatus" NOT NULL DEFAULT 'TO_READ',
    "rating" INTEGER,
    "dateAdded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateRead" TIMESTAMP(3),

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_userId_googleId_key" ON "Book"("userId", "googleId");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
