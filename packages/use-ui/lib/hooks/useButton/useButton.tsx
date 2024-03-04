import cls from "classnames";
import * as React from "react";
import { useMemo } from "react";
import type {
  ButtonType,
  CommonTypes,
  ResultButtonProps,
} from "../../interfaces";
export interface ButtonPropsOptions
  extends CommonTypes.ComponentDefaultAttributes {
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
    className,
    style,
    tabIndex,
    disabled = undefined,
    role = "button",
    type = "button",
    onClick,
  } = props;

  const _className = useMemo(
    (): string =>
      cls(className, "UI_button", {
        [`UI_button--disabled`]: disabled,
      }),
    [disabled, className]
  );

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
    style,
    className: _className,
    form,
    disabled: disabled || undefined,
    tabIndex: disabled ? undefined : tabIndex || 0,
    "aria-disabled": !disabled ? undefined : disabled,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
  };
};

export default useButton;
