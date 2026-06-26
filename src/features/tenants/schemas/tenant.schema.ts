import { z } from "zod";

export const tenantSchema = z.object({
  companyName: z
    .string()
    .min(3, "Informe a razão social"),

  tradingName: z
    .string()
    .min(3, "Informe o nome fantasia"),

  documentNumber: z
    .string()
    .min(11, "Documento inválido"),

  isActive: z.boolean(),
});

export type TenantFormData =
  z.infer<typeof tenantSchema>;
  