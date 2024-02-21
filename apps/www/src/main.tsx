import React from "react";
import ReactDOM from "react-dom/client";
import { Modal, Toaster } from "useui-ts/components";
// import "useui-ts/styles.css";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Modal />
    <Toaster />
  </React.StrictMode>
);
