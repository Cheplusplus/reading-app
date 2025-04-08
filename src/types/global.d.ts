declare global {
  interface Results {
    correctAnswers: number[];
    score: number;
  }

  interface Challenge {
    id: string;
    readingPiece: string;
    questions: string[];
    answers: string[][];
    correctAnswers: number[];
  }
}
export {};
