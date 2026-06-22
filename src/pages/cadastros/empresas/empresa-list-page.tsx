//src\pages\cadastros\empresas\empresa-list-page.tsx
import { useMemo, useState } from "react";
import { AppPage } from "@/components/app/app-page";
import { PageToolbar } from "@/components/app/page-toolbar";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import { useUrlPagination } from "@/hooks/use-url-pagination";
import { useEmpresasQuery } from "@/hooks/queries/use-empresas-query";
import { empresaColumns } from "./empresa-columns";
import type { EmpresaDTO } from "@/services/empresas/dtos/empresa.dto";
import mockEmpresas from "../../../../__docs/mocks/MOCK_DATA_EMPRESA.json";

type MockEmpresa = {
  id: number;
  razaoSocial: string;
  documento: string;
  cidade: string;
};

const empresasMock = (
  mockEmpresas as MockEmpresa[]
).map(
  (empresa): EmpresaDTO => ({
    id: String(empresa.id),
    companyName: empresa.razaoSocial,
    tradingName: empresa.cidade,
    documentNumber: empresa.documento,
  }),
);

export function EmpresaListPage() {
  const { page, limit, search, setPage, setSearch, } = useUrlPagination();
  const [usingSortMock, setUsingSortMock] = useState(false);
  const debouncedSearch = useDebounce(search, 500);
  const queryParams = useMemo(() => (
    { page, limit, search: debouncedSearch, }),
    [page, limit, debouncedSearch,],
  );

  const { data, isLoading, isFetching, isError, refetch, } = useEmpresasQuery(queryParams);
  const mockData = useMemo(() => {
    const normalizedSearch =
      debouncedSearch.trim().toLocaleLowerCase("pt-BR");

    if (!normalizedSearch) {
      return empresasMock;
    }

    return empresasMock.filter((empresa) =>
      [
        empresa.companyName,
        empresa.tradingName,
        empresa.documentNumber,
      ]
        .join(" ")
        .toLocaleLowerCase("pt-BR")
        .includes(normalizedSearch),
    );
  }, [debouncedSearch]);
  const tableData = usingSortMock
    ? mockData
    : data?.data ?? [];
  const loading =
    !usingSortMock && (
      isLoading ||
      isFetching
    );
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
        <PageToolbar>
          <div className="text-sm text-muted-foreground">
            {usingSortMock
              ? "Modo teste: mock local para validar sort"
              : "Modo banco: dados reais"}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setUsingSortMock((current) => !current)
            }
          >
            {usingSortMock
              ? "Usar banco"
              : "Usar mock de sort"}
          </Button>
        </PageToolbar>
      }
    >
      <div className="space-y-4">
        {isError && !usingSortMock ? (
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
              data={tableData}
              columns={columns}
              search={{
                value: search,
                disabled: loading,
                onChange: setSearch,
              }}
              loading={loading}
            />

            {!usingSortMock && (
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
            )}
          </>
        )}
      </div>
    </AppPage>
  );
}
