/**
 * @jest-environment node
 */
import "@testing-library/jest-dom";
import { checkIfLooseDistribution, shuffleAnswers, rebalanceAnswersIfNeeded, getChallenge } from "./getChallenge";

const challengeTightDistribution: Challenge = {
  id: "1",
  readingPiece: "A high quality story",
  questions: ["question1", "question2", "question3", "question4", "question5"],
  answers: [
    ["answer1", "answer2", "answer3", "answer4"],
    ["answer1", "answer2", "answer3", "answer4"],
    ["answer1", "answer2", "answer3", "answer4"],
    ["answer1", "answer2", "answer3", "answer4"],
    ["answer1", "answer2", "answer3", "answer4"],
  ],
  correctAnswers: [0, 0, 0, 0, 0],
};

const challengeLooseDistribution: Challenge = {
  id: "1",
  readingPiece: "A high quality story",
  questions: ["question1", "question2", "question3", "question4", "question5"],
  answers: [
    ["answer1", "answer2", "answer3", "answer4"],
    ["answer1", "answer2", "answer3", "answer4"],
    ["answer1", "answer2", "answer3", "answer4"],
    ["answer1", "answer2", "answer3", "answer4"],
    ["answer1", "answer2", "answer3", "answer4"],
  ],
  correctAnswers: [0, 1, 2, 3, 3],
};

describe("getChallenge.tsx", () => {
  it("Checks if a challenges correct answers are loosely distributed", () => {
    expect(checkIfLooseDistribution(challengeTightDistribution)).toBe(false);
    expect(checkIfLooseDistribution(challengeLooseDistribution)).toBe(true);
  });

  it("Shuffles the answers to hopefully result in a looser distribution of correct answers", () => {
    const shuffledAnswers = shuffleAnswers(challengeLooseDistribution);
    expect(challengeLooseDistribution.correctAnswers).not.toEqual(shuffledAnswers.newCorrectAnswers);
    expect(challengeLooseDistribution.answers).not.toEqual(shuffledAnswers.newAnswers);
  });

  it("Checks if the correct answers are loosely distributed and shuffles them if not and then returns them when they are.", () => {
    const newChallenge = rebalanceAnswersIfNeeded(challengeTightDistribution);
    const sameChallenge = rebalanceAnswersIfNeeded(challengeLooseDistribution);

    expect(challengeTightDistribution).not.toEqual(newChallenge);
    expect(challengeLooseDistribution).toEqual(sameChallenge);
  });

  const timeoutMS = 30000;

  it(
    "Fetches a new challenge from OpenAI API",
    async () => {
      const challenge = await getChallenge("beginner");
      expect(challenge instanceof Object).toBe(true);
    },
    timeoutMS
  );
});
