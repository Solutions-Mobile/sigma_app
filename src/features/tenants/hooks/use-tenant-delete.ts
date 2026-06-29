import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tenantService } from "../services/tenant-service";
import { tenantKeys } from "./tenant-keys";
import { handleApiError } from "@/lib/errors/handle-api-error";

export function useTenantDelete() {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, Error, string>({
    mutationFn: tenantService.remove,

    onSuccess: async (_, deletedId) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: tenantKeys.lists(),
        }),

        queryClient.removeQueries({
          queryKey: tenantKeys.detail(deletedId),
        }),
      ]);
    },
    onError:handleApiError,  
  });
}
