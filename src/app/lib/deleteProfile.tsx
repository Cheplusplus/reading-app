import prisma from "../lib/prisma";

export const deleteProfile = async (user: User) => {
  "use server";
  try {
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

    return true;
  } catch {
    return false;
  }
};
