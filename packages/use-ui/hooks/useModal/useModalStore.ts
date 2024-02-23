import { ModalId, ModalStore } from "@/types/modal";

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
      "Modal ID is missing. Make sure, you are using this modal inside the Map.",
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
const getModalList = () => [...getState().values()];

const storage = {
  subscribe,
  getState,
  getModalList,
  open,
  clear,
  close,
};

export default storage;
