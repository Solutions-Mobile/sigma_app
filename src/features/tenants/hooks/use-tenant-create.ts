import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tenantService } from "../services/tenant-service";
import { tenantKeys } from "./tenant-keys";
import type { CreateTenantDto, Tenant } from "../types/tenant.types";
import { handleApiError } from "@/lib/errors/handle-api-error";

export function useCreateTenant() {
  const queryClient = useQueryClient();

  const retorno = 
   useMutation<Tenant, Error, CreateTenantDto>({
    mutationFn: tenantService.create,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: tenantKeys.lists(),
      });
    },
    onError:handleApiError,
  });

  return retorno;
}
