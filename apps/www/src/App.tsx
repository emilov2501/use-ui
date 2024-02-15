import { useButton, useField } from "useui-ts";
import "./App.css";

function App() {
  const [{ debouncedValue, ...fieldProps }, { Field }] = useField();

  const [btnProps, { Button }] = useButton();

  return (
    <>
      <Field {...fieldProps} className="hello" />
      {debouncedValue}
      <Button {...btnProps}>hello</Button>
    </>
  );
}

export default App;
