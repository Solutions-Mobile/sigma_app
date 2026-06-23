import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tenantService } from "../services/tenant-service";
import { tenantKeys } from "./tenant-keys";

export function useTenantDelete() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: tenantService.remove,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: tenantKeys.all });
    },
  });
}

/*
import {  useMutation,  useQueryClient,} from "@tanstack/react-query";
import { appToast } from "@/lib/toast/toast";
import { empresaService } from "../services/tenant-service";

export function useDeleteTenant() {
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
*/