import type { AppRoute } from "@/types/router/app-route";

export const routeConfig: AppRoute[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    permission: "dashboard:view",
  },

  {
    path: "/cadastros/empresas",
    title: "Empresas",
    permission: "empresas:view",
  },

  {
    path: "/cadastros/usuarios",
    title: "Usuários",
    permission: "usuarios:view",
  },

  {
    path: "/cadastros/perfis",
    title: "Perfis",
    permission: "perfis:view",
  },

  {
    path: "/movimentacao/contas",
    title: "Contas",
    permission: "contas:view",
  },

  {
    path: "/movimentacao/recebimentos",
    title: "Recebimentos",
    permission: "recebimentos:view",
  },

  {
    path: "/movimentacao/pagamentos",
    title: "Pagamentos",
    permission: "pagamentos:view",
  },

  {
    path: "/relatorios",
    title: "Relatórios",
    permission: "relatorios:view",
  },

  {
    path: "/configuracoes",
    title: "Configurações",
    permission: "configuracoes:view",
  },
];
