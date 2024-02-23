import storage, { DELAY } from "./useModalStore";

/**
 * The type `ModalActions` defines properties for opening and closing a modal, setting a timeout, and
 * indicating if a modal is present.
 * @property open - The `open` property in the `ModalActions` type is a reference to a function named
 * `open` from the `storage` object. This function is used to open a modal.
 * @property close - The `close` property in the `ModalActions` type refers to a function that closes a
 * modal. It is of the same type as the `close` function in the `storage` object.
 * @property {number} timeout - The `timeout` property in the `ModalActions` type specifies the number
 * of milliseconds before a modal action times out.
 * @property {boolean | undefined} hasModal - The `hasModal` property in the `ModalActions` type is a
 * boolean value that can also be `undefined`. It indicates whether a modal is currently present or
 * not.
 */
type ModalActions = {
  open: typeof storage.open;
  close: typeof storage.close;
  timeout: number;
};

type UseModalHookResult = ModalActions;

const useModal = (): UseModalHookResult => {
  return {
    open: storage.open,
    close: storage.close,
    timeout: DELAY,
  };
};

export default useModal;
