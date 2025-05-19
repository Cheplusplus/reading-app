import { render, screen, renderHook, fireEvent, getAllByRole } from "@testing-library/react";
import "@testing-library/jest-dom";
import RateChallengeModal from "./RateChallengeModal";
import * as saveChallenge from "@/app/lib/saveChallenge";

export const mockChallenge: Challenge = {
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

jest.mock("../../lib/saveChallenge.tsx");

beforeEach(() => {
  render(<RateChallengeModal challenge={mockChallenge} />);
});

describe("RateChallengeModal", () => {
  it("Displays the modal container and content", () => {
    const modalContainer = screen.getByTestId("modal-container");
    const stars = screen.getAllByRole("button", { name: "star" });
    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(modalContainer).toBeVisible();
    stars.forEach((star) => expect(star).toBeVisible());
    expect(submitButton).toBeVisible();
  });

  it("Highlights selected stars", () => {
    const stars = screen.getAllByRole("button", { name: "star" });
    const randomStarInt = Math.ceil(Math.random() * stars.length - 1); //Pick a random star
    const randomStar = stars[randomStarInt];
    fireEvent.click(randomStar);
    stars.forEach((star, i) => {
      if (i <= randomStarInt) {
        expect(star.classList.contains("chosen")).toBe(true);
      } else {
        expect(star.classList.contains("chosen")).not.toBe(true);
      }
    });
  });

  it("Displays a message when rating < 4 stars and submit button clicked", () => {
    const stars = screen.getAllByRole("button", { name: "star" });
    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(stars[0]);
    fireEvent.click(submitButton);
    const message = screen.getByRole("heading");
    expect(saveChallenge.saveChallenge).not.toHaveBeenCalled();
    expect(message).toBeVisible();
  });

  it("Displays a message and calls save challenge when rating 4 or 5 stars and submit button clicked", () => {
    const stars = screen.getAllByRole("button", { name: "star" });
    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(stars[4]);
    fireEvent.click(submitButton);
    const message = screen.getByRole("heading");
    expect(saveChallenge.saveChallenge).toHaveBeenCalledWith(mockChallenge, 5);
    expect(message).toBeVisible();
  });
});
