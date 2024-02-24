import cls from "classnames";
import compose from "compose-function";
import React, { ForwardRefExoticComponent, useSyncExternalStore } from "react";
import { CSSTransition } from "react-transition-group";
import { storage } from "../useToast/useToast";
import "./animation.css";
import style from "./toaster.module.css";

const Toaster = () => {
  const state = useSyncExternalStore(storage.subscribe, storage.getState);

  const {
    props: { variant = "default", title, description },
  } = state;

  return (
    <div className={cls(style.toaster, style[variant])}>
      <div className={style.title}>{title}</div>
      <div className={style.description}>{description}</div>
    </div>
  );
};

const WithCSSTransition = (Component: ForwardRefExoticComponent<any>) => {
  const ToastTranstition = () => {
    const state = useSyncExternalStore(storage.subscribe, storage.getState);
    const nodeRef = React.useRef(null);

    return (
      <CSSTransition
        in={state.show}
        nodeRef={nodeRef}
        timeout={300}
        classNames="toast"
        unmountOnExit
      >
        <div ref={nodeRef} className={style.container}>
          <Component />
        </div>
      </CSSTransition>
    );
  };

  return ToastTranstition;
};

export default compose(WithCSSTransition)(Toaster);
