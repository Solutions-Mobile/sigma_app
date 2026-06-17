import type { ReactNode } from "react";

import { ThemeProvider } from "./theme-provider";

import { AuthProvider } from "@/contexts/auth/auth-provider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children, }: ProvidersProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}
