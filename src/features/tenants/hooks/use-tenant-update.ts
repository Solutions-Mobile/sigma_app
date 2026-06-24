import { useMutation, useQueryClient } from "@tanstack/react-query";
import { appToast } from "@/lib/toast/toast";
import { tenantService } from "../services/tenant-service";
import type { UpdateTenantDto } from "../types/tenant.types";
//import { tenantKeys } from "./tenant-keys";

type MutationData = {
  id: string;
  payload: UpdateTenantDto;
};

export function useUpdateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: MutationData) => tenantService.update(id, payload),

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
