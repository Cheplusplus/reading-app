import prisma from "../lib/prisma";
import { redirect } from "next/navigation";

export const handleResetStats = async (user: User) => {
  "use server";
  console.log(
    await prisma.stats.deleteMany({
      where: {
        userID: user.id,
      },
    })
  );
  redirect("/profile");
};
