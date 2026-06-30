import type { ReactNode } from "react";

type Props = {
  toolbar: ReactNode;
  filters?: ReactNode;
  table: ReactNode;
};

export function BaseListPage({
  toolbar,
  filters,
  table,
}: Props) {
  return (
    <div className="space-y-4">
      {toolbar}

      {filters}

      {table}
    </div>
  );
}
