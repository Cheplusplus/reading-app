"use client";
import styles from "./deleteProfileButton.module.css";

type DeleteProfileButtonProps = {
  user: User;
  deleteProfile: (user: User) => Promise<never>;
};
const DeleteProfileButton = ({ user, deleteProfile }: DeleteProfileButtonProps) => {
  return (
    <div className={styles.container}>
      <button
        className={styles.btn}
        onClick={() => {
          if (!confirm("We're sad to see you go :( Are you sure you want to erase your profile?")) return;
          deleteProfile(user);
        }}
      >
        Delete Profile
      </button>
    </div>
  );
};

export default DeleteProfileButton;
