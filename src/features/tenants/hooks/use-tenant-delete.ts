import { tenantService } from "../services/tenant-service";
import { tenantKeys } from "./tenant-keys";
import { useAppMutation } from "@/lib/react-query/mutation-factory";

export function useTenantDelete() {
  const retorno = useAppMutation({
    mutationFn: tenantService.remove,
    invalidateKeys: tenantKeys.all,
    successMessage: "Empresa removida",
  });
  return retorno;
}
