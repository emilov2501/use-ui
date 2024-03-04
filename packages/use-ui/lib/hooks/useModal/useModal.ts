import { useSyncExternalStore } from "react";
import { ModalStore } from "./useModal.store";

const store = new ModalStore(new Map());

export const modalModel = {
  open: store.onOpen,
  clear: store.onClear,
  close: store.onClose,
};

type Actions = {
  open: typeof modalModel.open;
  close: typeof modalModel.close;
};

type UseModalHookResult = Actions;

export const useModal = (): UseModalHookResult => ({
  open: modalModel.open,
  close: modalModel.close,
});

export const useModalStore = () =>
  useSyncExternalStore(store.subscribe, store.getState);