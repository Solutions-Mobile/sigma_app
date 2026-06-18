import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateEmpresaDTO } from "@/services/empresas/dtos/create-empresa.dto";
import { empresaService } from "@/services/empresas/empresa-service";

export function useCreateEmpresa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateEmpresaDTO) => empresaService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["empresas"],
      });
    },
  });
}
