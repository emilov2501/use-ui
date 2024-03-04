import * as React from "react";
import type { ButtonProps, ButtonPropsOptions } from "../../interfaces";

/**
 * The `useButton` function in TypeScript React returns button props and metadata based on the provided
 * options.
 * @param [props] - The `props` parameter in the `useButton` function is an optional object that
 * contains various options for configuring the button component. These options include:
 * @returns The `useButton` function returns an array with two elements:
 */
const useButton = (props?: ButtonPropsOptions): ButtonProps => {
  let {
    form,
    tabIndex,
    disabled = undefined,
    role = "button",
    type = "button",
    onClick,
  } = props || {};

  const handleClick = (event: React.MouseEvent | React.KeyboardEvent) => {
    if (disabled) {
      event.stopPropagation();
      return;
    }

    onClick?.(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === " ") {
      event.preventDefault();
      handleClick(event);
    }
  };

  return {
    type,
    role,
    form,
    disabled: disabled || undefined,
    tabIndex: disabled ? undefined : tabIndex || 0,
    "aria-disabled": !disabled ? undefined : disabled,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
  };
};

export default useButton;
