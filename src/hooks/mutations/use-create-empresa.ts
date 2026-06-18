import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateEmpresaDTO } from "@/services/empresas/dtos/create-empresa.dto";
import { empresaService } from "@/services/empresas/empresa-service";
import { appToast } from "@/lib/toast/toast";

export function useCreateEmpresa() {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn: (data: CreateEmpresaDTO) =>
    //   createEmpresa(data),
    mutationFn: (data: CreateEmpresaDTO) =>
      empresaService.create(data),

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

/*
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
*/