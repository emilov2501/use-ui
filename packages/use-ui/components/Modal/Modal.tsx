import * as stylex from "@stylexjs/stylex";
import React, { HTMLProps, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import storage, { DELAY } from "../../hooks/useModal/useModalStore";
import { wait } from "../../lib/helpers";

const styles = stylex.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backdropFilter: "blur(6px)",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 8,
    minHeight: "50vh",
    padding: 30,
    boxShadow: "0px 3px 6px #00000029",
    overflowY: "auto",
    maxHeight: "calc(100vh - 100px)",
  },
  xxs: {
    width: "30vh",
    minHeight: "10vh",
  },
  xs: {
    width: "30vh",
    minHeight: "20vh",
  },
  sm: {
    width: "50vh",
    minHeight: "50vh",
  },
  lg: {
    width: "70vh",
    minHeight: "70vh",
  },
});

interface Props extends HTMLProps<HTMLDivElement> {
  currentModal: UseModal.Store.ModalData;
}

const Modal = ({ currentModal, className = "" }: Props) => {
  const modalRef = useRef(null);

  const {
    modalName,
    modalProps: { size = "sm", ...props },
  } = currentModal;

  const handleClose = async () => {
    storage.disableAll();
    await wait(DELAY);
    storage.clear();
  };

  useOnClickOutside(modalRef, handleClose);

  return React.createElement(
    "div",
    { ...stylex.props(styles.container) },
    React.createElement(
      "div",
      {
        ...stylex.props(styles.modal, styles[size]),
        ref: modalRef,
      },
      React.createElement("h3", null, modalName),
      React.createElement("div", { className: "content" }, props.content)
    )
  );
};

export default Modal;
