import { HTMLProps } from "react";

export type PickAriaOptions = Pick<
  HTMLProps<HTMLInputElement>,
  "role" | "aria-checked" | "tabIndex"
>;

type PickCheckboxOptions = Pick<
  HTMLProps<HTMLInputElement>,
  "checked" | "onChange" | "id" | "className"
>;

interface SwitchProps {
  type: "checkbox";
  disabled?: boolean;
  name?: string;
}
export type ResultSwitchProps = PickCheckboxOptions &
  SwitchProps &
  PickAriaOptions;
