// useToast.types.d.ts

export type ToastVariants = "success" | "error" | "info" | "default";
export interface ToastProps {
  title: string;
  description?: string | undefined;
  variant?: ToastVariants;
}

export interface ToastState {
  show: boolean;
  props: Partial<ToastProps>;
}
