import compose from "compose-function";
import React, {
  CSSProperties,
  ForwardRefExoticComponent,
  forwardRef,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import storage from "../../hooks/useModal/useModalStore";
import Modal from "./Modal";
import "./transition.css";

export type ModalPMrops = {
  className?: string | undefined;
  style?: CSSProperties;
};

const ModalFactory = forwardRef<HTMLDivElement, ModalPMrops>(
  (props?: ModalPMrops, nodeRef?) => {
    const state = useSyncExternalStore(storage.subscribe, storage.getState);

    const currentActiveModal = useMemo(
      () => storage.getActiveModal(),
      [state.size]
    );

    if (!currentActiveModal) {
      return React.createElement(React.Fragment, null);
    }

    return createPortal(
      React.createElement(Modal, {
        key: currentActiveModal.modalId,
        currentModal: currentActiveModal,
        ref: nodeRef,
        ...props,
      }),
      document.body
    );
  }
);

const WithCSSTransition = (Component: ForwardRefExoticComponent<any>) => {
  const ModalTransition = (hocProps: ModalPMrops) => {
    const state = useSyncExternalStore(storage.subscribe, storage.getState);
    const nodeRef = useRef(null);
    const modal = useMemo(() => storage.getActiveModal(), [state]);

    return (
      <CSSTransition
        in={modal && modal.active}
        timeout={300}
        nodeRef={nodeRef}
        classNames="fade"
        unmountOnExit
      >
        <Component ref={nodeRef} {...hocProps} />
      </CSSTransition>
    );
  };

  return ModalTransition;
};

export default compose(WithCSSTransition)(ModalFactory);
