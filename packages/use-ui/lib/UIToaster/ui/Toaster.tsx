import cls from "classnames";
import compose from "compose-function";
import React, { ComponentType, useEffect } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import type { Toaster as ToasterType } from "../../types";
import { toastModel, useToastStore } from "../hooks/useToast";
import style from "./toaster.module.css";

const Toaster = (props?: ToasterType.ToastFactoryProps) => {
  const state = useToastStore();

  const {
    props: { variant = "default", title, description },
  } = state;

  return (
    <div
      style={props?.style}
      className={cls(
        props?.className,
        style.toaster,
        style[variant],
        `toast--${variant}`
      )}
    >
      {title && (
        <div role="status" className={cls(style.title, "Toast_title")}>
          {title}
        </div>
      )}
      {description && (
        <div className={cls(style.description, "Toast_description")}>
          {description}
        </div>
      )}
    </div>
  );
};

const WithCSSTransition = (
  Component: ComponentType<ToasterType.ToastFactoryProps>
) => {
  const ToastTranstition = (hocProps: ToasterType.ToastFactoryProps) => {
    const state = useToastStore();
    const nodeRef = React.useRef(null);

    useEffect(() => {
      if (hocProps.timeout) {
        toastModel.updateTimeout(hocProps.timeout);
      }
    }, []);

    return createPortal(
      <CSSTransition
        in={state.show}
        nodeRef={nodeRef}
        timeout={300}
        classNames={{
          enter: style.slideEnter,
          enterActive: style.slideEnterActive,
          exit: style.slideExit,
          exitActive: style.slideExitActive,
        }}
        unmountOnExit
      >
        <div
          id="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic={state.show}
          ref={nodeRef}
          className={style.container}
        >
          <Component {...hocProps} />
        </div>
      </CSSTransition>,
      document.body
    );
  };

  return ToastTranstition;
};

export default compose(WithCSSTransition)(Toaster);
