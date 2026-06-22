//src\pages\cadastros\empresas\empresa-table-actions.tsx
import { MoreHorizontal, Pencil, Trash2, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import type { EmpresaDTO } from "@/services/empresas/dtos/empresa.dto";

type EmpresaTableActionsProps = {
    empresa: EmpresaDTO;
    onEdit: (empresa: EmpresaDTO,) => void;
    onDelete: (empresa: EmpresaDTO,) => void;
};

export function EmpresaTableActions({ empresa, onEdit, onDelete, }: EmpresaTableActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button type="button" variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onSelect={(event) => {
                        event.preventDefault();
                        onEdit(empresa);
                    }}
                >
                    <Pencil className="mr-2 h-4 w-4" />

                    Editar
                </DropdownMenuItem>

                <DropdownMenuItem
                    onSelect={(event) => {
                        event.preventDefault();

                        onDelete(empresa);
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
