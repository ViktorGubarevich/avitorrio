import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";

import "normalize.css";
import "./index.scss";
import { Context } from "./Context.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Context>
      <App />
    </Context>
  </StrictMode>,
);
