import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { createReduxStore } from "./providers/StoreProvider";
import { TooltipProvider } from "@components/tooltip.tsx";
import { Toaster } from "@components/sonner";
import { ThemeProvider } from "./providers/ThemeProvider/index.ts";

const root = document.getElementById("root") || document.createElement("div");

const AppWithRouter = () => {
  const store = createReduxStore();
  return (
    <BrowserRouter>
      <ThemeProvider>
        <TooltipProvider>
          <Provider store={store}>
            <App />
            <Toaster />
          </Provider>
        </TooltipProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(root).render(<AppWithRouter />);
