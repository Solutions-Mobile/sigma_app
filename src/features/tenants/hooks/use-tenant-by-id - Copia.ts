/*
import { useQuery } from "@tanstack/react-query";
import { tenantService } from "../services/tenant-service";

export function useTenantQuery(id?: string) {
  return useQuery({
    queryKey: ["empresas", id],
    queryFn: () => tenantService.findById(id!),
    enabled: !!id,
    staleTime: 1000 * 30,
    retry: 1,
  });
}
*/
