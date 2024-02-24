import type { Noop, ToastProps, ToastState } from "../interfaces";

let HIDE_TOAST_AFTER = 5000;
let toastTimeoutId: null | ReturnType<typeof setTimeout>;

let state: ToastState = {
  show: false,
  props: {},
};

const listeners = new Set<Noop>();

const subscribe = (callback: Noop): Noop => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

const notify = () => {
  listeners.forEach((callback) => callback());
};

const pushProps = (props: ToastProps) => {
  let copy = Object.assign({}, state);
  copy.props = props;

  state = copy;
  notify();
};

const hide = () => {
  let copy = Object.assign({}, state);
  copy.show = false;

  state = copy;
  notify();
};

const show = () => {
  let copy = Object.assign({}, state);
  copy.show = true;

  state = copy;
  notify();
};

const toast = (props: ToastProps) => {
  if (toastTimeoutId !== null) {
    clearTimeout(toastTimeoutId);
  }

  pushProps(props);
  show();

  toastTimeoutId = setTimeout(() => {
    hide();
    toastTimeoutId = null;
  }, HIDE_TOAST_AFTER);
};

const getState = () => state;

export const storage = {
  getState,
  subscribe,
  show,
  hide,
  toast,
};

export const useToast = () => storage.toast;
