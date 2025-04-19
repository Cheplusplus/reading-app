"use client";
import styles from "./resetStatsButton.module.css";

type ResetStatsButtonProps = {
  user: User;
  handleReset: (user: User) => Promise<never>;
};
const ResetStatsButton = ({ user, handleReset }: ResetStatsButtonProps) => {
  return (
    <div className={styles.container}>
      <button
        className={styles.btn}
        onClick={() => {
          if (!confirm("Are you sure you want to erase all stats?")) return;
          handleReset(user);
        }}
      >
        Reset Stats
      </button>
    </div>
  );
};

export default ResetStatsButton;
