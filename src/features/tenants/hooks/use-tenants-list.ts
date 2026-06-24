import { useQuery } from "@tanstack/react-query";
import { tenantService } from "../services/tenant-service";
import { tenantKeys } from "./tenant-keys";

export function useTenantsList(params: { page: number; limit: number }) {
  console.log("USE TENANTS LIST PARAMS:", params);
  console.log("HOOK EXECUTED");

  return useQuery({
    queryKey: tenantKeys.list(params),
    queryFn: () => tenantService.list(params),
  });
}

console.log("HOOK CALLED");
