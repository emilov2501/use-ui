import ReactDOM from "react-dom/client";
import { Modal, Toaster } from "useui-ts";
import App from "./App.tsx";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Modal
      className="mymodal"
      style={{
        borderRadius: "10px",
      }}
    />
    <Toaster
      timeout={4000}
      className="toaster"
      style={{
        borderRadius: "0",
      }}
    />
  </>
);
