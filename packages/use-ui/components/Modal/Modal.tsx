import { wait } from "@/lib/helpers";
import cls from "classnames";
import React, { HTMLProps, forwardRef, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { UseModal } from "../../hooks/useModal/useModal.types";
import storage, { DELAY } from "../../hooks/useModal/useModalStore";
import { ModalPMrops } from "./ModalFactory";
import style from "./modal.module.css";

interface Props extends HTMLProps<HTMLDivElement>, ModalPMrops {
  currentModal: UseModal.Store.ModalData;
}

const Modal = forwardRef<HTMLDivElement, Props>(
  (
    { currentModal, style: customStyles, className: customClassName }: Props,
    nodeRef
  ) => {
    const modalRef = useRef(null);

    const {
      modalName,
      modalProps: {
        size = "sm",
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
        <div className={style.wrapper} ref={modalRef}>
          <div
            className={cls(customClassName, style.modal, style[size])}
            style={customStyles}
            ref={nodeRef}
          >
            {buildHeader(modalName, handleClose, showXMarkIcon)}
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
  modalName: String,
  handleClose: Noop,
  showXMarkIcon: boolean = true
) {
  return (
    <div className={cls(style.header, "Modal_header")}>
      <h3 className={cls(style.heading, "Modal_heading")}>{modalName}</h3>
      {showXMarkIcon && (
        <span className={cls(style.xMark, "Modal_xMark")} onClick={handleClose}>
          &#10005;
        </span>
      )}
    </div>
  );
}

function buildBottomNavigationBar(
  bottomNavigationBar: UseModal.BottomNavigationBar
) {
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
