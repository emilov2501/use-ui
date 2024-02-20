import cls from "classnames";
import React, { HTMLProps, useMemo, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import storage, { DELAY } from "../../hooks/useModal/useModalStore";
import { wait } from "../../lib/helpers";
import styles from "./modal.module.css";

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

  const classNames = useMemo(
    () => cls(styles.modal, styles[`modal-size--${size}`], className),
    [className, size]
  );

  return React.createElement(
    "div",
    { className: styles.wrapper },
    React.createElement(
      "div",
      {
        className: classNames,
        ref: modalRef,
      },
      React.createElement("h3", null, modalName),
      React.createElement("div", { className: "content" }, props.content)
    )
  );
};

export default Modal;
