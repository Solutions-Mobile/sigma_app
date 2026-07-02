import type { ColumnDef } from "@tanstack/react-table";
import type { Tenant } from "../types/tenant.types";

export const tenantColumns: ColumnDef<Tenant>[] = [
  // { accessorKey: "id", header: "ID" },
  { accessorKey: "companyName", header: "Razão social" },
  { accessorKey: "tradingName", header: "Nome fantasia" },
  { accessorKey: "documentNumber", header: "Documento" },
  { accessorKey: "email", header: "E-mail" },
  { accessorKey: "isActive", header: "Status", cell: ({ row }) => (row.original.isActive ? "Ativo" : "Inativo") },
];
