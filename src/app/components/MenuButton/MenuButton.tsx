"use client";
import { useState } from "react";
import MenuModal from "../MenuModal/MenuModal";
import styles from "./menu.module.css";
import "material-symbols/outlined.css";

const Menu = () => {
  const [state, setState] = useState(false);
  return (
    <div className={styles.menu}>
      <button className="btn_img" onClick={() => setState(true)}>
        <span className="material-symbols-outlined">menu</span>
      </button>

      <MenuModal state={state} setState={setState} />
    </div>
  );
};

export default Menu;
