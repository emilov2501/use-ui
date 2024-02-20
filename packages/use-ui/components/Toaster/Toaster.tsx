import React, { useSyncExternalStore } from "react";
import { pxToRem } from "../../helpers";
import storage from "../../hooks/useToast/useToastStore";
import styles from "./styles.module.css";

const Toaster = () => {
  const state = useSyncExternalStore(storage.subscribe, storage.getState);

  if (!state.show) {
    return null;
  }

  return (
    <div
      tabIndex={-1}
      style={{
        position: "fixed",
      }}
    >
      <div
        style={{
          userSelect: "none",
          touchAction: "none",
          display: "flex",
          flexDirection: "column",
          rowGap: pxToRem(4),
          textAlign: "left",
        }}
      >
        <div className={styles.toaster}>{state.props.title}</div>
        <div>{state.props.description}</div>
      </div>
    </div>
  );
};

export default Toaster;
