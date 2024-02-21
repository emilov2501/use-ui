import { useButton, useField, useModal, useToast } from "useui-ts/hooks";

function App() {
  const modal = useModal();
  const [{ debouncedValue, ...fieldProps }, { Field }] = useField();

  const toast = useToast();
  const [btnProps, { Button }] = useButton({
    onClick: () => modal.open("hello", { size: "xs" }),
  });

  const [btnProps2, { Button: Two }] = useButton({
    onClick: () =>
      toast({
        title: "Uh No! Something went wrong",
        description: "There was a problet with your request",
      }),
  });

  return (
    <>
      <Field {...fieldProps} className="hello" />
      <Button {...btnProps}>hello</Button>
      <Two {...btnProps2}>Two</Two>
    </>
  );
}

export default App;
