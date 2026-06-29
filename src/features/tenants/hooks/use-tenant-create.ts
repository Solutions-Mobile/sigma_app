import { tenantService } from "../services/tenant-service";
import { tenantKeys } from "./tenant-keys";
import { useAppMutation } from "@/lib/react-query/mutation-factory";

export function useCreateTenant() {
  const retorno = useAppMutation({
    mutationFn: tenantService.create,
    invalidateKeys: tenantKeys.all,
    successMessage: "Tenant criado",
  });
  return retorno;
}
