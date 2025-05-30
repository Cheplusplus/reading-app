"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import styles from "./accesscontrols.module.css";
import Link from "next/link";

type AccessControlsProps = {
  toggleImage: boolean;
};
const AccessControls = ({ toggleImage }: AccessControlsProps) => {
  const user = useUser();
  return (
    <li data-testid="access-controls" className={styles.li}>
      {user.user ? (
        <a href="/api/auth/logout" data-testid="logout">
          Logout
        </a>
      ) : (
        <a href="/api/auth/login" data-testid="login">
          Login
        </a>
      )}
      {user.user && toggleImage ? (
        <Link href="/profile">
          <img className={styles.img} src={user.user.picture || ""} data-testid="profile-image" />
        </Link>
      ) : null}
    </li>
  );
};
export default AccessControls;
