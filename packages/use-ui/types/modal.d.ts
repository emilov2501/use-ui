// useModal.types.d.ts
import { ReactNode } from "react";

export type ModalId = string;
export type ModalSize = "xxs" | "xs" | "sm" | "lg";

export interface BottomNavigationBar {
  justifyBetween?: boolean | undefined;
  alignCenter?: boolean | undefined;
  gap?: number | undefined;
  items: Array<ReactNode>;
}
export namespace ModalStore {
  export interface ModalProps {
    title?: string;
    allowClickOutside?: boolean;
    showXMarkIcon?: boolean;
    content?: React.ReactNode;
    size?: ModalSize;
    bottomNavigationBar?: BottomNavigationBar;
  }

  export interface ModalData {
    active: boolean;
    modalProps: ModalProps;
    modalId: ModalId;
  }

  export type ModalState = Map<string, ModalData>;
}
