import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tenantService } from "../services/tenant-service";
import { tenantKeys } from "./tenant-keys";
import type { Tenant, UpdateTenantDto } from "../types/tenant.types";
import { handleApiError } from "@/lib/errors/handle-api-error";


type MutationData = {
  id: string;
  payload: UpdateTenantDto;
};

export function useTenantUpdate() {
  const queryClient = useQueryClient();

  return useMutation<Tenant, Error, MutationData>({
    mutationFn: ({ id, payload }) => tenantService.update(id, payload),

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: tenantKeys.lists(),
        }),

        queryClient.invalidateQueries({
          queryKey: tenantKeys.detail(variables.id),
        }),
      ]);
    },
    onError:handleApiError,
  });
}
