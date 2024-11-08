import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalProvider>
    <BrowserRouter>
    <SnackbarProvider autoHideDuration={3000}>
      <App />
    </SnackbarProvider>
    </BrowserRouter>
  </GlobalProvider>
);
