// toast.d.ts
import { CommonTypes } from "../../types";

export interface ToastFactoryProps
  extends CommonTypes.ComponentDefaultAttributes {
  timeout: number;
}

export type ToastVariants = "success" | "error" | "info" | "default";
export interface ToastProps {
  title: string;
  description?: string | undefined;
  variant?: ToastVariants;
}

export interface ToastActions {
  onHide: CommonTypes.Noop;
  onShow: CommonTypes.Noop;
  toast: (props: ToastProps) => void;
}

export interface ToastState {
  timeout: number | null;
  show: boolean;
  props: Partial<ToastProps>;
}

export type TToastStore = ToastState & ToastActions;
