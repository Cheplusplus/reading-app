"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import styles from "./accesscontrols.module.css";
import Link from "next/link";

const AccessControls = () => {
  const user = useUser();
  return (
    <li className={styles.li}>
      {user.user ? <Link href="/api/auth/logout">Logout</Link> : <Link href="/api/auth/login">Login</Link>}
      {user.user ? (
        <a href="/profile">
          <img className={styles.img} src={user.user.picture || ""} />
        </a>
      ) : null}
    </li>
  );
};
export default AccessControls;
