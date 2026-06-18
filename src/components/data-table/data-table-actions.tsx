import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

type Props = {
  onEdit?(): void;

  onDelete?(): void;
};

export function DataTableActions({
  onEdit,
  onDelete,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
      >
        <Button
          size="sm"
          variant="outline"
        >
          Ações
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
      >
        <DropdownMenuItem
          onClick={onEdit}
        >
          Editar
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onDelete}
        >
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
