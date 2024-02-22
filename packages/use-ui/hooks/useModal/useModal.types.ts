import { ReactNode } from "react";

// useModalTypes.d.ts
export declare namespace UseModal {
  export type ModalSize = "xxs" | "xs" | "sm" | "lg";
  export type ButtonColor =
    | "success"
    | "primary"
    | "text"
    | "delete"
    | "warning";
  export interface BottomNavigationBar {
    justifyBetween?: boolean | undefined;
    alignCenter?: boolean | undefined;
    gap?: number | undefined;
    items: Array<ReactNode>;
  }
  export namespace Store {
    export type ModalId = string;
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
}
