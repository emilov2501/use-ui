import cls from "classnames";
import React, { HTMLProps, useMemo, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { wait } from "../helpers";
import styles from "../styles.module.css";
import storage, { DELAY } from "./useModalStore";
interface Props extends HTMLProps<HTMLDivElement> {
  currentModal: UseModal.Store.ModalData;
}

const useCustomModal = ({ currentModal, className = "" }: Props) => {
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

export default useCustomModal;
