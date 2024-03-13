import { useSyncExternalStore } from "react";
import { ToastState } from "../types/toast.types";
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

export const useToastStore = (): ToastState =>
  useSyncExternalStore(store.subscribe, store.getState);

export const useToast = (): typeof toastModel.toast => toastModel.toast;
