// PARA UPDATE VIA POST
export type UpdateEmpresaDTO = {
  companyName: string;
  tradingName: string;
  documentNumber: string;
};

/* PARA UPDATE VIA PATCH
export type UpdateEmpresaDTO =
  Partial<{
    companyName: string;
    tradingName: string;
    documentNumber: string;
  }>;
*/
