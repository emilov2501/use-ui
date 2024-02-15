import { wait } from "../helpers";

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

/**
 * Функция setModal принимает модальное имя, модальные свойства и текущее модальное состояние и
 * обновляет состояние, добавляя новое модальное окно с заданным именем и свойствами.
 * @param modalName - Параметр modalName — это строка, представляющая имя или идентификатор модального
 * окна.
 * @param modalProps - Параметр modalProps — это объект, который содержит свойства или данные,
 * специфичные для устанавливаемого модального окна. Он может включать в себя такие вещи, как
 * заголовок, контент, кнопки или любую другую информацию, необходимую для отображения модального окна
 * и взаимодействия с ним.
 * @param oldState - Параметр oldState — это предыдущее состояние модального хранилища. Это объект Map,
 * который содержит текущие активные модальные окна в магазине.
 */
const setModal = (
  modalName: UseModal.Store.ModalName,
  modalProps: UseModal.Store.ModalProps,
  oldState: UseModal.Store.ModalState
) => {
  state = new Map([
    ...oldState,
    [modalName, { active: true, modalName, modalProps }],
  ]);
};

/**
 * Функция «open» — это асинхронная функция, которая открывает модальное окно, отключает все остальные
 * модальные окна, если таковые имеются, устанавливает модальные свойства, ожидает задержки перехода, а
 * затем уведомляет.
 * @param modalName - Параметр modalName — это имя или идентификатор модального окна, которое вы хотите
 * открыть. Он имеет тип Modal.Store.ModalName.
 * @param modalProps - Параметр modalProps — это объект, содержащий свойства или данные, которые будут
 * переданы модальному компоненту. Эти свойства можно использовать для настройки поведения или внешнего
 * вида модального окна.
 */
const open = async (
  modalName: UseModal.Store.ModalName,
  modalProps: UseModal.Store.ModalProps
) => {
  if (state.size > 0) {
    await disableAll();
  }

  setModal(modalName, modalProps, state);
  if (state.size !== 1) {
    await wait(DELAY / 3);
  }
  notify();
};

/**
 * Функция close закрывает модальное окно, устанавливая для его свойства active значение false,
 * обновляя состояние, а затем показывая последнее модальное окно, если оно доступно.
 * @param modalName - Параметр modalName — это строка, представляющая имя модального окна, которое
 * необходимо закрыть.
 */
const close = async (modalName: UseModal.Store.ModalName) => {
  let copy = new Map([...state]);
  const modal = copy.get(modalName);

  if (modal) {
    copy = new Map([
      ...copy,
      [modalName, { active: false, modalName, modalProps: modal.modalProps }],
    ]);

    state = new Map([...copy]);
    notify();
  }
  await wait(DELAY / 2);
  showLastModalIfAvailble(modalName);
};

/**
 * Функция showLastModalIfAvailble удаляет закрытое модальное окно из карты модальных окон, извлекает
 * последнее оставшееся модальное окно и устанавливает его как активное модальное окно.
 * @param closedModalName - Параметр closedModalName — это имя модального окна, которое только что было
 * закрыто.
 */
const showLastModalIfAvailble = (closedModalName: UseModal.Store.ModalName) => {
  const copy = new Map([...state]);
  copy.delete(closedModalName);

  const modals = [...copy.values()];
  const lastModal = modals[modals.length - 1];

  if (lastModal) {
    setModal(lastModal.modalName, lastModal.modalProps, copy);
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
