import styles from "./page.module.css";
import prisma from "./lib/prisma";
import { getSession } from "@auth0/nextjs-auth0";

const page = async () => {
  //@ts-ignore
  const session = await getSession();
  let user = null;
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
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <a href="/api/auth/login">Login</a>
          <a href="/api/auth/logout">Logout</a>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default page;
