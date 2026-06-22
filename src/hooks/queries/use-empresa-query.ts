import {
  useQuery,
} from "@tanstack/react-query";
import { empresaService } from "@/services/empresas/empresa-service";

export function useEmpresaQuery(
  id?: string,
) {
  return useQuery({
    queryKey: ["empresas", id],

    queryFn: () =>
      empresaService.findById(id!),

    enabled: !!id,

    staleTime: 1000 * 30,

    retry: 1,
  });
}
