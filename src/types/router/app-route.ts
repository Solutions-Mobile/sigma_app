import type { Permission } from "@/types/auth/permission";

export type AppRoute = {
  path: string;
  title: string;
  permission?: Permission;
};
