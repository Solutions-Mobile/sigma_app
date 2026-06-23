//src\hooks\queries\use-empresas-query.ts
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { FindTenantsParamsDTO } from "../types/find-tenants-params.dto";
import { tenantService } from "../services/tenant-service";

export function useEmpresasQuery(params: FindTenantsParamsDTO) {
  return useQuery({
    queryKey: ["empresas", params],
    queryFn: () => tenantService.list(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    retry: 2,
  });
}
