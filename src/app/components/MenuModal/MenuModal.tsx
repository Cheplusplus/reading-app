"use client";
import styles from "./menumodal.module.css";
import ToggleThemeButton from "../ToogleTheme/ToggleThemeButton";
import AccessControls from "../AccessContols/AccessControls";
import "material-symbols/outlined.css";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

type MenuModalProps = {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
};
const MenuModal = ({ state, setState }: MenuModalProps) => {
  return (
    <div data-testid="container" className={state ? styles.menu_container : "hidden"}>
      <button onClick={() => setState(false)} className="btn_img">
        <span className="material-symbols-outlined">close</span>
      </button>

      <nav>
        <ul className={styles.nav_list}>
          <li className={styles.li}>
            <ToggleThemeButton />
          </li>
          <li className={styles.li}>
            <a href="/" data-testid="home">
              Home
            </a>
          </li>
          <li className={styles.li} onClick={() => setState(false)}>
            <Link href="/reading-app" data-testid="read">
              Read
            </Link>
          </li>
          <li className={styles.li}>
            <a href="/roadmap" data-testid="roadmap">
              Roadmap
            </a>
          </li>
          <AccessControls toggleImage={false} />
          <li className={styles.li} onClick={() => setState(false)}>
            <Link href="/profile" data-testid="profile">
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuModal;
