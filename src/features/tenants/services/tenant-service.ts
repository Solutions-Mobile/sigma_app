//src\features\tenants\services\tenant-service.ts
import { httpClient } from "@/services/http/http-client";
import type { PaginatedResponse } from "@/types/api/paginated-response";
import type { Tenant, CreateTenantDto, UpdateTenantDto } from "../types/tenant.types";
import { getAppSettings, getDataSource } from "@/lib/app-settings";
import { getMockTenants } from "./tenant-mock-data";

export const tenantService = {
  list: async (params?: { page?: number; limit?: number }) => {
    const settings = getAppSettings();
    const dataSource = getDataSource(settings, "tenants");

    if (dataSource === "mock") {
      const page = params?.page ?? 1;
      const limit = params?.limit ?? 10;
      return getMockTenants(page, limit);
    }

    console.log("TENANT SERVICE LIST PARAMS:", params);

    const { data } = await httpClient.get<PaginatedResponse<Tenant>>("/tenants", { params });

    console.log("TENANT SERVICE RESPONSE:", data);
    return data;
  },

  findById: async (id: string) => {
    const { data } = await httpClient.get<Tenant>(`/tenants/${id}`);
    return data;
  },

  create: async (payload: CreateTenantDto) => {
    const { data } = await httpClient.post<Tenant>("/tenants", payload);
    return data;
  },

  update: async (id: string, payload: UpdateTenantDto) => {
    const { data } = await httpClient.patch<Tenant>(`/tenants/${id}`, payload);
    return data;
  },

  remove: async (id: string) => {
    const { data } = await httpClient.delete<{ message: string }>(`/tenants/${id}`);
    return data;
  },
};
