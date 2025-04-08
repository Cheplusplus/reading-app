"use client";
import Reader from "../Reader/Reader";
import Questions from "../Questions/Questions";
import Results from "../Results/Results";
import { useEffect, useState } from "react";
import styles from "./readingapp.module.css";

type ReaderPageManagerProps = {
  challenge: Challenge;
};
const ReaderPageManager = ({ challenge }: ReaderPageManagerProps) => {
  const [page, setPage] = useState<"reader" | "questions" | "results">("reader");
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [results, setResults] = useState<Results>({ correctAnswers: [], score: 0 });

  const checkResults = () => {
    const results = userAnswers.reduce(
      (result: Results, answer: number, i) => {
        if (challenge.correctAnswers[i] === answer) {
          result.correctAnswers.push(i);
          result.score += 1;
        }
        return result;
      },
      { correctAnswers: [], score: 0 }
    );
    //Give the result as a percentage.
    return { ...results, score: (results.score / challenge.questions.length) * 100 };
  };
  useEffect(() => {
    if (userAnswers.length === challenge.questions.length) {
      setResults(checkResults());
    }
  }, [userAnswers]);

  const pages = {
    reader: <Reader piece={challenge.readingPiece} setPage={setPage} />,
    questions: <Questions questions={challenge.questions} answers={challenge.answers} setUserAnswers={setUserAnswers} setPage={setPage} />,
    results: <Results results={results} />,
  };

  return (
    <div className={styles.body}>
      <div className={styles.center}>{pages[page]}</div>
    </div>
  );
};

export default ReaderPageManager;
