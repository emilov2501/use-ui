// toast.d.ts
import { CSSProperties } from "react";

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

export interface ToastState {
  timeout: number | null;
  show: boolean;
  props: Partial<ToastProps>;
}
