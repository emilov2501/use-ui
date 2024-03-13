import React, { createRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import type { CommonTypes } from "../../../types/types";
import { useModalState } from "../hooks/useModal";
import Modal from "./Modal";
import styles from "./modal.module.css";

const ModalFactory = (props?: CommonTypes.ComponentDefaultAttributes) => {
  const state = useModalState();
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
          classNames={{
            enter: styles.modalEnter,
            enterActive: styles.modalEnterActive,
            exit: styles.modalExit,
            exitActive: styles.modalExitActive,
          }}
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
