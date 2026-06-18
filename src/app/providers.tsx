import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query/query-client";
import { AppToaster } from "@/components/ui/toaster";

type Props = {
  children: React.ReactNode;
};

export function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <AppToaster />
    </QueryClientProvider>
  );
}
