import type {
  FieldProps,
  FieldPropsMetadata,
  FieldPropsOptions,
} from "@/types/field";
import debounce from "debounce";
import { ChangeEvent, useCallback, useState } from "react";

/**
 * The `useField` function in TypeScript creates a controlled input field with debounced value
 * updating.
 * @param {FieldPropsOptions} [props] - The `useField` function takes in an optional `props` parameter
 * of type `FieldPropsOptions`. This parameter can contain the following properties:
 * @returns The `useField` function returns an array with two elements. The first element is an object
 * containing the field props with some modifications and additional properties. The second element is
 * an object with metadata about the field, specifically indicating that it is an input field.
 */
const useField = (
  props?: FieldPropsOptions
): [FieldProps, FieldPropsMetadata] => {
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

  return [
    {
      value: _value,
      name,
      debouncedValue: _debouncedValue,
      disabled: disabled || undefined,
      readOnly: !disabled ? undefined : disabled,
      "aria-disabled": !disabled ? undefined : disabled,
      onChange: _handleChange,
      ...props,
    },
    { Field: "input" },
  ];
};

export default useField;
