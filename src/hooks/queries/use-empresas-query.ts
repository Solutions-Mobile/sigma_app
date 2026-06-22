//src\hooks\queries\use-empresas-query.ts
import {  keepPreviousData,  useQuery,} from "@tanstack/react-query";
import { empresaService } from "@/services/empresas/empresa-service";
import type { FindEmpresasParamsDTO } from "@/services/empresas/dtos/find-empresas-params.dto";

export function useEmpresasQuery(
  params: FindEmpresasParamsDTO,
) {
  return useQuery({
    queryKey: ["empresas", params],

    queryFn: () =>
      empresaService.findAll(params),

    placeholderData: keepPreviousData,

    staleTime: 1000 * 30,

    gcTime: 1000 * 60 * 5,

    retry: 2,
  });
}
