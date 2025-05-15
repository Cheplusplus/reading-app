"use client";
import { JSX } from "react/jsx-runtime";
import styles from "./modal.module.css";
import { useState } from "react";

type ModalProps = {
  children?: JSX.Element | JSX.Element[];
  buttonContent: string;
};
const Modal = ({ children, buttonContent }: ModalProps) => {
  const [state, setState] = useState(false);

  return (
    <div data-testid="modal-container" className={styles.modal_container}>
      <button className={!state ? styles.btn : `${styles.btn} ${styles.hide}`} onClick={() => setState(true)}>
        {buttonContent}
      </button>
      <div data-testid="modal" className={state ? styles.container : styles.hide}>
        <button onClick={() => setState(false)} className={`${styles.close_btn} btn_img`}>
          <span className="material-symbols-outlined">close</span>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
