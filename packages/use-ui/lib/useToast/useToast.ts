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

/**
 * Функция notify вызывает всех зарегистрированных прослушивателей.
 */
const notify = () => {
  listeners.forEach((callback) => callback());
};

const setProps = (props: ToastProps) => {
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

/**
 * Функция «toast» в TypeScript скрывает текущее всплывающее уведомление, устанавливает новые свойства,
 * ждет определенное время перед отображением всплывающего уведомления, а затем скрывает его по
 * истечении другого указанного времени.
 * @param {ToastProps} props - Параметр props в функции toast, скорее всего, содержит свойства или
 * конфигурацию всплывающего уведомления, которое будет отображаться. Эти свойства могут включать в
 * себя такие вещи, как отображаемое сообщение, продолжительность отображения всплывающего уведомления,
 * тип всплывающего уведомления (успех, ошибка, предупреждение и т. д.).
 */
const toast = (props: ToastProps) => {
  if (toastTimeoutId !== null) {
    clearTimeout(toastTimeoutId);
  }

  setProps(props);
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
