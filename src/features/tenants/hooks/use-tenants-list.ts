import { useQuery } from "@tanstack/react-query";
import { tenantService } from "../services/tenant-service";
import { tenantKeys } from "./tenant-keys";
import { useAppSettings } from "@/lib/app-settings-context";

export function useTenantsList(params: { page: number; limit: number }) {
  console.log("USE TENANTS LIST PARAMS:", params);
  console.log("HOOK EXECUTED");

  const { settings } = useAppSettings();

  const dataSource = settings.dataSources.tenants;

  return useQuery({
    queryKey: [...tenantKeys.list(params), dataSource],
    queryFn: () => tenantService.list(params),
  });
}

console.log("HOOK CALLED");
