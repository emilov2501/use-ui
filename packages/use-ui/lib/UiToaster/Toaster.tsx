import cls from "classnames";
import compose from "compose-function";
import React, { ComponentType, useEffect, useSyncExternalStore } from "react";
import { CSSTransition } from "react-transition-group";
import type { ToastFactoryProps } from "../interfaces";
import { storage, toastModel } from "../useToast/useToast";
import "./animation.css";
import style from "./toaster.module.css";

const Toaster = (props?: ToastFactoryProps) => {
  const state = useSyncExternalStore(storage.subscribe, storage.getState);

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
      {title && <div className={cls(style.title, "Toast_title")}>{title}</div>}
      {description && (
        <div className={cls(style.description, "Toast_description")}>
          {description}
        </div>
      )}
    </div>
  );
};

const WithCSSTransition = (Component: ComponentType<ToastFactoryProps>) => {
  const ToastTranstition = (hocProps: ToastFactoryProps) => {
    const state = useSyncExternalStore(storage.subscribe, storage.getState);
    const nodeRef = React.useRef(null);

    useEffect(() => {
      if (hocProps.timeout) {
        toastModel.updateTimeout(hocProps.timeout);
      }
    }, []);

    return (
      <CSSTransition
        in={state.show}
        nodeRef={nodeRef}
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        <div ref={nodeRef} className={style.container}>
          <Component {...hocProps} />
        </div>
      </CSSTransition>
    );
  };

  return ToastTranstition;
};

export default compose(WithCSSTransition)(Toaster);
