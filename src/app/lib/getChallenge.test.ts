/**
 * @jest-environment node
 */
import "@testing-library/jest-dom";
import { checkIfLooseDistribution, shuffleAnswers } from "./getChallenge";

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

describe("checkIfLooseDistribution", () => {
  it("Checks if a challenges correct answers are loosely distributed", () => {
    expect(checkIfLooseDistribution(challengeTightDistribution)).toBe(false);
    expect(checkIfLooseDistribution(challengeLooseDistribution)).toBe(true);
  });
});

describe("shuffleAnswers", () => {
  it("Shuffles the answers to hopefully result in a looser distribution of correct answers", () => {
    const shuffledAnswers = shuffleAnswers(challengeLooseDistribution);
    expect(challengeLooseDistribution.correctAnswers).not.toEqual(shuffledAnswers.newCorrectAnswers);
    expect(challengeLooseDistribution.answers).not.toEqual(shuffledAnswers.newAnswers);
  });
});
