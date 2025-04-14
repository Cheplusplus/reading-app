"use client";
import Image from "next/image";
import styles from "./menumodal.module.css";
import ToggleThemeButton from "../ToogleTheme/ToggleThemeButton";
import AccessControls from "../AccessContols/AccessControls";
import logo from "../../../../public/open-book-with-brain-emerging-from-the-pages.svg";
import "material-symbols/outlined.css";
import { Dispatch, SetStateAction } from "react";

type MenuModalProps = {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
};
const MenuModal = ({ state, setState }: MenuModalProps) => {
  return (
    <div className={state ? styles.menu_container : "hidden"}>
      <button onClick={() => setState(false)} className="btn_img">
        <span className="material-symbols-outlined">close</span>
      </button>

      <nav>
        <ul className={styles.nav_list}>
          <li className={styles.li} onClick={() => setState(false)}>
            <ToggleThemeButton />
          </li>
          <li className={styles.li}>
            <a href="/">Home</a>
          </li>
          <li className={styles.li}>
            <a href="/roadmap">Roadmap</a>
          </li>
          <AccessControls toggleImage={false} />
          <li className={styles.li}>
            <a href="/profile">Profile</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuModal;
