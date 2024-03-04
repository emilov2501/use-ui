import { act, renderHook } from "@testing-library/react-hooks";
import React, { ChangeEvent } from "react";
import { describe, expect, it, vi } from "vitest";
import useField, { useFieldState } from "./useField"; // Путь к вашему хуку

describe("useField", () => {
  it("should use initial value", () => {
    const initialValue = "Test";

    const { result } = renderHook(() => useField({ value: initialValue }));

    expect(result.current.value).toBe(initialValue);
  });

  it("should update initial value", () => {
    const updatedValue = "New value";
    const initialValue = "";
    const { result } = renderHook(() => useFieldState({ value: initialValue }));

    const e = {
      target: { value: updatedValue },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => result.current.handleChange?.(e));

    expect(result.current.data.value).toBe(updatedValue);
  });

  it("should update debounce value", () => {
    vi.useFakeTimers();

    const updatedValue = "New value";
    const initialValue = "";
    const { result } = renderHook(() =>
      useFieldState({ value: initialValue, debounceDelay: 500 })
    );

    const e = {
      target: { value: updatedValue },
    } as ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.debouncedQuery?.(e);
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current.data.debounceValue).toBe(updatedValue);
  });
});
