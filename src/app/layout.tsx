import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import styles from "./page.module.css";
import AccessControls from "./components/AccessContols/AccessControls";
import Image from "next/image";
import logo from "../../public/open-book-with-brain-emerging-from-the-pages.svg";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProver";
import ToggleThemeButton from "./components/ToogleTheme/ToggleThemeButton";
import MenuButton from "./components/MenuButton/MenuButton";
import Footer from "./components/Footer/Footer";
import Background from "./components/Background/Background";

export const metadata = {
  title: "ZapRead | Interactive Reading Comprehension",
  description: "Generate high-quality, fact-based stories and test your understanding with randomized multiple-choice questions.",
  keywords: ["reading comprehension", "education", "interactive quiz", "stories", "learning", "javascript quiz format", "true stories", "multiple choice"],
  authors: [{ name: "ZapRead", url: "https://zapread.online" }],
  creator: "Che Overmeyer",
  openGraph: {
    title: "ZapRead",
    description: "Read fact-based stories and test your comprehension with randomized multiple-choice quizzes.",
    url: "https://zapread.online",
    siteName: "ZapRead",
    images: [
      {
        url: "https://zapread.online/_next/static/media/open-book-with-brain-emerging-from-the-pages.d942a82a.svg", // Replace with your OG image
        width: 1200,
        height: 630,
        alt: "ZapRead preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZapRead",
    description: "Challenge your reading skills with dynamic quizzes based on real-world stories.",
    images: ["https://zapread.online/_next/static/media/open-book-with-brain-emerging-from-the-pages.d942a82a.svg"], // Replace with your image
    creator: "Che Overmeyer", // Optional
  },
  metadataBase: new URL("https://zapread.online"),
  themeColor: "#ffffff", // Adjust for light/dark if needed
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <UserProvider>
        <body>
          <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
            <header className={styles.header}>
              <Image src={logo} alt="Logo" className={styles.logo} />
              <nav>
                <MenuButton />
                <ul className={styles.nav_list}>
                  <li className={styles.li}>
                    <ToggleThemeButton />
                  </li>
                  <li className={styles.li}>
                    <a href="/">Home</a>
                  </li>
                  <li className={styles.li}>
                    <a href="/roadmap">Roadmap</a>
                  </li>
                  <AccessControls toggleImage={true} />
                </ul>
              </nav>
            </header>

            <main className={styles.main}>{children}</main>
          </ThemeProvider>
        </body>
        <Footer />
        {/* Footer */}
      </UserProvider>
    </html>
  );
}
