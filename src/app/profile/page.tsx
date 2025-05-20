import { redirect } from "next/navigation";
import ResultsLineChart from "../components/ResultsLineChart/ResultsLineChart";
import { getUser } from "../lib/getUserServer";
import styles from "./profile.module.css";
import ResetStatsButton from "../components/ResetStatsButton/ResetStatsButton";
import { handleResetStats } from "../lib/handleResetStats";
import Background from "../components/Background/Background";
import DeleteProfileButton from "../components/DeleteProfileButton/DeleteProfileButton";
import { deleteProfile } from "../lib/deleteProfile";
import { toast } from "react-hot-toast";

const page = async () => {
  const user: User | null = await getUser();
  if (user === null) redirect("/api/auth/login");

  const handleDeleteProfile = async () => {
    "use server";
    const result = await deleteProfile(user);
    if (result) redirect("/api/auth/logout");
    toast.error("An error occured, Please try again.");
  };

  return (
    <>
      <Background />
      <div className={styles.profile_page}>
        <h2 className={styles.total}>Total Completed: {user.stats?.length}</h2>
        <ResultsLineChart user={user} />
        <ResetStatsButton user={user} handleReset={handleResetStats} />
        <DeleteProfileButton handleDeleteProfile={handleDeleteProfile} />
      </div>
    </>
  );
};

export default page;
