import { useMemo, useSyncExternalStore } from "react";
import UseGlobalModal from "./useGlobaModal";
import storage, { DELAY } from "./useModalStore";

/**
 * Тип ModalActions представляет объект со свойствами открытия и закрытия модального окна, а также
 * значением задержки.
 * @property open - Свойство open является ссылкой на функцию open объекта Storage. Он имеет тип typeof
 * Storage.open, что означает, что это ссылка на саму функцию, а не на результат ее вызова.
 * @property close - Свойство close является ссылкой на функцию close объекта Storage. Он имеет тип
 * typeof Storage.close, что означает, что это ссылка на саму функцию, а не на результат ее вызова.
 * @property {number} timeout - Свойство timeout — это число, обозначающее задержку в миллисекундах для
 * модальных действий.
 */
type ModalActions = {
  open: typeof storage.open;
  close: typeof storage.close;
  timeout: number;
};

type UseModalHookResult = [
  ModalActions,
  { Modal: typeof UseGlobalModal; isActive: boolean | undefined }
];

/**
 * Функция useModal возвращает массив из двух элементов — объекта со свойствами open, close и DELAY, а
 * также объекта со свойствами Modal и isActive.
 * @returns Функция useModal возвращает массив из двух элементов. Первый элемент — это объект со
 * свойствами open, close и DELAY. Второй элемент — это объект со свойствами Modal и isActive.
 */
const useModal = (): UseModalHookResult => {
  const state = useSyncExternalStore(storage.subscribe, storage.getState);
  const modal = useMemo(() => storage.getActiveModal(), [state]);

  return [
    {
      open: storage.open,
      close: storage.close,
      timeout: DELAY,
    },
    { Modal: UseGlobalModal, isActive: modal && modal.active },
  ];
};

export default useModal;
