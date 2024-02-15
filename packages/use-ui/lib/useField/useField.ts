import debounce from "lodash.debounce";
import { ChangeEvent, useCallback, useState } from "react";
import { UseField } from "./useField.types";

/* Функция useField — это специальный хук в TypeScript, который используется для создания
контролируемого поля ввода. В качестве параметров он принимает различные параметры, такие как
начальное значение, имя, обратный вызов onChange и задержку устранения дребезга. */
const useField = ({
  value = "",
  name,
  debounceDelay = 0,
  onChange,
  disabled,
  ...props
}: UseField.FieldPropsOptions): [
  UseField.FieldProps,
  UseField.FieldPropsMetadata
] => {
  const [_value, _setValue] = useState<string>(() => value);
  const [_debouncedValue, _setDebouncedValue] = useState<string>(() => value);

  /* Строка `const debounced = useDebounceCallback(_onChange, debounceDelay);` использует ловушку
  `useDebounceCallback` из библиотеки `usehooks-ts` для создания отстранённой версии функции
  `_onChange`. */
  const debounced = debounce((e) => {
    _setDebouncedValue(e.target.value);
    onChange?.(e);
  }, debounceDelay);

  const debouncedQuery = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => debounced(e),
    []
  );
  /**
   * Функция `_handleChange` — это функция TypeScript, которая обрабатывает событие изменения входного
   * элемента и соответствующим образом обновляет значение, а также устраняет отскок события.
   * @param e - React.ChangeEvent<HTMLInputElement> — это тип объекта события, который передается в
   * функцию обработчика событий. Он представляет событие изменения входного элемента.
   */
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
