import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import "@/services/http/http-interceptors";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AuthProvider } from "@/contexts/auth/auth-provider";
import { QueryProvider } from "@/lib/react-query/query-provider";
import { AppSettingsProvider } from "@/lib/app-settings-context";

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryProvider>
        <AppSettingsProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </AppSettingsProvider>
      </QueryProvider>
    </ThemeProvider>
  </React.StrictMode>,
);