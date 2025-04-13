import prisma from "./prisma";
import { getSession } from "@auth0/nextjs-auth0";

export const getUser = async () => {
  const session = await getSession();
  let user: User;
  if (session) {
    user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        stats: true,
      },
    });
    if (user === null) {
      user = await prisma.user.create({
        data: {
          username: session.user.nickname,
          email: session.user.email,
        },
      });
    }
    return user;
  }
  return null;
};
