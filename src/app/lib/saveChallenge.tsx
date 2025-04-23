"use server";
import prisma from "../lib/prisma";
export const saveChallenge = async (challenge: Challenge, rating: number) => {
  "use server";
  await prisma.challenge.create({
    data: { piece: challenge.readingPiece, questions: challenge.questions, answers: challenge.answers.map((answersList) => answersList.toString()), correct: challenge.correctAnswers, rating: rating },
  });
};
