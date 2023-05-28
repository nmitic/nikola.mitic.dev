"use client";

import { createPortal } from "react-dom";
import styles from "./LoadingIndicator.module.css";

export const LoadingIndicator = () => {
  return createPortal(
    <div className="fixed top-[50px] right-[100px]">
      <div className={styles.spinner} />
    </div>,
    document.body
  );
};
