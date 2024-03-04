import debounce from "debounce";
import { ChangeEvent, useCallback, useState } from "react";
import type { ResultFieldProps } from "../../interfaces";

export interface FieldOptions {
  debounceDelay?: number;
  disabled?: boolean;
  value?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

const useField = (props?: FieldOptions): ResultFieldProps => {
  const {
    value = "",
    name = undefined,
    debounceDelay = 0,
    onChange,
    disabled,
  } = props || {};

  const [_value, _setValue] = useState<string>(() => value);
  const [_debouncedValue, _setDebouncedValue] = useState<string>(() => value);

  const debounced = debounce((e) => {
    _setDebouncedValue(e.target.value);
    onChange?.(e);
  }, debounceDelay);

  const debouncedQuery = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => debounced(e),
    []
  );

  const _handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    _setValue(e.target.value);
    debouncedQuery(e);
  };

  return {
    value: _value,
    name,
    debouncedValue: _debouncedValue,
    disabled: disabled || undefined,
    readOnly: !disabled ? undefined : disabled,
    "aria-disabled": !disabled ? undefined : disabled,
    onChange: _handleChange,
    ...props,
  };
};

export default useField;
