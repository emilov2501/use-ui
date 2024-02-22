import { wait } from "@/lib/helpers";
import type { BottomNavigationBar, ModalStore } from "@/types/modal";
import cls from "classnames";
import React, { HTMLProps, forwardRef, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import storage, { DELAY } from "../../hooks/useModal/useModalStore";
import type { ModalFactoryProps } from "./ModalFactory";
import style from "./modal.module.css";

interface Props extends HTMLProps<HTMLDivElement>, ModalFactoryProps {
  currentModal: ModalStore.ModalData;
}

const Modal = forwardRef<HTMLDivElement, Props>(
  (
    { currentModal, style: customStyles, className: customClassName }: Props,
    nodeRef
  ) => {
    const modalRef = useRef(null);

    const {
      modalProps: {
        size = "sm",
        title,
        bottomNavigationBar,
        showXMarkIcon,
        allowClickOutside,
        ...props
      },
    } = currentModal;

    const handleClose = async () => {
      storage.disableAll();
      await wait(DELAY);
      storage.clear();
    };

    useOnClickOutside(modalRef, allowClickOutside ? handleClose : () => ({}));

    return (
      <div className={style.container}>
        <div className={style.wrapper} ref={nodeRef}>
          <div
            className={cls(customClassName, style.modal, style[size])}
            style={customStyles}
            ref={modalRef}
          >
            {title && buildHeader(title, handleClose, showXMarkIcon)}
            <div className={cls(style.content, "Modal_content")}>
              {props.content}
            </div>
            {bottomNavigationBar &&
              buildBottomNavigationBar(bottomNavigationBar)}
          </div>
        </div>
      </div>
    );
  }
);
function buildHeader(
  title: String,
  handleClose: Noop,
  showXMarkIcon: boolean = true
) {
  return (
    <div className={cls(style.header, "Modal_header")}>
      <h3 className={cls(style.heading, "Modal_heading")}>{title}</h3>
      {showXMarkIcon && (
        <span className={cls(style.xMark, "Modal_xMark")} onClick={handleClose}>
          &#10005;
        </span>
      )}
    </div>
  );
}

function buildBottomNavigationBar(bottomNavigationBar: BottomNavigationBar) {
  return (
    <div
      style={{
        gap: `${bottomNavigationBar.gap || 0}px`,
      }}
      className={cls("Modal_footer", style.bottomNavigationBar, {
        [style.justifyBetween]: !!bottomNavigationBar.justifyBetween,
        [style.alignCenter]: !!bottomNavigationBar.alignCenter,
      })}
    >
      {bottomNavigationBar.items.map((action, index) => (
        <div key={index}>{action}</div>
      ))}
    </div>
  );
}

export default Modal;
