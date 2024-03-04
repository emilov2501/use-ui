// button.d.ts

import { CommonTypes } from ".";

export type ButtonType = "button" | "reset" | "submit";

export interface AnchorOptions {
  href?: string;
  rel?: string;
  target?: string;
}

export interface ButtonPropsOptions {
  type?: ButtonType;
  disabled?: boolean;
  form?: string;
  tabIndex?: number;
  role?: React.AriaRole | undefined;
  onClick?: React.EventHandler<React.MouseEvent | React.KeyboardEvent>;
}

export interface ButtonProps extends CommonTypes.ComponentDefaultAttributes {
  type?: ButtonType | undefined;
  disabled: boolean | undefined;
  form?: string | undefined;
  role?: React.AriaRole;
  tabIndex?: number | undefined;
  href?: string | undefined;
  target?: string | undefined;
  rel?: string | undefined;
  "aria-disabled"?: true | undefined;
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}
