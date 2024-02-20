import { useMemo, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import React from "react";
import storage from "../../hooks/useModal/useModalStore";
import Modal from "./Modal";

type ModalPMrops = {
  className?: string | undefined;
};

const ModalFactory = (props?: ModalPMrops) => {
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
      className,
    }),
    document.body
  );
};

export default ModalFactory;
