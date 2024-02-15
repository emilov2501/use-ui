import { CSSTransition } from "react-transition-group";
import { useButton, useField, useModal } from "useui-ts";
import "useui-ts/dist/index.css";
import "./App.css";

function App() {
  const [modal, { Modal, isActive }] = useModal();

  const [{ debouncedValue, ...fieldProps }, { Field }] = useField();

  const [btnProps, { Button }] = useButton({
    onClick: () => modal.open("hello", {}),
  });

  return (
    <>
      <Field {...fieldProps} className="hello" />
      <CSSTransition
        in={isActive}
        timeout={modal.timeout}
        classNames="modal"
        unmountOnExit
      >
        <Modal className="modal--animate" />
      </CSSTransition>
      {debouncedValue}
      <Button {...btnProps}>hello</Button>
    </>
  );
}

export default App;
