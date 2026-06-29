import type { Permission } from "@/types/auth/profilePermissionsTypes";

export type AppRoute = {
  path: string;
  title: string;
  permission?: Permission;
};
