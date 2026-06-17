import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { AppLayout } from "@/layouts/app-layout";
import { AuthLayout } from "@/layouts/auth-layout";

import { ProtectedRoute } from "@/routes/protected-route";
import { PublicRoute } from "@/routes/public-route";

import { routeConfig } from "./route-config";

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

function getPermission(path: string) {
  return routeConfig.find(
    (route) => route.path === path
  )?.permission;
}

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <AuthLayout />
            </PublicRoute>
          }
        >
          <Route
            index
            element={<LoginPage />}
          />
        </Route>

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={
              <ProtectedRoute
                permission={getPermission(
                  "/dashboard"
                )}
              >
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="cadastros/empresas"
            element={
              <ProtectedRoute
                permission={getPermission(
                  "/cadastros/empresas"
                )}
              >
                <EmpresasPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="cadastros/usuarios"
            element={
              <ProtectedRoute
                permission={getPermission(
                  "/cadastros/usuarios"
                )}
              >
                <UsuariosPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="cadastros/perfis"
            element={
              <ProtectedRoute
                permission={getPermission(
                  "/cadastros/perfis"
                )}
              >
                <PerfisPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="movimentacao/contas"
            element={
              <ProtectedRoute
                permission={getPermission(
                  "/movimentacao/contas"
                )}
              >
                <ContasPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="movimentacao/recebimentos"
            element={
              <ProtectedRoute
                permission={getPermission(
                  "/movimentacao/recebimentos"
                )}
              >
                <RecebimentosPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="movimentacao/pagamentos"
            element={
              <ProtectedRoute
                permission={getPermission(
                  "/movimentacao/pagamentos"
                )}
              >
                <PagamentosPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="relatorios"
            element={
              <ProtectedRoute
                permission={getPermission(
                  "/relatorios"
                )}
              >
                <RelatoriosPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="configuracoes"
            element={
              <ProtectedRoute
                permission={getPermission(
                  "/configuracoes"
                )}
              >
                <ConfiguracoesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="403"
            element={<ForbiddenPage />}
          />
        </Route>

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}
