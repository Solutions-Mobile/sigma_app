import type { ColumnDef } from "@tanstack/react-table";
import type { TenantDTO } from "../types/tenant.dto";

export const tenantColumns: ColumnDef<TenantDTO>[] = [
  {
    accessorKey: "companyName",
    header: "Razão Social",
  },
  {
    accessorKey: "tradingName",
    header: "Fantasia",
  },
  {
    accessorKey: "documentNumber",
    header: "Documento",
  },
  {
    accessorKey: "isActive",
    header: "Ativo",
    cell: ({ row }) => (row.original.isActive ? "Sim" : "Não"),
  },
];
