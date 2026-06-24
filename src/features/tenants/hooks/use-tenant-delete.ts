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
