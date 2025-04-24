"use client";
import { startTransition, useOptimistic, useState } from "react";
import Modal from "../Modal/Modal";
import "material-symbols/outlined.css";
import styles from "./rateChallengeModal.module.css";
import { saveChallenge } from "@/app/lib/saveChallenge";

type RateChallengeModalProps = {
  challenge: Challenge;
};
const RateChallengeModal = ({ challenge }: RateChallengeModalProps) => {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [optimisticSubmitted, setOptimisticSubmitted] = useOptimistic(submitted);
  const handleSubmit = () => {
    if (rating < 4) {
      setSubmitted(true);
      return;
    }
    startTransition(() => {
      setOptimisticSubmitted(true);
    });
    try {
      saveChallenge(challenge, rating);
      setSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal buttonContent="Rate Challenge">
      {optimisticSubmitted ? (
        <h2>Thank you for rating this challenge!</h2>
      ) : (
        <>
          <div className={styles.stars_container}>
            {new Array(5).fill(0).map((_, i) => (
              <button key={i} className={rating >= i + 1 ? `${styles.chosen} btn_img` : "btn_img"} onClick={() => setRating(i + 1)}>
                <span className={`${styles.star} material-symbols-outlined`}>star</span>
              </button>
            ))}
          </div>
          <button className={styles.btn} onClick={handleSubmit}>
            Submit
          </button>
        </>
      )}
    </Modal>
  );
};

export default RateChallengeModal;
