"use client";
import styles from "./toggleThemeButton.module.css";
import { useTheme } from "next-themes";
import "material-symbols/outlined.css";
import { useEffect, useState } from "react";

const ToggleThemeButton = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null; // Avoid SSR issues

  return (
    <div data-testid="theme" className={styles.container}>
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
