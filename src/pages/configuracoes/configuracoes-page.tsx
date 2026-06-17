import { AppPage } from "@/components/app/app-page";

import { EmptyState } from "@/components/data-display/empty-state";

export function ConfiguracoesPage() {
  return (
    <AppPage>
      <EmptyState
        title="Nenhuma configuração disponível"
        description="As configurações aparecerão aqui."
      />
    </AppPage>
  );
}
