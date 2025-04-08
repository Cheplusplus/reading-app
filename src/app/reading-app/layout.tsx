import styles from "./readingapp.module.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header></header>
      <main className={styles.main}>{children}</main>
      <footer></footer>
    </>
  );
}
