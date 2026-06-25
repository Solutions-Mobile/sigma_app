import React, { createContext, useContext, useMemo, useState } from "react";
import type { AppSettings } from "./app-settings";
import { getAppSettings, saveAppSettings } from "./app-settings";

type AppSettingsContextValue = {
  settings: AppSettings;
  updateSettings: (next: AppSettings) => void;
};

const AppSettingsContext = createContext<AppSettingsContextValue | null>(null);

export function AppSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(getAppSettings);

  function updateSettings(next: AppSettings) {
    setSettings(next);
    saveAppSettings(next);
  }

  const value = useMemo(
    () => ({ settings, updateSettings }),
    [settings],
  );

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  );
}

export function useAppSettings() {
  const ctx = useContext(AppSettingsContext);

  if (!ctx) {
    throw new Error("useAppSettings must be used within AppSettingsProvider");
  }

  return ctx;
}
