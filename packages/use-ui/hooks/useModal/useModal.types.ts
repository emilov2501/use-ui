// useModalTypes.d.ts
declare namespace UseModal {
  export type ModalSize = "xxs" | "xs" | "sm" | "lg";
  export type ButtonColor =
    | "success"
    | "primary"
    | "text"
    | "delete"
    | "warning";

  export namespace Store {
    export type ModalName = string;
    export interface ModalProps {
      content?: React.ReactNode;
      size?: ModalSize;
      buttons?: Array<{
        label: String;
        color: ButtonColor;
        onClick: Noop;
      }>;
    }

    export interface ModalData {
      active: boolean;
      modalProps: ModalProps;
      modalName: ModalName;
    }

    export type ModalState = Map<string, ModalData>;
  }
}
