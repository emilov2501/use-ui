import cls from "classnames";
import React, { forwardRef } from "react";
import type {
  BottomNavigationBar,
  ModalId,
  ModalSize,
  ModalStore,
  Noop,
} from "../interfaces";
import { storage } from "../useModal/useModal";
import type { ModalFactoryProps } from "./ModalFactory";
import style from "./modal.module.css";

interface Props extends ModalFactoryProps, ModalStore.ModalProps {
  size?: ModalSize;
  id: ModalId;
}

const Modal = forwardRef<HTMLDivElement, Props>(
  (
    {
      id,
      size = "sm",
      title,
      bottomNavigationBar,
      showXMarkIcon,
      style: customStyles,
      className: customClassName,
      ...props
    }: Props,
    nodeRef
  ) => {
    const handleClose = () => storage.close(id);

    return (
      <div className={style.container}>
        <div className={style.wrapper} ref={nodeRef}>
          <div
            className={cls(customClassName, style.modal, style[size])}
            style={customStyles}
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
