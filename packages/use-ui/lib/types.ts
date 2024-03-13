import { CSSProperties, ReactNode } from "react";

export namespace CommonTypes {
  export type Noop = () => void;

  export interface ComponentDefaultAttributes {
    id?: string | undefined;
    className?: string | undefined;
    style?: CSSProperties;
  }
}

export namespace Toaster {
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
}

export namespace Modal {
  export type ModalId = string;
  export type ModalSize = "xxs" | "xs" | "sm" | "lg";

  export interface BottomNavigationBar {
    justifyBetween?: boolean | undefined;
    alignCenter?: boolean | undefined;
    gap?: number | undefined;
    items: Array<ReactNode>;
  }

  export interface ModalProps {
    title?: string;
    showXMarkIcon?: boolean;
    content?: React.ReactNode;
    size?: ModalSize;
    bottomNavigationBar?: BottomNavigationBar;
  }

  export interface ModalData {
    modalProps: ModalProps;
    modalId: ModalId;
  }

  export interface ModalEvents {
    onOpen: (id: ModalId, props: ModalProps) => void;
    onClose: (id: ModalId) => void;
    onClear: CommonTypes.Noop;
  }

  export type ModalState = Map<string, ModalData>;
}
