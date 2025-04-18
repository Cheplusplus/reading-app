import { redirect } from "next/navigation";
import ResultsLineChart from "../components/ResultsLineChart/ResultsLineChart";
import { getUser } from "../lib/getUserServer";
import styles from "./profile.module.css";
import ResetStatsButton from "../components/ResetStatsButton/ResetStatsButton";
import { handleResetStats } from "../lib/handleResetStats";
import Background from "../components/Background/Background";

const page = async () => {
  const user: User | null = await getUser();
  if (user === null) redirect("/api/auth/login");
  return (
    <>
      <Background />
      <div className={styles.profile_page}>
        <h2 className={styles.total}>Total Completed: {user.stats.length}</h2>
        <ResultsLineChart user={user} />
        <ResetStatsButton user={user} handleReset={handleResetStats} />
      </div>
    </>
  );
};

export default page;
