import { useModal, useToast } from "useui-ts";

function App() {
  const modal = useModal();
  const toast = useToast();

  return (
    <>
      <button
        onClick={() =>
          modal.open("hello", {
            bottomNavigationBar: {
              items: [<button>daun</button>],
            },
          })
        }
      >
        Open modal
      </button>

      <button onClick={() => toast({ title: "helo", variant: "success" })}>
        toast
      </button>
    </>
  );
}

export default App;
