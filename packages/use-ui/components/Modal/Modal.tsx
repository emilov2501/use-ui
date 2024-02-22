import { wait } from "@/lib/helpers";
import cls from "classnames";
import React, { HTMLProps, forwardRef, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import storage, { DELAY } from "../../hooks/useModal/useModalStore";
import style from "./modal.module.css";

interface Props extends HTMLProps<HTMLDivElement> {
  currentModal: UseModal.Store.ModalData;
}

const Modal = forwardRef(({ currentModal }: Props, nodeRef) => {
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
    {
      className: style.container,
    },
    React.createElement(
      "div",
      { ref: modalRef },
      React.createElement(
        "div",
        {
          className: cls(style.modal, style[size]),
          ref: nodeRef,
        },
        React.createElement("h3", null, modalName),
        React.createElement("div", { className: "content" }, props.content)
      )
    )
  );
});

export default Modal;
