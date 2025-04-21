"use client";
import { useState } from "react";
import Modal from "../Modal/Modal";
import "material-symbols/outlined.css";

const RateChallengeModal = () => {
  const [rating, setRating] = useState(0);

  return (
    <Modal buttonContent="Rate Challenge">
      <h3>Rate This Challenge:</h3>
      <div>
        <button className="btn_img">
          <span className="material-symbols-outlined">star</span>
        </button>
        <button className="btn_img">
          <span className="material-symbols-outlined">star</span>
        </button>
        <button className="btn_img">
          <span className="material-symbols-outlined">star</span>
        </button>
        <button className="btn_img">
          <span className="material-symbols-outlined">star</span>
        </button>
        <button className="btn_img">
          <span className="material-symbols-outlined">star</span>
        </button>
      </div>
    </Modal>
  );
};

export default RateChallengeModal;
