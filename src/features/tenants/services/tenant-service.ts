//src\services\empresas\empresa-service.ts
import { httpClient } from "@/services/http/http-client";
import type { PaginatedResponse } from "@/types/api/paginated-response";
import type { TenantDTO } from "../types/tenant.dto";
import type { CreateTenantDTO } from "../types/create-tenant.dto";
import type { UpdateTenantDTO } from "../types/update-tenant.dto";

//const BASE_URL = "/sf/v1/tenants";

export const tenantService = {
  list: async (params?: { page?: number; limit?: number }) => {
    const { data } = await httpClient.get<PaginatedResponse<TenantDTO>>(
      "/sf/v1/tenants",
      { params }
    );
    return data;
  },

  findById: async (id: string) => {
    const { data } = await httpClient.get<TenantDTO>(`/sf/v1/tenants/${id}`);
    return data;
  },

  create: async (payload: CreateTenantDTO) => {
    const { data } = await httpClient.post<TenantDTO>(
      "/sf/v1/tenants",
      payload
    );
    return data;
  },

  update: async (id: string, payload: UpdateTenantDTO) => {
    const { data } = await httpClient.patch<TenantDTO>(
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