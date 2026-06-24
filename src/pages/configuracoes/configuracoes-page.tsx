import { useState, type ReactNode } from "react";
import { AppCard } from "@/components/app/app-card";
import { AppPage } from "@/components/app/app-page";
import { Button } from "@/components/ui/button";
import {  DEFAULT_APP_SETTINGS,  getAppSettings,  saveAppSettings,  type AppSettings,  type EmpresaDataSource,} from "@/lib/app-settings";
import { cn } from "@/lib/utils";

const PAGE_SIZE_OPTIONS = [
  10,
  25,
  50,
  100,
];

export function ConfiguracoesPage() {
  const [settings, setSettings] =
    useState<AppSettings>(getAppSettings);

  function updateSettings(
    nextSettings: AppSettings,
  ) {
    setSettings(nextSettings);
    saveAppSettings(nextSettings);
  }

  function handleDataSourceChange(
    empresaDataSource: EmpresaDataSource,
  ) {
    updateSettings({
      ...settings,
      empresaDataSource,
    });
  }

  function handlePageSizeChange(
    pageSize: number,
  ) {
    updateSettings({
      ...settings,
      pageSize,
    });
  }

  function handleReset() {
    updateSettings(
      DEFAULT_APP_SETTINGS,
    );
  }

  return (
    <AppPage>
      <div className="max-w-3xl space-y-4">
        <AppCard>
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-semibold">
                Listagem de empresas
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Preferências usadas na tela de Empresas.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">
                Origem dos dados
              </div>

              <div className="flex flex-wrap gap-2">
                <SegmentButton
                  active={
                    settings.empresaDataSource ===
                    "database"
                  }
                  onClick={() =>
                    handleDataSourceChange(
                      "database",
                    )
                  }
                >
                  Dados reais
                </SegmentButton>

                <SegmentButton
                  active={
                    settings.empresaDataSource ===
                    "mock"
                  }
                  onClick={() =>
                    handleDataSourceChange(
                      "mock",
                    )
                  }
                >
                  Mock de teste
                </SegmentButton>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">
                Registros por página
              </div>

              <div className="flex flex-wrap gap-2">
                {PAGE_SIZE_OPTIONS.map((pageSize) => (
                  <SegmentButton
                    key={pageSize}
                    active={
                      settings.pageSize === pageSize
                    }
                    onClick={() =>
                      handlePageSizeChange(pageSize)
                    }
                  >
                    {pageSize}
                  </SegmentButton>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
              >
                Restaurar padrão
              </Button>
            </div>
          </div>
        </AppCard>
      </div>
    </AppPage>
  );
}

type SegmentButtonProps = {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
};

function SegmentButton({
  active,
  children,
  onClick,
}: SegmentButtonProps) {
  return (
    <Button
      type="button"
      variant={active ? "default" : "outline"}
      className={cn(
        "min-w-24",
        active && "shadow-none",
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
