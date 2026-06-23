//src\pages\cadastros\empresas\empresa-columns.tsx
import type { ReactNode } from "react";
import type { TenantDTO } from "@/features/tenants/types/tenant.dto";
import type { DataTableColumn, } from "@/components/data-table/data-table-types";
import { TenantTableActions, } from "./tenant-table-actions";

type Props = {
    onEdit: (empresa: TenantDTO,) => void;
    onDelete: (empresa: TenantDTO,) => void;
};

export function empresaColumns({ onEdit, onDelete, }: Props): DataTableColumn<TenantDTO>[] {
    return [
        {
            key: "companyName",
            label: "Razão Social",
            render: (value,): ReactNode => String(value ?? ""),
        },

        {
            key: "tradingName",
            label: "Fantasia",
            render: (value,): ReactNode => String(value ?? ""),
        },

        {
            key: "documentNumber",
            label: "Documento",
            render: (value,): ReactNode => String(value ?? ""),
        },

        {
            key: "id",
            label: "Ações",
            sortable: false,
            render: (_, empresa,): ReactNode => (<TenantTableActions empresa={empresa} onEdit={onEdit} onDelete={onDelete} />
            ),
        },
    ];
}
