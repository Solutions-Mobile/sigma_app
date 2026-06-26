//src\pages\cadastros\tenants\tenant-table-actions.tsx
import { MoreHorizontal, Pencil, Trash2, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import type { Tenant } from "../types/tenant.types";

type TenantTableActionsProps = {
    tenant: Tenant;
    onEdit: (tenant: Tenant,) => void;
    onDelete: (tenant: Tenant,) => void;
};

export function TenantTableActions({ tenant, onEdit, onDelete, }: TenantTableActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => onEdit(tenant)}>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onSelect={(event) => {
                        event.preventDefault();
                        onEdit(tenant);
                    }}
                >
                    <Pencil className="mr-2 h-4 w-4" />

                    Editar
                </DropdownMenuItem>

                <DropdownMenuItem
                    onSelect={(event) => {
                        event.preventDefault();

                        onDelete(tenant);
                    }}
                    className="text-red-600"
                >
                    <Trash2 className="mr-2 h-4 w-4" />

                    Excluir
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
