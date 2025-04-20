"use client";
import styles from "./showChallengeModal.module.css";
import { useState } from "react";

type ShowChallengeModalProps = {
  challenge: Challenge;
};
const ShowChallengeModal = ({ challenge }: ShowChallengeModalProps) => {
  const [state, setState] = useState(false);
  return (
    <div>
      <button className={styles.btn} onClick={() => setState(true)}>
        View Challenge
      </button>
      <div className={state ? styles.reading_piece_container : "hidden"}>
        <button onClick={() => setState(false)} className="btn_img">
          <span className="material-symbols-outlined">close</span>
        </button>
        <p>{challenge.readingPiece}</p>
      </div>
    </div>
  );
};

export default ShowChallengeModal;
