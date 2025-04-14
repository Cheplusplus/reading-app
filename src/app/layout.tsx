import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import styles from "./page.module.css";
import AccessControls from "./components/AccessContols/AccessControls";
import Image from "next/image";
import logo from "../../public/open-book-with-brain-emerging-from-the-pages.svg";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProver";
import ToggleThemeButton from "./components/ToogleTheme/ToggleThemeButton";
import MenuButton from "./components/MenuButton/MenuButton";
import MenuModal from "./components/MenuModal/MenuModal";

export const metadata = {
  title: "Read & Test | Interactive Reading Comprehension",
  description: "Generate high-quality, fact-based stories and test your understanding with randomized multiple-choice questions.",
  keywords: ["reading comprehension", "education", "interactive quiz", "stories", "learning", "javascript quiz format", "true stories", "multiple choice"],
  authors: [{ name: "Your App Name", url: "https://yourdomain.com" }],
  creator: "Your App Name",
  openGraph: {
    title: "Read & Test",
    description: "Read fact-based stories and test your comprehension with randomized multiple-choice quizzes.",
    url: "https://yourdomain.com",
    siteName: "Read & Test",
    images: [
      {
        url: "https://yourdomain.com/og-image.png", // Replace with your OG image
        width: 1200,
        height: 630,
        alt: "Read & Test preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Read & Test",
    description: "Challenge your reading skills with dynamic quizzes based on real-world stories.",
    images: ["https://yourdomain.com/og-image.png"], // Replace with your image
    creator: "@yourtwitterhandle", // Optional
  },
  metadataBase: new URL("https://yourdomain.com"),
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

            <footer className={styles.footer}>
              <p>&copy; {new Date().getFullYear()} AI Reading App. All rights reserved.</p>
            </footer>
          </ThemeProvider>
        </body>

        {/* Footer */}
      </UserProvider>
    </html>
  );
}
