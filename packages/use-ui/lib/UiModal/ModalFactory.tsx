import React, {
  CSSProperties,
  createRef,
  useMemo,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { storage } from "../useModal/useModal";
import Modal from "./Modal";
import "./anim.css";

export type ModalFactoryProps = {
  className?: string | undefined;
  style?: CSSProperties;
};

const ModalFactory = (props?: ModalFactoryProps) => {
  const state = useSyncExternalStore(storage.subscribe, storage.getState);

  const items = useMemo(
    () =>
      [...state.values()].map((item) => ({
        ...item,
        nodeRef: createRef<HTMLDivElement>(),
      })),
    [state.size]
  );

  return createPortal(
    <TransitionGroup>
      {items.map((modal) => (
        <CSSTransition
          key={modal.modalId}
          nodeRef={modal.nodeRef}
          timeout={300}
          classNames="fade"
        >
          <Modal
            ref={modal.nodeRef}
            id={modal.modalId}
            {...modal.modalProps}
            {...props}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>,
    document.body
  );
};

export default ModalFactory;
