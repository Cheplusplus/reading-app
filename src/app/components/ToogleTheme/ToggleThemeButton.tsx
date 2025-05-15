"use client";
import styles from "./toggleThemeButton.module.css";
import "material-symbols/outlined.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type ToggleThemeButtonProps = {
  setTheme: Dispatch<SetStateAction<string>>;
  theme: string | undefined;
};
const ToggleThemeButton = ({ setTheme, theme }: ToggleThemeButtonProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <></>; // Avoid SSR issues

  return (
    <div className={styles.container}>
      {theme === "light" ? (
        <button
          className={styles.btn}
          onClick={() => {
            setTheme("dark");
          }}
        >
          <span className="material-symbols-outlined">dark_mode</span>
        </button>
      ) : (
        <button
          className={styles.btn}
          onClick={() => {
            setTheme("light");
          }}
        >
          <span className="material-symbols-outlined">light_mode</span>
        </button>
      )}
    </div>
  );
};

export default ToggleThemeButton;
