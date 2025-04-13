import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import styles from "./page.module.css";
import { getSession } from "@auth0/nextjs-auth0";
import AccessControls from "./components/AccessContols/AccessControls";
import Image from "next/image";
import logo from "../../public/open-book-with-brain-emerging-from-the-pages.svg";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProver";
import ToggleThemeButton from "./components/ToogleTheme/ToggleThemeButton";

//@ts-ignore
const session = await getSession();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <UserProvider>
        <body suppressHydrationWarning>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <header className={styles.header}>
              <Image src={logo} alt="Logo" className={styles.logo} />
              <div className={styles.controls}>
                <ToggleThemeButton />
                <nav>
                  <ul className={styles.nav_list}>
                    <li className={styles.li}>
                      <a href="/">Home</a>
                    </li>
                    <li className={styles.li}>
                      <a href="/roadmap">Roadmap</a>
                    </li>
                    <AccessControls />
                  </ul>
                </nav>
              </div>
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
