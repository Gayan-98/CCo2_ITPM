import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "font-awesome/css/font-awesome.min.css";

import { DarkModeContextProvider } from "./context/darkModeContext";
import { AuthContextProvider } from "./context/authContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        {" "}
        {/* Wrap your component tree with AuthContextProvider */}
        <App />
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
