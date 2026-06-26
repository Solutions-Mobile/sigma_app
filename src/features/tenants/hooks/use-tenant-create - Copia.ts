/*
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { appToast } from "@/lib/toast/toast";
import { tenantService } from "../services/tenant-service";
import { tenantKeys } from "./tenant-keys";
import type { CreateTenantDto } from "../types/tenant.types";

export function useCreateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTenantDto) =>
      tenantService.create(data),

    onSuccess: async () => {
      appToast.success("Empresa criada com sucesso");

      await queryClient.invalidateQueries({
        queryKey: tenantKeys.all,
      });
    },

    onError: () => {
      appToast.error("Erro ao criar empresa");
    },
  });
}
*/
