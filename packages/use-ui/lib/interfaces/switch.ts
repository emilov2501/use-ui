import { HTMLProps } from "react";
import { CommonTypes } from ".";

export type PickAriaOptions = Pick<
  HTMLProps<HTMLInputElement>,
  "role" | "aria-checked" | "tabIndex"
>;

type PickCheckboxOptions = Pick<
  HTMLProps<HTMLInputElement>,
  "checked" | "onChange" | "id" | "className"
>;

export type SwitchAttributes = PickCheckboxOptions & PickAriaOptions;

export interface SwitchOptions extends CommonTypes.ComponentDefaultAttributes {
  name?: string | undefined;
  value?: boolean | undefined;
  onToggle?: (value: boolean) => void;
}

export interface SwitchProps extends SwitchAttributes {
  type: "checkbox";
}
