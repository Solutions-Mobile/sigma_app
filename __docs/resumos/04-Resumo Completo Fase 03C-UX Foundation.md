
# SIGMA APP — FRONTEND ENTERPRISE
# RESUMO COMPLETO — FASE 03C

## Estado Atual do Projeto

Projeto frontend enterprise em React + TypeScript.

Stack atual:

- React
- TypeScript
- Vite
- React Router
- Axios
- React Query
- React Hook Form
- Zod
- TailwindCSS
- shadcn/ui
- TanStack Table

Backend:

- Node.js
- Prefixo global:
  /sf/v1

Base URL:

```env
VITE_API_URL=http://localhost:3000/sf/v1
```

---

# Estrutura Atual

```txt
src/
├── app/
├── components/
├── contexts/
├── hooks/
├── layouts/
├── lib/
├── pages/
├── schemas/
├── services/
├── types/
└── components/data-table/
```

---

# Convenções Consolidadas

## TypeScript

Projeto usa:

```json
"verbatimModuleSyntax": true
```

Portanto:

- usar `import type`
- ou `import { type X }`

---

# Padrões Arquiteturais Consolidados

## Hooks

Estrutura atual:

```txt
src/hooks/
├── mutations/
└── queries/
```

Exemplos:

```txt
use-create-empresa.ts
use-update-empresa.ts
use-delete-empresa.ts
use-empresas-query.ts
```

---

## Services

Estrutura consolidada:

```txt
src/services/empresas/
├── empresa-service.ts
└── dtos/
```

Padrão adotado:

- service orientado a objeto
- ApiResponse wrapper
- DTOs separados
- desacoplado dos hooks

---

# Service Atual Consolidado

## `src/services/empresas/empresa-service.ts`

Implementados:

- findAll()
- create()
- update()
- delete()

Endpoints:

```txt
GET /tenants
POST /tenants
PUT /tenants/:id
DELETE /tenants/:id
```

Padrão:

```ts
ApiResponse<T>
```

---

# DTOs Consolidados

## EmpresaDTO

```ts
export type EmpresaDTO = {
  id: string;
  companyName: string;
  tradingName: string;
  documentNumber: string;
};
```

---

## CreateEmpresaDTO

Já existente no projeto.

---

## UpdateEmpresaDTO

Criado:

```ts
export type UpdateEmpresaDTO = {
  companyName: string;
  tradingName: string;
  documentNumber: string;
};
```

---

# React Query

## Queries

### `use-empresas-query.ts`

Implementado:

```ts
useQuery({
  queryKey: ["empresas"],
  queryFn: empresaService.findAll
})
```

---

## Mutations

Implementados:

- useCreateEmpresa
- useUpdateEmpresa
- useDeleteEmpresa

Todos com:

- invalidateQueries
- toast success/error
- loading state

---

# Toast System

Biblioteca adotada:

```bash
npm install sonner
```

---

## Estrutura

```txt
src/
├── components/ui/toaster.tsx
└── lib/toast/toast.ts
```

---

## Providers

Toaster registrado globalmente.

---

## appToast

Implementado:

- success
- error
- warning
- info
- loading
- dismiss

---

# Confirm Dialog

Implementado:

```txt
src/components/dialogs/confirm-dialog.tsx
```

Baseado em:

```txt
shadcn/ui alert-dialog
```

Uso:

- delete
- ações destrutivas

---

# CRUD Empresas

## Estrutura Consolidada

```txt
src/pages/cadastros/empresas/
├── components/
│   └── empresa-form-dialog.tsx
│
├── empresa-columns.tsx
├── empresa-list-page.tsx
└── empresa-table-actions.tsx
```

---

# Empresa Columns

IMPORTANTE:

DataTable NÃO usa:

```ts
ColumnDef
```

O DataTable possui API própria:

```ts
DataTableColumn<T>
```

Formato correto:

```ts
{
  key,
  label,
  render
}
```

---

## Erro Resolvido

Erro:

```txt
ColumnDef<EmpresaDTO>[] não atribuível a DataTableColumn<EmpresaDTO>[]
```

Causa:

- tentativa de usar TanStack puro
- DataTable usa wrapper customizado

Correção:

- usar key
- usar label
- usar render

---

# Empresa Table Actions

Implementado:

```txt
empresa-table-actions.tsx
```

Com:

- DropdownMenu
- Editar
- Excluir

Uso correto:

```tsx
onSelect
```

ao invés de:

```tsx
onClick
```

por causa do comportamento do Radix UI.

---

# Empresa List Page

Implementado:

- DataTable
- delete dialog
- edit dialog
- mutations
- states

Estados:

```ts
selectedEmpresaDelete
selectedEmpresaEdit
```

---

# Edit Dialog

Implementado:

```txt
components/empresa-form-dialog.tsx
```

Recursos:

- RHF
- Zod
- reset automático
- loading state
- validação
- modal edit

---

# Schema Consolidado

Já existia:

```txt
src/schemas/empresa/empresa-form.schema.ts
```

Portanto:

- NÃO criar empresa-schema.ts
- reutilizar schema atual

---

## Schema Atual

```ts
export const empresaFormSchema = z.object({
  companyName: z.string().min(3),
  tradingName: z.string().min(2),
  documentNumber: z.string().min(11),
});
```

---

## Tipo Inferido

```ts
export type EmpresaFormData =
  z.infer<typeof empresaFormSchema>;
```

Explicado:

- evita duplicação
- sincroniza schema + type

---

# Fluxo Atual CRUD

## Delete

```txt
row action
↓
confirm dialog
↓
mutation
↓
toast
↓
invalidateQueries
↓
reload tabela
```

---

## Edit

```txt
row action
↓
dialog
↓
RHF + Zod
↓
mutation
↓
toast
↓
invalidateQueries
↓
reload tabela
```

---

# Estado Atual da Fase 03

## Concluído

- bootstrap
- auth
- persistência sessão
- refresh token
- interceptors
- React Query
- DataTable
- formulários RHF + Zod
- create
- update
- delete
- toast system
- confirm dialog
- dialogs
- tema
- roteamento

---

# Pendências Restantes da Fase 03

## Alta prioridade

### Paginação server-side

Necessário:

- page
- limit
- total
- totalPages
- integração React Query
- integração DataTable

---

### Filtros

Necessário:

- busca textual
- debounce
- filtros combinados
- query params

---

### Error Boundary

Necessário:

- fallback UI
- boundary global
- tratamento de crash

---

### Skeleton Loading

Necessário:

- skeleton rows
- UX loading profissional

---

# Itens Menos Prioritários

Pode ficar para próximas fases:

- upload foundation
- telemetry
- feature-first hardening
- CI
- husky
- quality gates

---

# Estado Geral

## Percentual aproximado

```txt
~75% da Fase 03 concluída
```

---

# Próxima Ordem Recomendada

```txt
1. Paginação server-side
2. Filtros
3. Skeleton loading
4. Error boundary
5. Cleanup final
```

Porque:

- paginação e filtros impactam arquitetura da tabela
- demais são complementares

---

# Observações Arquiteturais Importantes

## DataTable

Projeto possui wrapper próprio.

Não usar diretamente:

```ts
ColumnDef
```

sem adaptar.

---

## Hooks

Separação consolidada:

```txt
queries/
mutations/
```

---

## Services

Padrão consolidado:

```txt
empresaService.findAll()
empresaService.create()
empresaService.update()
empresaService.delete()
```

---

# Estrutura Recomendada Atual

```txt
src/
├── hooks/
│   ├── mutations/
│   └── queries/
│
├── pages/
│   └── cadastros/
│       └── empresas/
│
├── services/
│   └── empresas/
│
├── schemas/
│   └── empresa/
│
├── lib/
│   └── toast/
│
└── components/
    ├── dialogs/
    ├── data-table/
    └── ui/
```
