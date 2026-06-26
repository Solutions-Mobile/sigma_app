import {  keepPreviousData,  useQuery,} from "@tanstack/react-query";
import { tenantService } from "../services/tenant-service";
import { tenantKeys } from "./tenant-keys";
import { useAppSettings } from "@/lib/app-settings-context";

type UseTenantsListParams = {
  page: number;
  limit: number;
  search?: string;
  isActive?: boolean;
};

export function useTenantsList(params: UseTenantsListParams) {
  const { settings } = useAppSettings();
  const dataSource = settings.dataSources.tenants;

  return useQuery({
    queryKey: [
      ...tenantKeys.list(params),
      dataSource,
    ],

    queryFn: () => tenantService.list(params),

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,

    refetchOnWindowFocus: false,

    placeholderData: keepPreviousData,
  });
}
