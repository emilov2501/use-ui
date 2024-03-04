![image](https://github.com/emilov2501/use-ui/assets/19309946/896d7263-0fe1-4f78-bc1a-f55b03c202c1)

## Introduction

**useUI** is a React library offering a suite of components and hooks that simplify app development. Access to components is provided through hooks, enabling the encapsulation of complex logic and state management internally, without dictating their appearance. This approach grants developers the freedom to style, while still providing a robust and flexible functionality for creating unique user interfaces 😎.

### Available Hooks

- `useButton`
- `useField`
- `useMediaQuery`
- `useModal`
- `useToast`

#### Usage example

```jsx

import { useModal, useButton, Modal } from 'useui-ts'

function Component() {
  const modal = useModal();

  const btnProps = useButton({
    onClick: () =>
      modal.open("first-modal", {
        size: "sm",
        title: "Are you sure?",
        content: (
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            nulla rerum voluptatibus provident deserunt.
          </div>
        ),
        bottomNavigationBar: {
          justifyBetween: true,
          items: [
            <ConfirmButton {...confirmProps}>Send</SendButton>,
            <CancelButton onClick={() => modal.close("first-modal")}>Cancel</button>,
          ],
        },
      }),
  });

 return (
    <div>
      <button {...btnProps}>Open Modal</button>
    </div>
  )
}

// Insert Modal component in App component
function App() {
  return (
    <div>
      <Modal />
    </div>
  )
}

```

## Installation

```

npm install --save useui-ts

```
