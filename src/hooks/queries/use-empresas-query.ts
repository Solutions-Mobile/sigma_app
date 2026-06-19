import { useQuery } from "@tanstack/react-query";
import { empresaService } from "@/services/empresas/empresa-service";
import type { FindEmpresasParamsDTO } from "@/services/empresas/dtos/find-empresas-params.dto";

export function useEmpresasQuery(
  params?: FindEmpresasParamsDTO
) {
  return useQuery({
    queryKey: ["empresas", params],
    queryFn: () => empresaService.findAll(params),
  });
}