"use client";
import Image from "next/image";
import Books from "../../../../public/zapread_bg.png";
import BooksDark from "../../../../public/zapread_bg_dark.png";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Background() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      style={{
        objectFit: "fill",
      }}
    />
  );
}
