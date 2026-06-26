import { useQuery } from "@tanstack/react-query";
import { tenantService } from "../services/tenant-service";
import { tenantKeys } from "./tenant-keys";

export function useTenantById(id: string) {
  return useQuery({
    queryKey: tenantKeys.detail(id),

    queryFn: () => tenantService.findById(id),

    enabled: Boolean(id),

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,

    refetchOnWindowFocus: false,
  });
}
