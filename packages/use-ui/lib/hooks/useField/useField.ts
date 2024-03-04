import cls from "classnames";
import debounce from "debounce";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import type { CommonTypes, ResultFieldProps } from "../../interfaces";

export interface FieldOptions extends CommonTypes.ComponentDefaultAttributes {
  /* The `debounceDelay?: number;` in the `FieldOptions` interface is defining an optional property
  called `debounceDelay` that expects a number value. This property allows you to specify a delay
  (in milliseconds) for debouncing the `onChange` event handler in the `useField` hook. Debouncing
  is a technique used to limit the number of times a function is called, typically in response to
  rapid or frequent events like user input. By setting a `debounceDelay`, you can control how long
  the hook waits after the last event before executing the `onChange` handler, which can be useful
  for optimizing performance and reducing unnecessary re-renders in your application. */
  debounceDelay?: number;

  /* The `disabled?: boolean;` in the `FieldOptions` interface is defining an optional property called
  `disabled` that expects a boolean value. This property allows you to specify whether the field
  should be disabled or not. When `disabled` is set to `true`, the field will be non-interactive and
  users will not be able to interact with it (e.g., input text, click buttons). Setting `disabled`
  to `false` or omitting it will enable the field for user interaction. This feature is commonly
  used to control the user input based on certain conditions or states in the application. */
  disabled?: boolean;

  /* The `value?: string;` in the `FieldOptions` interface is defining an optional property called
  `value` that expects a string value. This property allows you to specify an initial value for the
  field. If a `value` is provided when using the `useField` hook, it will be used as the initial
  value for the field. If no `value` is provided, an empty string will be used as the default
  initial value. This feature is useful for pre-populating the field with a specific value when it
  is rendered. */
  value?: string;

  /* The `name?: string;` in the `FieldOptions` interface is defining an optional property called
  `name` that expects a string value. This property allows you to specify a name for the field. When
  using the `useField` hook, if a `name` is provided, it will be used as the name attribute for the
  field in the rendered HTML. This can be useful for identifying the field when submitting a form or
  for other purposes where the name of the field is important. If no `name` is provided, the field
  will not have a name attribute in the HTML. */
  name?: string;

  /* The `onChange?: (e: ChangeEvent<HTMLInputElement>) => void;` in the `FieldOptions` interface is
  defining an optional property called `onChange`. This property expects a function that takes a
  `ChangeEvent` as its argument, specifically a `ChangeEvent` for an `<input>` element. The function
  is expected to return `void`, indicating that it does not need to return any value. */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;

  /* The `onBlur?: () => void;` in the `FieldOptions` interface is defining an optional property called
  `onBlur`. This property expects a function that takes no arguments and returns `void`. */
  onBlur?: () => void;
}

export const useFieldState = (props: FieldOptions = {}) => {
  const { value = "", debounceDelay = 0, onChange } = props;

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
    handleChange: _handleChange,
    debouncedQuery,
    data: {
      value: _value,
      debounceValue: _debouncedValue,
    },
  };
};

const useField = (props: FieldOptions = {}): ResultFieldProps => {
  const { className, style, name = undefined, disabled, ...fieldProps } = props;

  const state = useFieldState(fieldProps);

  const _className = useMemo(
    (): string =>
      cls(className, "UI_field", {
        [`UI_field--disabled`]: disabled,
      }),
    [disabled, className]
  );

  return {
    name,
    style,
    className: _className,
    value: state.data.value,
    disabled: disabled || undefined,
    debouncedValue: state.data.debounceValue,
    readOnly: !disabled ? undefined : disabled,
    "aria-disabled": !disabled ? undefined : disabled,
    onChange: state.handleChange,
    ...props,
  };
};

export default useField;
