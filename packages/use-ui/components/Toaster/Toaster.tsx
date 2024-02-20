import * as stylex from "@stylexjs/stylex";
import React, { useSyncExternalStore } from "react";
import storage from "../../hooks/useToast/useToastStore";
// import styles from "./styles.module.css";

const styles = stylex.create({
  container: {
    position: "fixed",
    zIndex: 100,
    bottom: 15,
    right: 15,
    maxWidth: 420,
    padding: 16,
  },
  toaster: {
    display: "flex",
    userSelect: "none",
    touchAction: "none",
    flexDirection: "column",
    rowGap: 4,
    textAlign: "left",
    border: "1px solid #ccc",
    paddingInline: 16,
    paddingBlock: 16,
    overflow: "hidden",
    pointerEvents: "auto",
    position: "relative",
  },
  title: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: 16,
  },
  description: {
    lineHeight: "16px",
    fontSize: 14,
    tabSize: 4,
  },
});

const Toaster = () => {
  const state = useSyncExternalStore(storage.subscribe, storage.getState);

  if (!state.show) {
    return null;
  }

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.toaster)}>
        <div {...stylex.props(styles.title)}>{state.props.title}</div>
        <div {...stylex.props(styles.description)}>
          {state.props.description}
        </div>
      </div>
    </div>
  );
};

export default Toaster;
