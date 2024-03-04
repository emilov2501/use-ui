import { act, renderHook } from "@testing-library/react-hooks";
import React from "react";
import { describe, expect, it } from "vitest";
import useField from "./useField"; // Путь к вашему хуку

describe("useField", () => {
  it("should use initial value", () => {
    const initialValue = "Test";

    const { result } = renderHook(() => useField({ value: initialValue }));

    const props = result.current;

    expect(props.value).toBe(initialValue);
  });

  it("should use setValue", () => {
    const updatedValue = "New value";
    const initialValue = "";
    const { result } = renderHook(() => useField({ value: initialValue }));

    const props = result.current;

    act(() =>
      props.onChange?.({
        target: {
          value: updatedValue,
        },
      } as React.ChangeEvent<HTMLInputElement>)
    );

    expect(props.value).toBe(updatedValue);
  });
});
