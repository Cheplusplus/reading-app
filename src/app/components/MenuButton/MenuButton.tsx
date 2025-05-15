"use client";
import { Dispatch, SetStateAction, useState } from "react";
import MenuModal from "../MenuModal/MenuModal";
import styles from "./menu.module.css";
import "material-symbols/outlined.css";

type MenuProps = {
  setTheme: Dispatch<SetStateAction<string>>;
  theme: string | undefined;
};
const Menu = ({ setTheme, theme }: MenuProps) => {
  const [state, setState] = useState(false);
  return (
    <div className={styles.menu}>
      <button className="btn_img" onClick={() => setState(true)}>
        <span className="material-symbols-outlined">menu</span>
      </button>

      <MenuModal state={state} setState={setState} setTheme={setTheme} theme={theme} />
    </div>
  );
};

export default Menu;
