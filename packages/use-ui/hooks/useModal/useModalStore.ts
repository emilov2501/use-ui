import { wait } from "../../lib/helpers";
import { UseModal } from "./useModal.types";

export const DELAY = 200;

let state: UseModal.Store.ModalState = new Map();

const listeners = new Set<Noop>();

const subscribe = (callback: Noop): Noop => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

/**
 * Функция notify вызывает всех зарегистрированных прослушивателей.
 */
const notify = () => {
  listeners.forEach((callback) => callback());
};

/**
 * Функция `clear` очищает состояние и уведомляет всех подписчиков.
 */
const clear = () => {
  state = new Map();
  notify();
};

/**
 * Функция disableAll отключает все модальные окна на карте состояния и уведомляет всех подписчиков.
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

const setModal = (
  modalId: UseModal.Store.ModalId,
  modalProps: UseModal.Store.ModalProps,
  oldState: UseModal.Store.ModalState
) => {
  state = new Map([
    ...oldState,
    [modalId, { active: true, modalId, modalProps }],
  ]);
};

const open = async (
  modalId: UseModal.Store.ModalId,
  modalProps: UseModal.Store.ModalProps
) => {
  if (state.size > 0) {
    await disableAll();
  }

  setModal(modalId, modalProps, state);
  if (state.size !== 1) {
    await wait(DELAY / 3);
  }
  notify();
};

const close = async (modalId: UseModal.Store.ModalId) => {
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

/**
 * The function `showLastModalIfAvailble` removes a specified modal from a map of modals and then
 * displays the last remaining modal if there is one.
 * @param ummountModal - The `ummountModal` parameter in the `showLastModalIfAvailble` function is used
 * to specify the modal that needs to be unmounted before showing the last modal in the list of modals.
 */
const showLastModalIfAvailble = (ummountModal: UseModal.Store.ModalId) => {
  const copy = new Map([...state]);

  copy.delete(ummountModal);

  const modals = [...copy.values()];
  const lastModal = modals[modals.length - 1];

  if (lastModal) {
    setModal(lastModal.modalId, lastModal.modalProps, copy);
    notify();
  }
};

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
