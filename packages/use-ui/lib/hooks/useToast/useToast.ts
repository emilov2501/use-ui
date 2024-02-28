import { useSyncExternalStore } from "react";
import { ToastStore } from "./useToast.store";

const store = new ToastStore({
  show: false,
  timeout: null,
  props: {},
});

export const toastModel = {
  updateTimeout: store.onUpdateTimeOut,
  toast: store.toast,
};

export const useToastStore = () =>
  useSyncExternalStore(store.subscribe, store.getState);

export const useToast = () => toastModel.toast;
