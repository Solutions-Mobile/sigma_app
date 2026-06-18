import type { ReactNode } from "react";
import type { EmpresaDTO } from "@/services/empresas/dtos/empresa.dto";
import type { DataTableColumn, } from "@/components/data-table/data-table-types";
import { EmpresaTableActions, } from "./empresa-table-actions";

type Props = {
    onEdit: (
        empresa: EmpresaDTO,
    ) => void;

    onDelete: (
        empresa: EmpresaDTO,
    ) => void;
};

export function empresaColumns({
    onEdit,
    onDelete,
}: Props): DataTableColumn<EmpresaDTO>[] {
    return [
        {
            key: "companyName",

            label: "Razão Social",

            render: (
                value,
            ): ReactNode =>
                String(value ?? ""),
        },

        {
            key: "tradingName",

            label: "Fantasia",

            render: (
                value,
            ): ReactNode =>
                String(value ?? ""),
        },

        {
            key: "documentNumber",

            label: "Documento",

            render: (
                value,
            ): ReactNode =>
                String(value ?? ""),
        },

        {
            key: "id",

            label: "Ações",

            render: (
                _,
                empresa,
            ): ReactNode => (
                <EmpresaTableActions
                    empresa={empresa}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ),
        },
    ];
}