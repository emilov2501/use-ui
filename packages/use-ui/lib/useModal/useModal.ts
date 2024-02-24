import type { ModalId, ModalStore, Noop } from "../interfaces";

export const DELAY = 200;

let state: ModalStore.ModalState = new Map();

const listeners = new Set<Noop>();

const subscribe = (callback: Noop): Noop => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

const notify = () => {
  listeners.forEach((callback) => callback());
};

/**
 * The `clear` function resets the state by creating a new empty Map and then notifies the changes.
 */
const clear = () => {
  state = new Map();
  notify();
};

const open = async (modalId: ModalId, modalProps: ModalStore.ModalProps) => {
  const updatedState = state.set(modalId, { modalId, modalProps });

  state = new Map([...updatedState]);
  notify();
};

const close = async (modalId: ModalId) => {
  if (!state.has(modalId)) {
    throw new Error(
      "Modal ID is missing. Make sure, you are using this modal inside the Map."
    );
  }

  let shallow = new Map([...state]);

  const isDeleted = shallow.delete(modalId);

  if (isDeleted) {
    state = shallow;
    notify();
  }
  console.log(state);
};

const getState = () => state;

export const storage = {
  subscribe,
  getState,
};

export const modalModel = {
  open,
  clear,
  close,
};

type Actions = {
  open: typeof modalModel.open;
  close: typeof modalModel.close;
};

type UseModalHookResult = Actions;

export const useModal = (): UseModalHookResult => {
  return {
    open: modalModel.open,
    close: modalModel.close,
  };
};
