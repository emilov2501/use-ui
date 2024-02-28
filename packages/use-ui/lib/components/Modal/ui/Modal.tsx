import cls from "classnames";
import React, { forwardRef } from "react";
import type {
  BottomNavigationBar,
  ModalFactoryProps,
  ModalId,
  ModalProps,
  ModalSize,
  Noop,
} from "../../../interfaces";

import { modalModel } from "../../../hooks/useModal/useModal";
import { useCloseModalOnEscape } from "../hooks/useCloseModalOnEnter";
import style from "../styles/modal.module.css";

interface Props extends ModalFactoryProps, ModalProps {
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
    const handleClose = () => modalModel.close(id);

    useCloseModalOnEscape(modalModel.close, id);

    return (
      <div className={style.container} id="dialog_layer">
        <div
          className={style.wrapper}
          ref={nodeRef}
          role="dialog"
          id={id}
          aria-labelledby={title}
          aria-modal={!!id}
        >
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
  title: string,
  handleClose: Noop,
  showXMarkIcon: boolean = true
) {
  return (
    <div className={cls(style.header, "Modal_header")}>
      <h3 id={title} className={cls(style.heading, "Modal_heading")}>
        {title}
      </h3>
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
