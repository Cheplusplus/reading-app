"use client";
import styles from "./deleteProfileButton.module.css";

type DeleteProfileButtonProps = {
  handleDeleteProfile: () => Promise<void>;
};
const DeleteProfileButton = ({ handleDeleteProfile }: DeleteProfileButtonProps) => {
  return (
    <div className={styles.container}>
      <button
        className={styles.btn}
        onClick={() => {
          if (!confirm("We're sad to see you go :( Are you sure you want to erase your profile?")) return;
          handleDeleteProfile();
        }}
      >
        Delete Profile
      </button>
    </div>
  );
};

export default DeleteProfileButton;
