import { useButton, useField } from "useui-ts";
import "./App.css";

function App() {
  const [{ debouncedValue, ...fieldProps }, { Field }] = useField({
    debounceDelay: 500,
    value: "lox",
    onChange: (e) => console.log(e),
  });

  const [btnProps, { Button }] = useButton({
    className: "lox",
    variant: "default",
  });

  return (
    <>
      <Field {...fieldProps} className="hello" />
      {debouncedValue}
      <Button {...btnProps}>hello</Button>
    </>
  );
}

export default App;
