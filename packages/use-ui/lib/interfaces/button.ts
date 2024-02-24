// useButton.types.d.ts
export type ButtonType = "button" | "reset" | "submit";
export type ButtonMetadata = Pick<JSX.IntrinsicElements, "button" | "a">;

export interface AnchorOptions {
  href?: string;
  rel?: string;
  target?: string;
}

export interface ButtonPropsOptions<TVariants> extends AnchorOptions {
  type?: ButtonType;
  disabled?: boolean;
  form?: string;
  variant?: TVariants;
  prefix?: string;
  className?: string;
  onClick?: React.EventHandler<React.MouseEvent | React.KeyboardEvent>;
  tabIndex?: number;
  tagName?: keyof ButtonMetadata;
  role?: React.AriaRole | undefined;
}

export interface ButtonProps {
  type?: ButtonType | undefined;
  disabled: boolean | undefined;
  form?: string | undefined;
  role?: React.AriaRole;
  tabIndex?: number | undefined;
  href?: string | undefined;
  target?: string | undefined;
  rel?: string | undefined;
  "aria-disabled"?: true | undefined;
  onClick?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  className?: string | undefined;
}
