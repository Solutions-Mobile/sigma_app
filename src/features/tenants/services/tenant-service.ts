//src\features\tenants\services\tenant-service.ts
import { httpClient } from "@/services/http/http-client";
import type { PaginatedResponse } from "@/types/api/paginated-response";
import type { Tenant, CreateTenantDto, UpdateTenantDto } from "../types/tenant.types";

//const BASE_URL = "/sf/v1/tenants";

export const tenantService = {
  list: async (params?: { page?: number; limit?: number }) => {
    const { data } = await httpClient.get<PaginatedResponse<Tenant>>(
      "/sf/v1/tenants",
      { params }
    );
    return data;
  },

  findById: async (id: string) => {
    const { data } = await httpClient.get<Tenant>(`/sf/v1/tenants/${id}`);
    return data;
  },

  create: async (payload: CreateTenantDto) => {
    const { data } = await httpClient.post<Tenant>(
      "/sf/v1/tenants",
      payload
    );
    return data;
  },

  update: async (id: string, payload: UpdateTenantDto) => {
    const { data } = await httpClient.patch<Tenant>(
      `/sf/v1/tenants/${id}`,
      payload
    );
    return data;
  },

  remove: async (id: string) => {
    const { data } = await httpClient.delete<{ message: string }>(
      `/sf/v1/tenants/${id}`
    );
    return data;
  },
};