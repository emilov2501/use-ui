import { CSSProperties } from "react";

export declare namespace CommonTypes {
  export type Noop = () => void;

  export interface ComponentDefaultAttributes {
    id?: string | undefined;
    className?: string | undefined;
    style?: CSSProperties;
  }
}
