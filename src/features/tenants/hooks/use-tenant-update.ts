import { tenantService } from "../services/tenant-service";
import { tenantKeys } from "./tenant-keys";
import type { Tenant, UpdateTenantDto } from "../types/tenant.types";
import { useAppMutation } from "@/lib/react-query/mutation-factory";

type MutationData = {
  id: string;
  payload: UpdateTenantDto;
};

export function useTenantUpdate() {
  const retorno = useAppMutation<Tenant, MutationData>({
    mutationFn: ({ id, payload }) => tenantService.update(id, payload),
    invalidateKeys: tenantKeys.all,
    successMessage: "Empresa atualizada",
  });
  return retorno;
}
