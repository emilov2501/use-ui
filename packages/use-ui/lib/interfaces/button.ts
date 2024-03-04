// button.d.ts

import { CommonTypes } from ".";

export type ButtonType = "button" | "reset" | "submit";

interface AriaButtonProps {
  role?: React.AriaRole;
  rel?: string | undefined;
  "aria-disabled"?: true | undefined;
}

interface ButtonProps {
  type?: ButtonType | undefined;
  disabled: boolean | undefined;
  form?: string | undefined;
  tabIndex?: number | undefined;
}

interface ButtonActions {
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

export type ResultButtonProps = CommonTypes.ComponentDefaultAttributes &
  ButtonProps &
  ButtonActions &
  AriaButtonProps;
