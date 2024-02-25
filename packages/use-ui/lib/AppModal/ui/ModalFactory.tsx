import React, { createRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ModalFactoryProps } from "../../interfaces";
import { useModalStore } from "../../useModal/useModal";
import "../styles/animation.css";
import Modal from "./Modal";

const ModalFactory = (props?: ModalFactoryProps) => {
  const state = useModalStore();

  const modals = useMemo(
    () =>
      [...state.values()].map((item) => ({
        ...item,
        nodeRef: createRef<HTMLDivElement>(),
      })),
    [state.size]
  );

  return createPortal(
    <TransitionGroup>
      {modals.map((modal) => (
        <CSSTransition
          key={modal.modalId}
          nodeRef={modal.nodeRef}
          timeout={200}
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
