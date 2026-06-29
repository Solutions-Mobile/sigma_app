import type { Permission, UserProfile } from "@/types/auth/profilePermissionsTypes";

const profilePermissions: Record<UserProfile, Permission[]> = {
  SYSTEM_ADMIN:[
    "dashboard:view",
    "empresas:view",
  ],
  
  OWNER:[
    "dashboard:view",

    "usuarios:view",
    "perfis:view",

    "contas:view",
    "recebimentos:view",
    "pagamentos:view",

    "relatorios:view",

    "configuracoes:view",

  ],
  
    ADMIN: [
    "dashboard:view",

    "usuarios:view",
    "perfis:view",

    "contas:view",
    "recebimentos:view",
    "pagamentos:view",

    "relatorios:view",

    "configuracoes:view",
  ],

  MANAGER: [
    "dashboard:view",

    "empresas:view",

    "contas:view",
    "recebimentos:view",
    "pagamentos:view",

    "relatorios:view",
  ],

  USER: [
    "dashboard:view", 
    "contas:view", 
    "recebimentos:view",
    "relatorios:view",
    "configuracoes:view",
  ],
};

function normalizeProfile(profile: string): UserProfile {
  const normalized = profile.replace("ROLE_", "").trim().toUpperCase();
  if (normalized === "SYSTEM_ADMIN" || normalized === "OWNER"|| normalized === "MANAGER") {
    return normalized;
  }

  return "USER";
}

export function hasPermission(profile: string, permission?: Permission) {
  if (!permission) {
    return true;
  }

  const normalizedProfile = normalizeProfile(profile);
  const permissions = profilePermissions[normalizedProfile] || [];

  return permissions.includes(permission);
}
