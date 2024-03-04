import { HTMLProps } from "react";

export type PickAriaOptions = Pick<
  HTMLProps<HTMLInputElement>,
  "role" | "aria-checked" | "tabIndex"
>;

type PickCheckboxOptions = Pick<
  HTMLProps<HTMLInputElement>,
  "checked" | "onChange" | "id" | "className"
>;

export type SwitchAttributes = PickCheckboxOptions & PickAriaOptions;

export interface ResultSwitchProps extends SwitchAttributes {
  type: "checkbox";
}
