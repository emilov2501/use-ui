import { ModalId, ModalStore } from "@/types/modal";
import { wait } from "../../lib/helpers";

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

/**
 * The `disableAll` function asynchronously disables all modals in the state map, then waits for a
 * delay before notifying.
 */
const disableAll = async () => {
  const copy = new Map([...state]);
  for await (let modal of copy.values()) {
    modal.active = false;
  }

  state = copy;
  await wait(DELAY / 3);
  notify();
};

/**
 * The `open` function in TypeScript asynchronously opens a modal with specified ID and properties,
 * handling modal state and notifications.
 * @param modalId - The `modalId` parameter is the identifier for the modal that you want to open. It
 * is used to uniquely identify the modal within the application.
 * @param modalProps - The `modalProps` parameter in the `open` function is an object that contains
 * properties for configuring the modal that is being opened. These properties could include things
 * like the title of the modal, the content to be displayed, any buttons or actions available in the
 * modal, styling information, or any other
 */
const open = async (modalId: ModalId, modalProps: ModalStore.ModalProps) => {
  if (state.size > 0) {
    await disableAll();
  }

  setModal(modalId, modalProps, state);
  if (state.size !== 1) {
    await wait(DELAY / 3);
  }
  notify();
};

/**
 * This TypeScript function closes a modal by updating its state in a Map and then showing the last
 * modal if available after a delay.
 * @param modalId - The `modalId` parameter in the `close` function represents the unique identifier of
 * the modal that you want to close. It is used to retrieve the current modal from the state and update
 * its status to inactive before notifying any changes.
 */
const close = async (modalId: ModalId) => {
  const currentModal = state.get(modalId);

  if (!currentModal) {
    throw new Error(
      "Modal ID is missing. Make sure, you are using this modal inside the Map."
    );
  }

  let copy = new Map([...state]);

  copy = new Map([
    ...copy,
    [modalId, { active: false, modalId, modalProps: currentModal.modalProps }],
  ]);

  state = new Map([...copy]);
  notify();

  await wait(DELAY / 2);
  showLastModalIfAvailble(modalId);
};

function showLastModalIfAvailble(currentModal: ModalId) {
  const copy = new Map([...state]);

  copy.delete(currentModal);

  const modals: ModalStore.ModalData[] = [...copy.values()];
  const lastModal: ModalStore.ModalData = modals[modals.length - 1];

  if (lastModal) {
    setModal(lastModal.modalId, lastModal.modalProps, copy);
    notify();
  }
}

function setModal(
  modalId: ModalId,
  modalProps: ModalStore.ModalProps,
  oldState: ModalStore.ModalState
) {
  state = new Map([
    ...oldState,
    [modalId, { active: true, modalId, modalProps }],
  ]);
}

const getState = () => state;
const getActiveModal = () => [...state.values()].find((modal) => modal.active);

const storage = {
  subscribe,
  getState,
  getActiveModal,
  open,
  disableAll,
  clear,
  close,
};

export default storage;
