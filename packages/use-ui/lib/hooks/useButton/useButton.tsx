import * as React from "react";
import type {
  ButtonMetadata,
  ButtonProps,
  ButtonPropsOptions,
} from "../../interfaces";

/**
 * The `useButton` function in TypeScript React returns button props and metadata based on the provided
 * options.
 * @param [props] - The `props` parameter in the `useButton` function is an optional object that
 * contains various options for configuring the button component. These options include:
 * @returns The `useButton` function returns an array with two elements:
 */
const useButton = (
  props?: ButtonPropsOptions
): [ButtonProps, keyof ButtonMetadata] => {
  let {
    disabled = undefined,
    href,
    role = "button",
    type = "button",
    form,
    tabIndex,
    tagName = "button",
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
    },
    tagName,
  ];
};

function isTrivialHref(href?: string) {
  return !href || href.trim() === "#";
}

export default useButton;
