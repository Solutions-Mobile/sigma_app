import { useMutation, useQueryClient } from "@tanstack/react-query";
import { empresaService } from "@/services/empresas/empresa-service";
import { appToast } from "@/lib/toast/toast";
//import type { UpdateEmpresaDTO } from "@/services/empresas/dtos/update-empresa.dto";
import type { UpdateEmpresaDTO } from "@/services/empresas/dtos/update-empresa.dto";

type MutationData = {
  id: string;
  payload: UpdateEmpresaDTO;
};

export function useUpdateEmpresa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: MutationData) => empresaService.update(id, payload),

    onSuccess: async () => {
      appToast.success("Empresa atualizada com sucesso");

      await queryClient.invalidateQueries({
        queryKey: ["empresas"],
      });
    },

    onError: () => {
      appToast.error("Erro ao atualizar empresa");
    },
  });
}
