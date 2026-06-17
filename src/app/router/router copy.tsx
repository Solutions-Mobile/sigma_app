import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/layouts/app-layout";
import { AuthLayout } from "@/layouts/auth-layout";
import { ProtectedRoute } from "@/routes/protected-route";
import { PublicRoute } from "@/routes/public-route";
import { LoginPage } from "@/pages/auth/login-page";
import { DashboardPage } from "@/pages/dashboard/dashboard-page";
import { EmpresasPage } from "@/pages/cadastros/empresas-page";
import { PerfisPage } from "@/pages/cadastros/perfis-page";
import { UsuariosPage } from "@/pages/cadastros/usuarios-page";
import { ConfiguracoesPage } from "@/pages/configuracoes/configuracoes-page";
import { ContasPage } from "@/pages/movimentacao/contas-page";
import { PagamentosPage } from "@/pages/movimentacao/pagamentos-page";
import { RecebimentosPage } from "@/pages/movimentacao/recebimentos-page";
import { RelatoriosPage } from "@/pages/relatorios/relatorios-page";
import { ForbiddenPage } from "@/pages/errors/forbidden-page";
import { NotFoundPage } from "@/pages/errors/not-found-page";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <PublicRoute>
              <AuthLayout />
            </PublicRoute>
          }
        >
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<DashboardPage />} />

          <Route
            path="/cadastros/empresas"
            element={<EmpresasPage />}
          />

          <Route
            path="/cadastros/usuarios"
            element={<UsuariosPage />}
          />

          <Route
            path="/cadastros/perfis"
            element={<PerfisPage />}
          />

          <Route
            path="/movimentacao/contas"
            element={<ContasPage />}
          />

          <Route
            path="/movimentacao/recebimentos"
            element={<RecebimentosPage />}
          />

          <Route
            path="/movimentacao/pagamentos"
            element={<PagamentosPage />}
          />

          <Route
            path="/relatorios"
            element={<RelatoriosPage />}
          />

          <Route
            path="/configuracoes"
            element={<ConfiguracoesPage />}
          />

          <Route path="/403" element={<ForbiddenPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
