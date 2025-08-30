import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";

import { Toaster } from "./components/ui/sonner.tsx";
import { ThemeProvider } from "./providers/theme-proider.tsx";
import { store } from "./redux/store.ts";
import router from "./router/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Provider store={store}>
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
          <RouterProvider router={router} />
          <Toaster richColors />
        </CookiesProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
