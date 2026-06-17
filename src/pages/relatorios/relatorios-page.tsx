import { AppPage } from "@/components/app/app-page";

import { EmptyState } from "@/components/data-display/empty-state";

export function RelatoriosPage() {
  return (
    <AppPage>
      <EmptyState
        title="Nenhum relatório disponível"
        description="Os relatórios aparecerão aqui."
      />
    </AppPage>
  );
}
