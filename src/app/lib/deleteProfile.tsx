import prisma from "../lib/prisma";
import { redirect } from "next/navigation";

export const deleteProfile = async (user: User) => {
  "use server";

  await prisma.stats.deleteMany({
    where: {
      userID: user.id,
    },
  });
  await prisma.user.delete({
    where: {
      id: user.id,
    },
  });

  redirect("/api/auth/logout");
};
