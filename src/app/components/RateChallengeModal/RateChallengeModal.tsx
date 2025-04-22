"use client";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import "material-symbols/outlined.css";
import styles from "./rateChallengeModal.module.css";

const RateChallengeModal = () => {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  return (
    <Modal buttonContent="Rate Challenge">
      {submitted ? (
        <h2>Thank you for rating this challenge!</h2>
      ) : (
        <>
          <div className={styles.stars_container}>
            {new Array(5).fill(0).map((_, i) => (
              <button className={rating >= i + 1 ? `${styles.chosen} btn_img` : "btn_img"} onClick={() => setRating(i + 1)}>
                <span className="material-symbols-outlined">star</span>
              </button>
            ))}
          </div>
          <button
            className={styles.btn}
            onClick={() => {
              setSubmitted(true);
            }}
          >
            Submit
          </button>
        </>
      )}
    </Modal>
  );
};

export default RateChallengeModal;
