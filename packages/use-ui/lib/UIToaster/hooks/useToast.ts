import { useSyncExternalStore } from "react";
import type { Toaster } from "../../types";
import { ToastStore } from "./useToastStore";

const store = new ToastStore({
  show: false,
  timeout: null,
  props: {},
});

export const toastModel = {
  updateTimeout: store.onUpdateTimeOut,
  toast: store.toast,
};

export const useToastStore = (): Toaster.ToastState =>
  useSyncExternalStore(store.subscribe, store.getState);

export const useToast = (): typeof toastModel.toast => toastModel.toast;
