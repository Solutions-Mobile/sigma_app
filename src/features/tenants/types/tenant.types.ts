export type Tenant = {
  id: string;
  companyName: string;
  tradingName: string;
  documentNumber: string;
  subdomain: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateTenantDto = {
  companyName: string;
  tradingName: string;
  documentNumber: string;
  subdomain?: string;
};

export type UpdateTenantDto = Partial<{
  companyName: string;
  tradingName: string;
  documentNumber: string;
  subdomain: string;
  isActive: boolean;
}>;

export type TenantListParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
