import * as React from "react";
import type { ButtonType, ResultButtonProps } from "../../interfaces";

export interface ButtonPropsOptions {
  type?: ButtonType;
  disabled?: boolean;
  form?: string;
  tabIndex?: number;
  role?: React.AriaRole | undefined;
  onClick?: React.EventHandler<React.MouseEvent | React.KeyboardEvent>;
}

const useButton = (props: ButtonPropsOptions = {}): ResultButtonProps => {
  let {
    form,
    tabIndex,
    disabled = undefined,
    role = "button",
    type = "button",
    onClick,
  } = props;

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
