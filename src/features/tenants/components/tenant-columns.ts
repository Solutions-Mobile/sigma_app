import type { DataTableColumn } from "@/components/data-table/data-table-types";
import type { Tenant } from "../types/tenant.types";

export const tenantColumns: DataTableColumn<Tenant>[] = [
  {
    key: "companyName",
    label: "Razão Social",
  },
  {
    key: "tradingName",
    label: "Fantasia",
  },
  {
    key: "documentNumber",
    label: "Documento",
  },
  {
    key: "isActive",
    label: "Ativo",
    render: (value) => (value ? "Sim" : "Não"),
  },
];