"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import styles from "./accesscontrols.module.css";

const AccessControls = () => {
  const user = useUser();
  return (
    <li className={styles.li}>
      {user.user ? <a href="/api/auth/logout">Logout</a> : <a href="/api/auth/login">Login</a>}
      {user.user ? (
        <a href="/profile">
          <img className={styles.img} src={user.user.picture || ""} />
        </a>
      ) : null}
    </li>
  );
};
export default AccessControls;
