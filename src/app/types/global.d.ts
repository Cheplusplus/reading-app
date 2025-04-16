declare global {
  interface Challenge {
    id: string;
    readingPiece: string;
    questions: string[];
    answers: string[][];
    correctAnswers: number[];
  }

  interface User {
    id: number;
    email: string;
    username: string;
    stats: Stats[];
  }

  interface Stats {
    speed: number;
    score: number;
    userID: number;
  }
}
export {};
