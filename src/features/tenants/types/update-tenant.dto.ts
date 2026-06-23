// PARA UPDATE VIA PATCH
export type UpdateTenantDTO =
  Partial<{
    companyName: string;
    tradingName: string;
    documentNumber: string;
  }>;

/*
// PARA UPDATE VIA POST
export type UpdateTenantDTO = {
  companyName: string;
  tradingName: string;
  documentNumber: string;
};
*/
