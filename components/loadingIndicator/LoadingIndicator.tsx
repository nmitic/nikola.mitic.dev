"use client";

import { createPortal } from "react-dom";
import styles from "./LoadingIndicator.module.css";

const LoadingIndicator = () => {
  return createPortal(
    <div className="fixed top-[50px] right-[100px] scale-60">
      <div className={styles.spinner} />
    </div>,
    document.body
  );
};

export default LoadingIndicator;
