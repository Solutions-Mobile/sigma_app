import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { empresaService } from "@/services/empresas/empresa-service";

import { appToast } from "@/lib/toast/toast";

export function useDeleteEmpresa() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      empresaService.delete(id),

    onSuccess: async () => {
      appToast.success(
        "Empresa excluída com sucesso",
      );

      await queryClient.invalidateQueries({
        queryKey: ["empresas"],
      });
    },

    onError: () => {
      appToast.error(
        "Erro ao excluir empresa",
      );
    },
  });
}
