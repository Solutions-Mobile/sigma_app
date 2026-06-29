import { z } from "zod";

export const tenantSchema = z.object({
  companyName: z
    .string()
    .min(3, "Informe a razão social (3 caracteres ou mais)"),

  tradingName: z
    .string()
    .min(3, "Informe o nome fantasia (3 caracteres ou mais)"),

  documentNumber: z
    .string()
    .min(11, "Documento inválido (11 números ou mais)"),

  isActive: z.boolean(),
});

export type TenantFormData =
  z.infer<typeof tenantSchema>;
  