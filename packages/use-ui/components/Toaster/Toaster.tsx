import * as stylex from "@stylexjs/stylex";
import React, { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import storage from "../../hooks/useToast/useToastStore";

const styles = stylex.create({
  container: {
    boxSizing: "border-box",
    position: "fixed",
    zIndex: 100,
    bottom: {
      "@media (min-width: 640px)": 0,
    },
    top: {
      default: 0,
      "@media (min-width: 640px)": "auto",
    },
    right: {
      "@media (min-width: 640px)": 0,
    },
    width: {
      default: "100%",
      "@media (min-width: 768px)": 420,
    },
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
    backgroundColor: "#fff",
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

  return createPortal(
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.toaster)}>
        <div {...stylex.props(styles.title)}>{state.props.title}</div>
        <div {...stylex.props(styles.description)}>
          {state.props.description}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Toaster;
