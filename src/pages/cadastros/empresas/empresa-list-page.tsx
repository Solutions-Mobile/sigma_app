//src\pages\cadastros\empresas\empresa-list-page.tsx
import { useMemo } from "react";
import { AppPage } from "@/components/app/app-page";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableSearch } from "@/components/data-table/data-table-search";
import { useDebounce } from "@/hooks/use-debounce";
import { useUrlPagination } from "@/hooks/use-url-pagination";
import { useEmpresasQuery } from "@/hooks/queries/use-empresas-query";
import { empresaColumns } from "./empresa-columns";
import type { EmpresaDTO } from "@/services/empresas/dtos/empresa.dto";

export function EmpresaListPage() {
  const { page, limit, search, setPage, setSearch, } = useUrlPagination();
  const debouncedSearch = useDebounce(search, 500);
  const queryParams = useMemo(() => (
    { page, limit, search: debouncedSearch, }),
    [page, limit, debouncedSearch,],
  );

  const { data, isLoading, isFetching, isError, refetch, } = useEmpresasQuery(queryParams);
  const columns = useMemo(() =>
    empresaColumns({
      onEdit: (
        empresa,
      ) => {
        console.log(
          "edit",
          empresa,
        );
      },

      onDelete: (
        empresa,
      ) => {
        console.log(
          "delete",
          empresa,
        );
      },
    }),

    [],
  );

  return (
    <AppPage
      toolbar={
        <div className="flex items-center justify-between">
          <DataTableSearch
            value={search}
            disabled={isFetching}
            onChange={setSearch}
          />
        </div>
      }
    >
      <div className="space-y-4">
        {isError ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-md border py-10">
            <p className="text-sm text-muted-foreground">
              Falha ao carregar empresas
            </p>

            <button
              className="text-sm font-medium underline"
              onClick={() =>
                refetch()
              }
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <>
            <DataTable<EmpresaDTO>
              data={data?.data ?? []}
              columns={columns}
              loading={
                isLoading ||
                isFetching
              }
            />

            <DataTablePagination
              page={data?.page ?? 1}
              limit={
                data?.limit ?? 10
              }
              totalPages={
                data?.totalPages ?? 1
              }
              totalRecords={
                data?.totalRecords ??
                0
              }
              disabled={isFetching}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </AppPage>
  );
}