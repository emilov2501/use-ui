// toast.d.ts
import { CSSProperties } from "react";
import { Noop } from ".";

export type ToastFactoryProps = {
  className?: string | undefined;
  style?: CSSProperties;
  timeout: number;
};

export type ToastVariants = "success" | "error" | "info" | "default";
export interface ToastProps {
  title: string;
  description?: string | undefined;
  variant?: ToastVariants;
}

export interface ToastActions {
  onHide: Noop;
  onShow: Noop;
  toast: (props: ToastProps) => void;
}

export interface ToastState {
  timeout: number | null;
  show: boolean;
  props: Partial<ToastProps>;
}

export type TToastStore = ToastState & ToastActions;
