import type { Noop, ToastProps, ToastState } from "../interfaces";

let toastTimeoutId: null | ReturnType<typeof setTimeout>;

let state: ToastState = {
  timeout: null,
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

const updateTimeout = (timeout: number) => {
  let copy = Object.assign({}, state);
  copy.timeout = timeout;

  state = copy;
  notify();
};

const toast = (props: ToastProps) => {
  if (toastTimeoutId !== null && state.timeout) {
    clearTimeout(toastTimeoutId);
  }

  pushProps(props);
  show();

  if (state.timeout) {
    toastTimeoutId = setTimeout(() => {
      hide();
      toastTimeoutId = null;
    }, state.timeout);
  }
};

const getState = () => state;

export const storage = {
  getState,
  subscribe,
};

export const toastModel = {
  updateTimeout,
  show,
  hide,
  toast,
};

export const useToast = () => toastModel.toast;
