/*
export const tenantKeys = {
  all: ["tenants"] as const,

  lists: () => [...tenantKeys.all, "list"] as const,

  list: (params: Record<string, unknown>) =>
    [...tenantKeys.lists(), params] as const,

  details: () => [...tenantKeys.all, "detail"] as const,

  detail: (id: string) =>
    [...tenantKeys.details(), id] as const,
};
*/