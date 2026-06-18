//src/schemas/empresa/empresa-form.schema.ts

import { z } from "zod";

export const empresaFormSchema = z.object({
  companyName: z.string().min(3, "Razão social inválida"),
  tradingName: z.string().min(2, "Nome fantasia inválido"),
  documentNumber: z.string().min(11, "Documento inválido"),
});

export type EmpresaFormData = z.infer<typeof empresaFormSchema>;
