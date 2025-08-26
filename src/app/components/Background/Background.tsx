"use client";
import Image from "next/image";
import Books from "../../../../public/zapread_bg.png";
import BooksDark from "../../../../public/zapread_bg_dark.png";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function usePrefersDarkMode() {
  const [prefersDarkMode, setPrefersDarkMode] = useState(() => {
    // Initialize state based on current system preference
    if (typeof window !== "undefined") {
      // Check if window is defined (for SSR)
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false; // Default to false if window is not defined
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return; // Do nothing if window is not defined (for SSR)
    }

    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersDarkMode(event.matches);
    };

    // Add event listener for changes
    mediaQueryList.addEventListener("change", handleChange);

    // Clean up the event listener on unmount
    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return prefersDarkMode;
}

export default function Background() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const prefersDarkMode = usePrefersDarkMode();

  useEffect(() => {
    setMounted(true);
    if (theme === "system") {
      setTheme(prefersDarkMode ? "dark" : "light");
    }
  }, []);

  if (!mounted) {
    // Prevent SSR mismatch
    return null;
  }
  return (
    <Image
      data-testid="background"
      alt="Muted Grey Books"
      src={theme === "dark" ? BooksDark : Books}
      placeholder="blur"
      quality={100}
      sizes="100vw"
      fill
      priority={true}
      style={{
        objectFit: "fill",
      }}
    />
  );
}
