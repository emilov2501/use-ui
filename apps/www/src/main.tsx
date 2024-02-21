import ReactDOM from "react-dom/client";
import { Modal, Toaster } from "useui-ts/components";
import "useui-ts/styles.css";
import App from "./App.tsx";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Modal />
    <Toaster />
  </>
);
