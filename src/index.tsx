import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App.tsx";
import "./app/index.css";
import { StoreProvider } from "./app/providers/StoreProvider/index.ts";
import { TooltipProvider } from "@components/tooltip.tsx";
import { Toaster } from "@components/sonner";
import { ThemeProvider } from "./app/providers/ThemeProvider/index.ts";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Container not found");
}

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <StoreProvider>
      <ThemeProvider>
        <TooltipProvider>
          <App />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </StoreProvider>
  </BrowserRouter>
);
