import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Context } from "./context/context";
import { App } from "./App";

import "normalize.css";
import "./index.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Context>
      <App />
    </Context>
  </StrictMode>
);
