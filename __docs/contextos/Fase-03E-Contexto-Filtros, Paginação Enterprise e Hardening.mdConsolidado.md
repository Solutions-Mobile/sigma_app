# CONTEXTO CONSOLIDADO — SIGMA APP FRONTEND
# FASE 03E — FILTROS, PAGINAÇÃO ENTERPRISE E HARDENING

## Objetivo

Continuar a evolução da Fase 03 do frontend enterprise do Sigma App.

O projeto já possui:
- foundation consolidada
- auth estável
- CRUD funcional
- React Query estruturado
- paginação server-side funcional

O foco agora é:
- refinamento enterprise da DataTable
- filtros
- debounce
- UX
- hardening da camada de listagem

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
- TanStack Table (via wrapper próprio)

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

# Estrutura Atual Consolidada

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

# Observação Arquitetural

Foi identificada coexistência parcial entre:

```txt
src/app/router
src/routes
```

Recomendação consolidada:

- manter:
  
```txt
src/app/router
```

- remover:
  
```txt
src/routes
```

Objetivo:
- evitar drift arquitetural
- evitar duplicidade
- evitar inconsistência futura

---

# Hooks — Estrutura Consolidada

```txt
src/hooks/
├── mutations/
└── queries/
```

Hooks legados em:

```txt
src/hooks/api
```

foram considerados obsoletos.

---

# React Query — Estado Atual

## Consolidado

- QueryClient
- mutations
- cache
- invalidateQueries
- hooks desacoplados
- query keys parametrizadas

---

# Paginação Server-side

## Implementada

Estrutura de retorno:

```json
{
  "data": [],
  "page": 1,
  "limit": 10,
  "totalRecords": 100,
  "totalPages": 10
}
```

---

# Tipos Compartilhados

## Arquivo

```txt
src/types/api/paginated-response.ts
```

```ts
export type PaginatedResponse<T> = {
  data: T[];
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
};
```

---

## Arquivo

```txt
src/types/api/pagination-params.ts
```

```ts
export type PaginationParams = {
  page?: number;
  limit?: number;
  search?: string;
};
```

---

# DTO de Paginação

## Arquivo

```txt
src/services/empresas/dtos/find-empresas-params.dto.ts
```

```ts
export type FindEmpresasParamsDTO =
  PaginationParams;
```

---

# Empresa Service — Estado Atual

## Arquivo

```txt
src/services/empresas/empresa-service.ts
```

## Método atual

```ts
findAll(params)
```

## Estrutura

```ts
Promise<PaginatedResponse<EmpresaDTO>>
```

## Query params

```txt
GET /tenants?page=1&limit=10&search=abc
```

---

# React Query — Empresas

## Arquivo

```txt
src/hooks/queries/use-empresas-query.ts
```

## Estrutura atual

```ts
queryKey: ["empresas", params]
```

Objetivo:
- cache por página
- refetch correto
- suporte a filtros
- suporte a debounce

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

Formato:

```ts
{
  key,
  label,
  render
}
```

---

# Componentes DataTable Existentes

```txt
src/components/data-table/
├── data-table-actions.tsx
├── data-table-empty.tsx
├── data-table-header.tsx
├── data-table-loading.tsx
├── data-table-pagination.tsx
├── data-table-search.tsx
├── data-table-types.ts
└── data-table.tsx
```

---

# Empresas — Estado Atual

## Arquivos principais

```txt
src/pages/cadastros/empresas/
├── components/
│   └── empresa-form-dialog.tsx
│
├── empresa-columns.tsx
├── empresa-list-page.tsx
├── empresa-table-actions.tsx
└── empresas-page.tsx
```

---

# empresa-list-page.tsx

## Consolidado

- paginação funcional
- loading refinado
- integração React Query
- integração DataTable
- mutations estáveis

## Estados atuais

```ts
page
limit
search
```

---

# empresas-page.tsx

## Corrigido

Problemas resolvidos:

- hook legado removido
- tipagem incompatível resolvida
- DataTable recebendo response.data
- integração React Query correta

---

# Loading Atual

## Implementado

```tsx
<DataTableLoading />
```

Ainda faltando:
- skeleton rows reais
- preserve layout
- menos flicker

---

# keepPreviousData

Ainda NÃO implementado.

Próxima melhoria recomendada:

```ts
placeholderData: keepPreviousData
```

Objetivo:
- preservar dados anteriores
- evitar flicker
- UX enterprise

---

# Search/Filtros

Ainda NÃO implementado.

Próxima etapa prioritária.

Necessário:

- input search
- debounce
- reset page
- query params
- integração React Query

---

# Toast System

## Biblioteca

```bash
npm install sonner
```

## Estrutura

```txt
src/
├── components/ui/toaster.tsx
└── lib/toast/toast.ts
```

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

# CRUD Empresas — Consolidado

## Funcional

- create
- update
- delete
- list
- paginação

---

# Fluxos Estáveis

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

# Estado Técnico Atual

## Estimativa

```txt
~84% a 88% da Fase 03 concluída
```

---

# Estado Arquitetural

Projeto atualmente:

- modular
- desacoplado
- sustentável
- enterprise-ready
- sem dívida técnica crítica

---

# Risco Técnico Atual

## Baixo

Porque:

- foundations corretas
- separação clara
- React Query corretamente aplicado
- sem abstrações prematuras
- sem overengineering

---

# Pendências Restantes da Fase 03

## Alta prioridade

### 1. DataTablePagination reutilizável

Hoje:
- paginação inline

Ideal:
- componente reutilizável

---

### 2. Search/Filtros

Necessário:

- busca textual
- debounce
- reset page
- query params

---

### 3. keepPreviousData

Melhoria UX React Query.

---

### 4. Skeleton loading refinado

Necessário:

- skeleton rows
- preserve layout
- evitar layout shift

---

### 5. Error Boundary

Ainda ausente:

- boundary global
- fallback UI
- reset boundary

---

# Itens Posteriores

Podem ficar para próximas fases:

- upload foundation
- telemetry
- husky
- CI
- quality gates
- observabilidade
- hardening avançado

---

# Próxima Ordem Recomendada

```txt
1. DataTablePagination component
2. Search + debounce
3. keepPreviousData
4. Skeleton rows
5. Error Boundary
6. URL sync (?page=2)
```

---

# Regras Importantes para Próximos Chats

## Antes de sugerir novos arquivos

VALIDAR:
- estrutura existente
- wrappers próprios
- nomenclatura consolidada
- arquitetura atual

---

## NÃO criar estruturas paralelas

Evitar:

- empresa/ vs empresas/
- hooks duplicados
- services alternativos
- DataTable TanStack pura

---

## Sempre respeitar

- wrapper próprio DataTable
- React Query centralizada
- tipagem forte
- queryKey parametrizada
- arquitetura modular atual

---

# Conclusão

A foundation da Fase 03 está praticamente consolidada.

O frontend já possui:

- auth madura
- CRUD estável
- React Query corretamente estruturado
- paginação server-side funcional
- arquitetura sustentável
- foundation enterprise consistente

O restante da fase é majoritariamente:
- refinamento UX
- hardening
- reutilização
- estabilidade visual
