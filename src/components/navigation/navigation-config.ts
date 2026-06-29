import type { Permission } from "@/types/auth/profilePermissionsTypes";
import {  Building2,  FileBarChart2,  LayoutDashboard,  Settings,  Wallet /*CreditCard,  Shield,  Users,*/,} from "lucide-react";

export type NavigationItem = {
  label: string;
  path?: string;
  icon?: React.ElementType;
  permission?: Permission;
  children?: NavigationItem[];
};

export const navigationConfig: NavigationItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    permission: "dashboard:view",
  },

  {
    label: "Cadastros",
    icon: Building2,

    children: [
      {
        label: "Empresas",
        path: "/cadastros/empresas",
        permission: "empresas:view",
      },

      {
        label: "Usuários",
        path: "/cadastros/usuarios",
        permission: "usuarios:view",
      },

      {
        label: "Perfis",
        path: "/cadastros/perfis",
        permission: "perfis:view",
      },
    ],
  },

  {
    label: "Movimentação",
    icon: Wallet,

    children: [
      {
        label: "Contas",
        path: "/movimentacao/contas",
        permission: "contas:view",
      },

      {
        label: "Recebimentos",
        path: "/movimentacao/recebimentos",
        permission: "recebimentos:view",
      },

      {
        label: "Pagamentos",
        path: "/movimentacao/pagamentos",
        permission: "pagamentos:view",
      },
    ],
  },

  {
    label: "Relatórios",
    path: "/relatorios",
    icon: FileBarChart2,
    permission: "relatorios:view",
  },

  {
    label: "Configurações",
    path: "/configuracoes",
    icon: Settings,
    permission: "configuracoes:view",
  },
];
