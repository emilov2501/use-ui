import type {
  ButtonProps,
  ButtonPropsMetadata,
  ButtonPropsOptions,
} from "@/types/button";
import cls from "classnames";
import * as React from "react";

/**
 * The `useButton` function in TypeScript React returns button props and metadata based on the provided
 * options.
 * @param [props] - The `props` parameter in the `useButton` function is an optional object that
 * contains various options for configuring the button component. These options include:
 * @returns The `useButton` function returns an array with two elements:
 */
const useButton = <TVariants,>(
  props?: ButtonPropsOptions<TVariants>
): [ButtonProps, ButtonPropsMetadata] => {
  let {
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
  } = props || {};

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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === " ") {
      event.preventDefault();
      handleClick(event);
    }
  };

  if (tagName === "a") {
    href ||= "#";
    if (disabled) {
      href = undefined;
    }
  }

  const className = React.useMemo(() => {
    if (prefix) {
      return cls(prefix, _className, {
        [`${prefix}-${variant}`]: prefix && variant,
      });
    }

    return cls(_className, {
      [`${variant}`]: variant,
    });
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
