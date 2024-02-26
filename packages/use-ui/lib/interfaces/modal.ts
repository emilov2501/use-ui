// modal.d.ts
import { CSSProperties, ReactNode } from "react";
import { Noop } from ".";

export type ModalId = string;
export type ModalSize = "xxs" | "xs" | "sm" | "lg";

export type ModalFactoryProps = {
  className?: string | undefined;
  style?: CSSProperties;
};

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
  onClear: Noop;
}

export type ModalState = Map<string, ModalData>;
