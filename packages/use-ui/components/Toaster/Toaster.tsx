import * as stylex from "@stylexjs/stylex";
import React, { useSyncExternalStore } from "react";
import storage from "../../hooks/useToast/useToastStore";
// import styles from "./styles.module.css";

const styles = stylex.create({
  toaster: {
    display: "flex",
  },
});

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
      <div {...stylex.props(styles.toaster)}>
        <div>{state.props.title}</div>
        <div>{state.props.description}</div>
      </div>
    </div>
  );
};

export default Toaster;
