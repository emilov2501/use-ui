import compose from "compose-function";
import React, {
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

type ModalPMrops = {
  className?: string | undefined;
};

const ModalFactory = forwardRef<HTMLDivElement>(
  (props?: ModalPMrops, nodeRef?) => {
    const { className } = props || {};
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
        key: currentActiveModal.modalName,
        currentModal: currentActiveModal,
        ref: nodeRef,
        className,
      }),
      document.body
    );
  }
);

const WithCSSTransition = (Component: ForwardRefExoticComponent<any>) => {
  const ModalTransition = () => {
    const state = useSyncExternalStore(storage.subscribe, storage.getState);
    const nodeRef = useRef(null);

    const currentActiveModal = useMemo(
      () => storage.getActiveModal(),
      [state.size]
    );

    return (
      <CSSTransition
        in={currentActiveModal && currentActiveModal.active}
        timeout={300}
        nodeRef={nodeRef}
        classNames="fade"
        unmountOnExit
      >
        <Component ref={nodeRef} />
      </CSSTransition>
    );
  };

  return ModalTransition;
};

export default compose(WithCSSTransition)(ModalFactory);
