import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { OperationProvider } from "./context/OperationContext.tsx";
import App from "./App.tsx";



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OperationProvider>
     <App />
    </OperationProvider>
  </StrictMode>
);
