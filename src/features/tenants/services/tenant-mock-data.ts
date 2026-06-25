import type { Tenant } from "../types/tenant.types";
import type { PaginatedResponse } from "@/types/api/paginated-response";
import { MOCK_DATA } from "./mock_data";

const MOCK_TENANTS: Tenant[] = MOCK_DATA;

export function getMockTenants(page = 1, limit = 10): PaginatedResponse<Tenant> {
  const start = (page - 1) * limit;
  const data = MOCK_TENANTS.slice(start, start + limit);

  return {
    data,
    page,
    limit,
    totalRecords: MOCK_TENANTS.length,
    totalPages: Math.max(1, Math.ceil(MOCK_TENANTS.length / limit)),
  };
}
