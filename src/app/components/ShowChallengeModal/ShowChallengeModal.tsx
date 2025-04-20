"use client";
import styles from "./showChallengeModal.module.css";
import { useState } from "react";

type ShowChallengeModalProps = {
  challenge: Challenge;
};
const ShowChallengeModal = ({ challenge }: ShowChallengeModalProps) => {
  const [state, setState] = useState(false);
  return (
    <div className={styles.modal_container}>
      <button className={!state ? styles.btn : `${styles.btn} ${styles.hide}`} onClick={() => setState(true)}>
        View Challenge
      </button>
      <div className={state ? styles.reading_piece_container : "hidden"}>
        <button onClick={() => setState(false)} className={`${styles.close_btn} btn_img`}>
          <span className="material-symbols-outlined">close</span>
        </button>
        <p>{challenge.readingPiece}</p>
      </div>
    </div>
  );
};

export default ShowChallengeModal;
