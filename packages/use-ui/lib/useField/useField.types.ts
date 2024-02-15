import { ChangeEvent, HTMLProps } from "react";

// useField.d.ts
export declare namespace UseField {
  type TField = Pick<
    HTMLProps<HTMLInputElement>,
    "value" | "name" | "disabled" | "aria-disabled"
  >;
  export interface FieldPropsOptions extends TField {
    debounceDelay?: number;
    value?: undefined | string;
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
    "aria-disabled:"?: true | undefined;
    disabled: boolean | undefined;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  }

  export interface FieldPropsMetadata {
    Field: React.ElementType;
  }
}
