import { wait } from "@/lib/helpers";
import cls from "classnames";
import { HTMLProps, createElement as create, forwardRef, useRef } from "react";
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

  return create(
    "div",
    { className: style.container },
    create(
      "div",
      { className: style.wrapper, ref: modalRef },
      create(
        "div",
        {
          className: cls(style.modal, style[size]),
          ref: nodeRef,
        },
        create("h3", null, modalName),
        create("div", { className: "content" }, props.content)
      )
    )
  );
});

export default Modal;
