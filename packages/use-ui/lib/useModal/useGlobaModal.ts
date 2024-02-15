import { useMemo, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import React from "react";
import UseCustomModal from "./useCustomModal";
import storage from "./useModalStore";

type GlobalModalProps = {
  className?: string | undefined;
};

const UseGlobalModal = (props?: GlobalModalProps) => {
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
    React.createElement(UseCustomModal, {
      key: currentActiveModal.modalName,
      currentModal: currentActiveModal,
      className,
    }),
    document.body
  );
};

export default UseGlobalModal;
