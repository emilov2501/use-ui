import { useMediaQuery } from "@/hooks";
import * as stylex from "@stylexjs/stylex";
import compose from "compose-function";
import React, {
  ForwardRefExoticComponent,
  forwardRef,
  useMemo,
  useSyncExternalStore,
} from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionClassNames } from "react-transition-group/CSSTransition";
import storage from "../../hooks/useToast/useToastStore";

const Toaster = forwardRef<HTMLDivElement>((_, nodeRef) => {
  const state = useSyncExternalStore(storage.subscribe, storage.getState);

  const {
    props: { variant = "default", title, description },
  } = state;

  return (
    <div {...stylex.props(styles.container)} ref={nodeRef}>
      <div {...stylex.props(styles.toaster, styles[variant])}>
        <div {...stylex.props(styles.title)}>{title}</div>
        <div {...stylex.props(styles.description)}>{description}</div>
      </div>
    </div>
  );
});

const WithCSSTransition = (Component: ForwardRefExoticComponent<any>) => {
  const ToastTranstition = () => {
    const state = useSyncExternalStore(storage.subscribe, storage.getState);
    const nodeRef = React.useRef(null);
    const max640 = useMediaQuery("(max-width: 640px)");
    const min768 = useMediaQuery("(min-width: 768px)");

    const className: CSSTransitionClassNames = useMemo(
      () => ({
        enter: stylex.props(
          max640 && animate.toastEnter640,
          !max640 && animate.toastEnter
        ).className,
        enterActive: stylex.props(animate.toastEnterActive).className,
        exit: stylex.props(animate.toastExit).className,
        exitActive: stylex.props(
          max640 && animate.toastExitActiveMax640,
          !max640 && animate.toastExitActiveMin640,
          min768 && animate.toastExitActive
        ).className,
      }),
      [max640, min768]
    );

    return (
      <CSSTransition
        in={state.show}
        nodeRef={nodeRef}
        timeout={300}
        classNames={className}
        onExited={storage.hide}
        unmountOnExit
      >
        <Component ref={nodeRef} />
      </CSSTransition>
    );
  };

  return ToastTranstition;
};

const animate = stylex.create({
  /* These CSS properties `toastEnter640` and `toastEnter` are defining the styles for the enter
  animation of the toast component. */
  toastEnter640: {
    opacity: 0,
    transform: "translateY(-100%)",
  },
  toastEnter: {
    opacity: 0,
    transform: "translateY(100%)",
  },
  toastEnterActive: {
    opacity: 1,
    transform: "translateY(0)",
    transition: "opacity 300ms, transform 300ms",
  },
  toastExit: {
    opacity: 1,
    transform: "translateY(0)",
  },
  /* These CSS properties `toastExitActive640` and `toastExitActive` are defining the styles for the
 exit animation of the toast component. */
  toastExitActiveMin640: {
    opacity: 0,
    transform: "translateX(0) translateY(100%)",
    transition: "opacity 300ms, transform 300ms",
  },
  toastExitActiveMax640: {
    opacity: 0,
    transform: "translateX(0) translateY(-100%)",
    transition: "opacity 300ms, transform 300ms",
  },
  toastExitActive: {
    opacity: 0,
    transform: "translateX(100%) translateY(0)",
    transition: "opacity 300ms, transform 300ms",
  },
});

const styles = stylex.create({
  container: {
    boxSizing: "border-box",
    position: "fixed",
    zIndex: 100,
    top: 0,
    width: "100%",
    padding: 16,
    "@media (min-width: 640px)": {
      right: 0,
      bottom: 0,
      top: "auto",
    },
    "@media (min-width: 768px)": {
      width: 420,
    },
  },
  toaster: {
    display: "flex",
    userSelect: "none",
    touchAction: "none",
    flexDirection: "column",
    rowGap: 4,
    textAlign: "left",
    border: "1px solid #ccc",
    paddingInline: 16,
    paddingBlock: 16,
    overflow: "hidden",
    pointerEvents: "auto",
    position: "relative",
    borderRadius: 4,
  },
  title: {
    fontWeight: 600,
    lineHeight: 1.3,
    fontSize: 16,
  },
  description: {
    lineHeight: "16px",
    fontSize: 14,
    tabSize: 4,
  },
  default: {
    backgroundColor: "#f3f3f3",
    color: "#000",
  },
  success: {
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
  },
  info: {
    backgroundColor: "#2196f3",
    color: "#fff",
    border: "none",
  },
  error: {
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
  },
});

export default compose(WithCSSTransition)(Toaster);
