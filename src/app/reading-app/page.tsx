import ReaderPageManager from "../components/ReaderPageManager/ReaderPageManager";
import { getUser } from "../lib/getUserServer";
import { saveStats } from "../lib/saveStats";
import { redirect } from "next/navigation";
import { getChallenge } from "../lib/getChallenge";

const page = async () => {
  const user: User | null = await getUser();
  if (user === null) redirect("/api/auth/login");
  return (
    <>
      <ReaderPageManager getChallenge={getChallenge} user={user} saveResults={saveStats} />
    </>
  );
};

export default page;
