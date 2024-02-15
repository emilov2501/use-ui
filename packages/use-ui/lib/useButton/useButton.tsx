import { UseButton } from "./useButton.types";

import cls from "classnames";
import * as React from "react";

/* Функция useButton — это специальный хук React, который возвращает массив, содержащий два
элемента. Первый элемент — это объект, содержащий реквизиты, которые следует передать
компоненту кнопки. Второй элемент — это объект, содержащий метаданные о компоненте кнопки. */
const useButton = <TVariants,>({
  disabled = undefined,
  href,
  role = "button",
  type = "button",
  form,
  tabIndex,
  tagName,
  prefix,
  variant,
  className: _className = "",
  onClick,
}: UseButton.ButtonPropsOptions<TVariants>): [
  UseButton.ButtonProps,
  UseButton.ButtonPropsMetadata
] => {
  /**
   * Функция handleClick обрабатывает события щелчка и клавиатуры, предотвращая поведение по умолчанию
   * и останавливая распространение, если элемент отключен.
   * @param {React.MouseEvent | React.KeyboardEvent} event - Параметр события имеет тип
   * React.MouseEvent или React.KeyboardEvent. Он представляет событие, которое вызвало событие щелчка
   * или клавиатуры.
   * @returns ничего (не определено).
   */
  const handleClick = (event: React.MouseEvent | React.KeyboardEvent) => {
    if (disabled || (tagName === "a" && isTrivialHref(href))) {
      event.preventDefault();
    }

    if (disabled) {
      event.stopPropagation();
      return;
    }

    onClick?.(event);
  };

  /**
   * Функция handleKeyDown проверяет, является ли нажатая клавиша пробелом, и если да, предотвращает
   * поведение по умолчанию и вызывает функцию handleClick.
   * @param event - Параметр события — это объект React.KeyboardEvent, который представляет
   * произошедшее событие клавиатуры. Он содержит информацию о событии, например о нажатой клавише.
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === " ") {
      event.preventDefault();
      handleClick(event);
    }
  };

  /* Блок кода проверяет, равно ли свойство tagName «a» (указывая, что кнопка является тегом привязки).
  Если это так, это гарантирует наличие реквизита `href`. Если свойство `href` не указано, ему
  присваивается значение по умолчанию «#». */
  if (tagName === "a") {
    href ||= "#";
    if (disabled) {
      href = undefined;
    }
  }

  const className = React.useMemo(() => {
    if (prefix) {
      return cls(
        prefix,
        `${prefix}-${_className}`,
        `${prefix}-${variant}` || ""
      );
    }

    return cls(_className, variant || "");
  }, [_className, prefix, variant]);

  return [
    {
      type,
      role,
      form,
      disabled: disabled || undefined,
      href: href,
      tabIndex: disabled ? undefined : tabIndex || 0,
      "aria-disabled": !disabled ? undefined : disabled,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      className,
    },
    { Button: tagName || "button" },
  ];
};

function isTrivialHref(href?: string) {
  return !href || href.trim() === "#";
}

export default useButton;
