import { useButton } from "useui-ts";
import "./App.css";

function App() {
  const [btnProps, { Button }] = useButton({
    className: "lox",
    variant: "default",
  });

  return <Button {...btnProps}>hello</Button>;
}

export default App;
