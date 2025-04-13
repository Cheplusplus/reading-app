"use client";
import styles from "./questions.module.css";
import { Dispatch, useEffect, useState, SetStateAction } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

type QuestionsProps = {
  challenge: Challenge;
  setUserAnswers: Dispatch<SetStateAction<number[]>>;
  setPage: Dispatch<SetStateAction<"reader" | "questions" | "results">>;
};
const Questions = ({ challenge, setUserAnswers, setPage }: QuestionsProps) => {
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  useEffect(() => {
    if (questionIndex >= challenge.questions.length) {
      setPage("results");
    }
  }, [questionIndex]);

  return (
    <div className={styles.center}>
      <p className={styles.question}>{challenge.questions[questionIndex]}</p>
      <div>
        {challenge.answers[questionIndex]?.map((answer, index) => (
          <div
            key={index}
            className={styles.answer_container}
            onClick={() => {
              setUserAnswers((current) => [...current, index]);
              setQuestionIndex(questionIndex + 1);
            }}
          >
            <p className={styles.answer}>
              {index + 1}. {answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;
