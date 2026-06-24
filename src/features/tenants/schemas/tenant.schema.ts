//src\features\tenants\schemas\tenant.schema.ts
import { z } from "zod";

export const tenantFormSchema = z.object({
  companyName: z.string().min(3, "Razão social inválida"),
  tradingName: z.string().min(2, "Nome fantasia inválido"),
  documentNumber: z.string().min(5, "Documento inválido"),
});

export type TenantFormData = z.infer<typeof tenantFormSchema>;
