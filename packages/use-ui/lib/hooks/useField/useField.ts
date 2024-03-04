import cls from "classnames";
import debounce from "debounce";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import type { CommonTypes, ResultFieldProps } from "../../interfaces";
export interface FieldOptions extends CommonTypes.ComponentDefaultAttributes {
  debounceDelay?: number;
  disabled?: boolean;
  value?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

const useField = (props: FieldOptions = {}): ResultFieldProps => {
  const {
    className,
    style,
    value = "",
    name = undefined,
    debounceDelay = 0,
    onChange,
    disabled,
  } = props;

  const [_value, _setValue] = useState<string>(() => value);
  const [_debouncedValue, _setDebouncedValue] = useState<string>(() => value);

  const _className = useMemo(
    (): string =>
      cls(className, "UI_field", {
        [`UI_field--disabled`]: disabled,
      }),
    [disabled, className]
  );

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
    className: _className,
    style,
    debouncedValue: _debouncedValue,
    disabled: disabled || undefined,
    readOnly: !disabled ? undefined : disabled,
    "aria-disabled": !disabled ? undefined : disabled,
    onChange: _handleChange,
    ...props,
  };
};

export default useField;
