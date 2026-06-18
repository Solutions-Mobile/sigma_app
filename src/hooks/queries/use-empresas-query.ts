import { useQuery } from "@tanstack/react-query";

import { empresaService } from "@/services/empresas/empresa-service";

export function useEmpresasQuery() {
  return useQuery({
    queryKey: ["empresas"],

    queryFn: () =>
      empresaService.findAll(),
  });
}
