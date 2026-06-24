import type { PropsWithChildren } from "react";
import {  QueryClientProvider,} from "@tanstack/react-query";
import { queryClient } from "./query-client";

export function QueryProvider({
  children,
}: PropsWithChildren) {
  console.log("QUERY PROVIDER MOUNTED");
  return (
    <QueryClientProvider
      client={queryClient}
    >
      {children}
    </QueryClientProvider>
  );
}
