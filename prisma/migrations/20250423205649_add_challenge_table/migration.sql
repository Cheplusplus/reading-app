-- CreateTable
CREATE TABLE "Challenge" (
    "id" SERIAL NOT NULL,
    "piece" TEXT NOT NULL,
    "questions" TEXT[],
    "answers" TEXT[],
    "correct" INTEGER[],
    "rating" INTEGER NOT NULL,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);
