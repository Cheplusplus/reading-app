import styles from "./results.module.css";
import styles2 from "../../page.module.css";
import { getUserAverages } from "../ResultsLineChart/getUserAverages";
import ResultsLineChart from "../ResultsLineChart/ResultsLineChart";

type ResultsProps = {
  results: Stats;
  user: User;
  challenge: Challenge;
  userAnswers: number[];
};
const Results = ({ results, user, challenge, userAnswers }: ResultsProps) => {
  const createClassNames = () => {
    return challenge.questions.map((question, i) => {
      return challenge.answers[i]?.map((answer, index) => {
        let classString = `${styles.answer_container}`;
        if (challenge.correctAnswers[i] === index) {
          classString += ` ${styles.correct_answer}`;
        }
        if (userAnswers[i] === index) {
          classString += ` ${styles.user_answer}`;
        }
        return classString;
      });
    });
  };
  const classNames = createClassNames();
  user.stats.push(results);
  const { userSpeeds, userScores } = getUserAverages(user);
  const avgScoreAtCurrentSpeed = Math.round(userScores[userSpeeds.indexOf(results.speed)]);

  return (
    <>
      <div className={styles.page_container}>
        <div className={styles.playagain_container}>
          <a href="/reading-app">
            <button className={styles2.start_btn}>Play Again</button>
          </a>
        </div>

        <div className={styles.info_container}>
          <h1 className={styles.info}>Total Completed: {user.stats.length}</h1>
          <h1 className={styles.info}>
            Last Score: <span className={results.score > avgScoreAtCurrentSpeed ? styles.green : undefined}>{results.score}%</span> @ {results.speed}wpm
          </h1>
          <h1 className={styles.info}>
            Avg Score @ {results.speed}wpm: {avgScoreAtCurrentSpeed}%
          </h1>
        </div>
        <ResultsLineChart user={user} />
        {challenge.questions.map((question, i) => {
          return (
            <div className={styles.result_container} key={i}>
              <p className={styles.question}>{question}</p>
              <div>
                {challenge.answers[i]?.map((answer, k) => (
                  <div key={k} className={classNames[i][k]}>
                    <p className={styles.answer}>
                      {k + 1}. {answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Results;
