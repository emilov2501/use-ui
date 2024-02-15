import { renderHook } from "@testing-library/react";
import useField from "./useField"; // Путь к вашему хуку

function setup(params: any) {
  return renderHook(() => useField(params));
}

describe("useField hook", () => {
  test("should use initial value", () => {
    const initialValue = "Test";
    const { result } = setup({ value: initialValue });

    const [fieldProps] = result.current;

    expect(fieldProps.value).toBe(initialValue);
  });
});
