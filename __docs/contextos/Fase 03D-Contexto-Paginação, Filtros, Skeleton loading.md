# CONTEXTO CONSOLIDADO — SIGMA APP FRONTEND
# FASE 03D — CONTINUAÇÃO

## Objetivo

Continuar a Fase 03 do frontend enterprise do Sigma App.

IMPORTANTE:
Este contexto foi ajustado para refletir SOMENTE a estrutura REAL já consolidada no projeto, evitando:
- nomenclaturas paralelas
- estruturas duplicadas
- arquivos alternativos
- exemplos incompatíveis com wrappers próprios

---

# Stack Atual

## Frontend

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

---

# Backend

## Prefixo global

```txt
/sf/v1
```

## URL

```env
VITE_API_URL=http://localhost:3000/sf/v1
```

---

# Convenções Obrigatórias

## TypeScript

Projeto usa:

```json
"verbatimModuleSyntax": true
```

Portanto:

```ts
import type { X }
```

ou:

```ts
import { type X }
```

---

# Estrutura REAL Atual

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

## Hooks

Estrutura consolidada:

```txt
src/hooks/
├── mutations/
└── queries/
```

Exemplos reais:

```txt
use-create-empresa.ts
use-update-empresa.ts
use-delete-empresa.ts
use-empresas-query.ts
```

---

## Services

Estrutura REAL:

```txt
src/services/empresas/
├── empresa-service.ts
└── dtos/
```

NÃO usar:

```txt
src/services/empresa/
```

---

## DTOs

Estrutura REAL:

```txt
src/services/empresas/dtos/
```

Arquivos atuais:

```txt
empresa.dto.ts
create-empresa.dto.ts
update-empresa.dto.ts
```

---

## Schemas

Estrutura REAL:

```txt
src/schemas/empresa/
```

Arquivo REAL:

```txt
empresa-form.schema.ts
```

NÃO criar:

```txt
empresa-schema.ts
```

---

## Pages

Estrutura REAL:

```txt
src/pages/cadastros/empresas/
```

---

# DataTable — MUITO IMPORTANTE

Projeto NÃO usa TanStack puro diretamente.

Existe wrapper próprio.

NÃO usar:

```ts
ColumnDef<T>
```

NÃO usar:

```ts
accessorKey
```

NÃO usar:

```ts
cell
```

---

# API Correta do DataTable

Projeto usa:

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

# Erro Já Resolvido

Erro ocorrido:

```txt
ColumnDef<EmpresaDTO>[] não atribuível a DataTableColumn<EmpresaDTO>[]
```

Causa:
- tentativa inicial de usar TanStack puro

Correção:
- usar wrapper próprio do projeto

---

# Auth Foundation

## Funcionando

- login
- refresh token
- restore session
- logout
- interceptors
- persistência sessão

---

# HTTP Client

## Arquivo

```txt
src/services/http/http-client.ts
```

## Configuração crítica

```ts
withCredentials: true
```

Necessário para:
- refresh token
- logout
- cookies

---

# React Query

## Consolidado

- QueryClient
- cache
- mutations
- invalidação
- hooks desacoplados

---

# Toast System

## Biblioteca

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

## Arquivo

```txt
src/components/dialogs/confirm-dialog.tsx
```

Baseado em:

```txt
shadcn/ui alert-dialog
```

---

# CRUD Empresas

## Estrutura Atual

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

# Service Consolidado

## Arquivo

```txt
src/services/empresas/empresa-service.ts
```

Métodos atuais:

```ts
empresaService.findAll()
empresaService.create()
empresaService.update()
empresaService.delete()
```

---

# Endpoints

```txt
GET /tenants
POST /tenants
PUT /tenants/:id
DELETE /tenants/:id
```

---

# ApiResponse

Projeto usa wrapper padronizado:

```ts
ApiResponse<T>
```

Evitar misturar:
- retorno direto
- retorno wrapped

---

# DTO Atual

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

# UpdateEmpresaDTO

```ts
export type UpdateEmpresaDTO = {
  companyName: string;
  tradingName: string;
  documentNumber: string;
};
```

---

# Query Atual

## Arquivo

```txt
src/hooks/queries/use-empresas-query.ts
```

Implementação:

```ts
useQuery({
  queryKey: ["empresas"],
  queryFn: empresaService.findAll
})
```

---

# Mutations

## Implementadas

```txt
useCreateEmpresa
useUpdateEmpresa
useDeleteEmpresa
```

Todas com:

- toast
- invalidateQueries
- loading state

---

# Empresa Columns

Implementação correta:

```ts
DataTableColumn<EmpresaDTO>[]
```

Formato:

```ts
{
  key,
  label,
  render
}
```

---

# Empresa Table Actions

Implementado:

- DropdownMenu
- Editar
- Excluir

IMPORTANTE:

Usar:

```tsx
onSelect
```

e NÃO:

```tsx
onClick
```

por causa do Radix UI.

---

# Form Dialog

## Arquivo

```txt
src/pages/cadastros/empresas/components/empresa-form-dialog.tsx
```

Recursos:

- RHF
- Zod
- reset automático
- loading state
- modal edit

---

# Schema Consolidado

## Arquivo REAL

```txt
src/schemas/empresa/empresa-form.schema.ts
```

Implementação atual:

```ts
export const empresaFormSchema = z.object({
  companyName: z.string().min(3),
  tradingName: z.string().min(2),
  documentNumber: z.string().min(11),
});
```

---

# Tipo Inferido

```ts
export type EmpresaFormData =
  z.infer<typeof empresaFormSchema>;
```

---

# Fluxo Atual

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

## Já concluído

- bootstrap
- auth foundation
- refresh token
- restore session
- React Query
- DataTable
- RHF + Zod
- CRUD create
- CRUD update
- CRUD delete
- toast system
- confirm dialog
- dialogs
- roteamento
- tema

---

# Pendências Restantes

## Alta prioridade

### Paginação server-side

Necessário:

- page
- limit
- total
- totalPages
- integração React Query
- integração DataTable

Impacta:
- arquitetura da tabela

---

### Filtros

Necessário:

- busca textual
- debounce
- filtros combinados
- query params

---

### Skeleton Loading

Necessário:

- skeleton rows
- UX loading profissional

---

### Error Boundary

Necessário:

- fallback UI
- boundary global
- tratamento de crash

---

# Itens Posteriores

Pode ficar para próximas fases:

- upload foundation
- telemetry
- husky
- CI
- quality gates
- feature-first hardening

---

# Percentual Atual

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

---

# REGRAS IMPORTANTES PARA PRÓXIMOS CHATS

## Antes de sugerir novos arquivos

VALIDAR:
- estrutura já existente
- nomenclatura consolidada
- wrappers próprios do projeto

---

## NÃO criar estruturas paralelas

Evitar:
- empresa/ vs empresas/
- schema flat alternativo
- hooks duplicados
- services alternativos

---

## Diferenciar

Sempre separar:
- exemplo conceitual
- implementação definitiva

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
