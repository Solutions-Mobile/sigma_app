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
