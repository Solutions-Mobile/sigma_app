import { useMutation, useQueryClient } from "@tanstack/react-query";
import { appToast } from "@/lib/toast/toast";
import type { CreateTenantDTO } from "../types/create-tenant.dto";
import { tenantService } from "../services/tenant-service";

export function useCreateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn: (data: CreateEmpresaDTO) =>
    //   createEmpresa(data),
    mutationFn: (data: CreateTenantDTO) =>
      tenantService.create(data),

    onSuccess: async () => {
      appToast.success("Empresa criada com sucesso");

      await queryClient.invalidateQueries({
        queryKey: ["empresas"],
      });
    },

    onError: () => {
      appToast.error("Erro ao criar empresa");
    },
  });
}
