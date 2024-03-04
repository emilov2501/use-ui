import { useButton, useField, useModal, useSwitch } from "useui-ts";

function App() {
  const modal = useModal();
  const { debouncedValue, ...fieldProps } = useField({
    debounceDelay: 500,
  });
  const switchProps = useSwitch();
  const btnProps = useButton({
    onClick: () =>
      modal.open("hello", {
        title: "modal",
      }),
  });

  return (
    <>
      <input {...switchProps} />
      <input {...fieldProps} />
      {debouncedValue}
      <button {...btnProps}>Open modal</button>
    </>
  );
}

export default App;
