import type { ReactNode } from "react";

import { ThemeProvider } from "./theme-provider";

import { QueryProvider } from "@/lib/react-query/query-provider";

import { AuthProvider } from "@/contexts/auth/auth-provider";

import { Toaster } from "@/components/ui/sonner";

import { ErrorBoundary } from "@/components/error-boundary/error-boundary";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({
  children,
}: ProvidersProps) {
  console.log("QUERY PROVIDER ACTIVE");
  console.log("APP PROVIDERS RENDERED");
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QueryProvider>
          <AuthProvider>
            {children}

            <Toaster />
          </AuthProvider>
        </QueryProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

/*
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
*/