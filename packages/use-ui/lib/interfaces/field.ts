// field.d.ts
import { ChangeEvent, HTMLProps } from "react";

type TField = Pick<HTMLProps<HTMLInputElement>, "disabled" | "aria-disabled">;
export type FieldMetadata = Pick<JSX.IntrinsicElements, "input">;

export interface FieldPropsOptions extends TField {
  debounceDelay?: number;
  value?: undefined | string;
  name?: undefined | string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}
export interface AriaFieldProps {
  role?: React.AriaRole;
  rel?: string | undefined;
  "aria-disabled"?: true | undefined;
}

export interface FieldProps {
  value?: string | undefined;
  defaultValue?: string;
  debouncedValue?: string;
  name?: string | undefined;
  readOnly?: true | undefined;
  "aria-disabled:"?: true | undefined;
  disabled: boolean | undefined;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
