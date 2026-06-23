//src\hooks\queries\use-empresas-query.ts

import { useQuery } from "@tanstack/react-query";
import { tenantService } from "../services/tenant-service";
import { tenantKeys } from "./tenant-keys";

export function useTenantsList(params: { page: number; limit: number }) {
  return useQuery({
    queryKey: tenantKeys.list(params),
    queryFn: () => tenantService.list(params),
    keepPreviousData: true,
  });
}

/*
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { FindTenantsParamsDTO } from "../types/find-tenants-params.dto";
import { tenantService } from './../services/tenant-service';
import { keepPreviousData } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';

export function useTenantsList(params: FindTenantsParamsDTO) {
  return useQuery({
    queryKey: ["empresas", params],
    queryFn: () => tenantService.list(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    retry: 2,
  });
}
*/