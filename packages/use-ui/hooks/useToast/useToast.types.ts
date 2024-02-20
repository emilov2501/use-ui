export type ToastVariants = "success" | "error" | "info" | "default";
export interface ToastProps {
  title: string;
  description?: string | undefined;
  variant?: ToastVariants;
}

export interface UseToastState {
  show: boolean;
  props: Partial<ToastProps>;
}
