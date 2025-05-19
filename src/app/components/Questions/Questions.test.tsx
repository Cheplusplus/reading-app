import { render, screen, renderHook, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Questions from "./Questions";

const setUserAnswers = jest.fn();
const setPage = jest.fn();

const challenge: Challenge = {
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

beforeEach(() => {
  render(<Questions challenge={challenge} setUserAnswers={setUserAnswers} setPage={setPage} />);
});

describe("Questions", () => {
  it("Displays the first question and possible answers", () => {
    const questionIndex = screen.getByTestId("question-index");
    const question = screen.getByTestId("question");
    const answers = screen.getAllByTestId("answers");

    expect(questionIndex).toBeVisible();
    expect(questionIndex).toHaveTextContent("1 / 5");
    expect(question).toBeVisible();
    expect(question).toHaveTextContent(challenge.questions[0]);
    answers.forEach((answer, i) => {
      expect(answer).toBeVisible();
      expect(answer).toHaveTextContent(challenge.answers[0][i]);
    });
    expect(answers.length).toBe(4);
  });

  it("Navigates to next question after answer is clicked", () => {
    const answers = screen.getAllByTestId("answers");
    const questionIndex = screen.getByTestId("question-index");

    const randomAnswer = Math.ceil(Math.random() * answers.length - 1);
    fireEvent.click(answers[randomAnswer]);
    expect(setUserAnswers).toHaveBeenCalled();
    expect(questionIndex).toHaveTextContent("2 / 5");
  });

  it("Calls setPage after all questions have been answered", () => {
    challenge.questions.forEach(() => {
      const answers = screen.getAllByTestId("answers");
      const randomAnswer = Math.ceil(Math.random() * answers.length - 1);
      fireEvent.click(answers[randomAnswer]);
    });
    expect(setPage).toHaveBeenCalledWith("results");
  });
});
