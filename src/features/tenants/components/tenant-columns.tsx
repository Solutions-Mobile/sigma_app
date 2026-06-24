//src\pages\cadastros\tenants\tenant-columns.tsx
import type { ReactNode } from "react";
import type { TenantDTO } from "@/features/tenants/types/tenant.dto";
import type { DataTableColumn, } from "@/components/data-table/data-table-types";
import { TenantTableActions, } from "./tenant-table-actions";

type Props = {
    onEdit: (tenant: TenantDTO,) => void;
    onDelete: (tenant: TenantDTO,) => void;
};

export function tenantColumns({ onEdit, onDelete, }: Props): DataTableColumn<TenantDTO>[] {
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
            render: (_, tenant,): ReactNode => (<TenantTableActions tenant={tenant} onEdit={onEdit} onDelete={onDelete} />
            ),
        },
    ];
}
