"use client";
import Reader from "../Reader/Reader";
import Questions from "../Questions/Questions";
import Results from "../Results/Results";
import { useEffect, useState } from "react";
import styles from "./readingapp.module.css";

type ReaderPageManagerProps = {
  getChallenge: (difficulty: "easy" | "intermediate" | "challenging") => Promise<Challenge | undefined>;
  user: User;
  saveResults: (stats: Stats) => void;
};

const ReaderPageManager = ({ getChallenge, user, saveResults }: ReaderPageManagerProps) => {
  const [challenge, setChallenge] = useState<Challenge>({ id: "0", readingPiece: "", questions: [], answers: [[]], correctAnswers: [] });
  const [page, setPage] = useState<"reader" | "questions" | "results">("reader");
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [results, setResults] = useState<Stats>({ score: 0, speed: 0, userID: 2 });
  const [wordsPerMinute, setWPM] = useState<number>(200);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNewChallenge = async (difficulty: "easy" | "intermediate" | "challenging") => {
    setLoading(true);
    const challenge = await getChallenge(difficulty);
    if (!challenge) return;
    setChallenge(challenge);
    setLoading(false);
  };

  useEffect(() => {
    if (userAnswers.length === challenge?.questions.length) {
      const results = checkResults();
      if (Number.isNaN(results?.score)) return;
      if (results === undefined) return;
      setResults(results);
      console.log("saving");
      saveResults(results);
    }
  }, [userAnswers]);

  useEffect(() => {
    // fetchNewChallenge("intermediate");
  }, []);

  const checkResults = () => {
    if (user === null) return;
    const results = userAnswers.reduce(
      (result: Stats, answer: number, i) => {
        if (challenge?.correctAnswers[i] === answer) {
          result.score += 1;
        }
        return result;
      },
      { score: 0, speed: wordsPerMinute, userID: user.id }
    );
    //Give the result as a percentage.
    if (!challenge) return;
    return { ...results, score: Math.round((results.score / challenge.questions.length) * 100) };
  };

  const pages = {
    reader: <Reader piece={challenge.readingPiece} setPage={setPage} wordsPerMinute={wordsPerMinute} setWPM={setWPM} loading={loading} fetchNewChallenge={fetchNewChallenge} />,
    questions: <Questions challenge={challenge} setUserAnswers={setUserAnswers} setPage={setPage} />,
    results: <Results results={results} user={user} userAnswers={userAnswers} challenge={challenge} />,
  };

  return (
    <div className={styles.body}>
      <div className={styles.center}>{pages[page]}</div>
    </div>
  );
};

export default ReaderPageManager;
