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

export interface SwitchOptions {
  name?: string | undefined;
  className?: string;
  id?: string | undefined;
  value?: boolean | undefined;
  onChange?: (value: boolean) => void;
}

export interface SwitchProps extends SwitchAttributes {
  type: "checkbox";
}
