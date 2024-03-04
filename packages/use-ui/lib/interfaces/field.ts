// field.d.ts
import React, { ChangeEvent } from "react";
import { CommonTypes } from ".";

interface AriaFieldProps {
  role?: React.AriaRole;
  "aria-disabled"?: true | undefined;
}

interface FieldProps extends CommonTypes.ComponentDefaultAttributes {
  value?: string | undefined;
  defaultValue?: string;
  debouncedValue?: string;
  name?: string | undefined;
  readOnly?: true | undefined;
  disabled: boolean | undefined;
}

interface FieldActions {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
export type ResultFieldProps = AriaFieldProps & FieldProps & FieldActions;
