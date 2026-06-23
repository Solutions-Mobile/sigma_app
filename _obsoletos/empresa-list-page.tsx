//src\pages\cadastros\empresas\empresa-list-page.tsx
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AppPage } from "@/components/app/app-page";
import { PageToolbar } from "@/components/app/page-toolbar";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import { useUrlPagination } from "@/hooks/use-url-pagination";
import { useEmpresasQuery } from "@/features/tenants/hooks/use-empresas-query";
import { empresaColumns } from "../components/tenant-columns";
import type { EmpresaDTO } from "@/features/tenants/types/empresa.dto";
import mockEmpresas from "../../../../__docs/mocks/MOCK_DATA_EMPRESA.json";
import { getAppSettings } from "@/lib/app-settings";
import { appToast } from "@/lib/toast/toast";

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
  const navigate = useNavigate();
  const appSettings = getAppSettings();
  const { page, limit, search, setPage, setSearch, } = useUrlPagination({
    defaultLimit: appSettings.pageSize,
  });
  const usingSortMock =
    appSettings.empresaDataSource === "mock";
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
  const mockTotalPages = Math.max(
    Math.ceil(mockData.length / limit),
    1,
  );
  const mockPage = Math.min(
    page,
    mockTotalPages,
  );
  const paginatedMockData = useMemo(() => {
    const start = (mockPage - 1) * limit;
    const end = start + limit;

    return mockData.slice(start, end);
  }, [limit, mockData, mockPage]);
  const tableData = usingSortMock
    ? paginatedMockData
    : data?.data ?? [];
  const pagination = usingSortMock
    ? {
        page: mockPage,
        limit,
        totalPages: mockTotalPages,
        totalRecords: mockData.length,
        disabled: false,
      }
    : {
        page: data?.page ?? 1,
        limit: data?.limit ?? 10,
        totalPages: data?.totalPages ?? 1,
        totalRecords: data?.totalRecords ?? 0,
        disabled: isFetching,
      };
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
        if (usingSortMock) {
          appToast.info(
            "O mock é usado apenas para testar a listagem",
          );

          return;
        }

        navigate(
          `/cadastros/empresas/${empresa.id}`,
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

    [navigate, usingSortMock],
  );

  return (
    <AppPage
      toolbar={
        <PageToolbar>
          <div />
          <Button
            type="button"
            onClick={() =>
              navigate(
                "/cadastros/empresas/nova",
              )
            }
          >
            Nova Empresa
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

            <DataTablePagination
              page={pagination.page}
              limit={pagination.limit}
              totalPages={
                pagination.totalPages
              }
              totalRecords={
                pagination.totalRecords
              }
              disabled={
                pagination.disabled
              }
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </AppPage>
  );
}
