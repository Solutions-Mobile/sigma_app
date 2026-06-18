
# CONTEXTO CONSOLIDADO — SIGMA APP — CONTINUAÇÃO FASE 03

## Objetivo Atual

Continuar a Fase 03 do frontend enterprise do projeto Sigma App.

O projeto já possui:
- bootstrap concluído
- infraestrutura concluída
- auth foundation funcional
- React Query funcional
- formulários base
- DataTable profissional
- persistência sessão
- refresh token funcional aparente

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

# Convenções Obrigatórias

## Código

- abordagem enterprise
- clean code
- sem abstrações excessivas
- sem ORM
- services desacoplados
- hooks desacoplados
- DTOs tipados
- query hooks separados de mutation hooks

---

## TypeScript

Projeto utiliza:

```json
"verbatimModuleSyntax": true
```

Portanto:
- usar `import type`
- ou `import { type X }`

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

# Variáveis Ambiente

## `.env`

```env
VITE_API_URL=http://localhost:3000/sf/v1
```

---

# Backend

## Porta

```txt
3000
```

---

# Prefixo Global API

```txt
/sf/v1
```

---

# Auth Foundation

## Funcionando

- login
- persistência sessão
- interceptors
- refresh token
- logout
- restore session

---

# Fluxo Atual

```txt
login
↓
accessToken localStorage
refreshToken cookie httpOnly
↓
401
↓
/auth/refresh
↓
novo token
↓
retry request original
```

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

# Backend CORS

Obrigatório:

```ts
cors({
  origin: "http://localhost:5173",
  credentials: true,
})
```

---

# React Query

## Implementado

- QueryClient
- cache
- staleTime
- hooks desacoplados
- mutations
- invalidação cache

---

# CRUD Atual

## Endpoint real

```txt
GET /sf/v1/tenants
```

---

# DTO Atual

```ts
export type EmpresaDTO = {
  id: string;
  companyName: string;
  documentNumber: string;
  tradingName: string;
};
```

---

# Form Foundation

## Implementado

- RHF
- Zod
- FormInput
- FormError
- FormActions
- LoadingButton

---

# DataTable

## Implementado

- TanStack Table
- sorting
- loading
- empty state
- row actions
- custom render

---

# Problema já resolvido

## Cabeçalho exibindo JS/object

Correção:
- `context.header`
- `meta: column.label`

---

# Warning Atual

## React Compiler

Warning com:
- `useReactTable`

Pode ignorar temporariamente.

---

# Arquivos Estruturais Importantes

## HTTP

```txt
src/services/http/
├── http-client.ts
├── http-interceptors.ts
├── token-service.ts
└── http-types.ts
```

---

## Auth

```txt
src/services/auth/
src/contexts/auth/
```

---

## React Query

```txt
src/lib/react-query/
```

---

## DataTable

```txt
src/components/data-table/
```

---

# Problemas Já Resolvidos

## Tailwind

Resolvido:
- tailwind.config.ts
- postcss.config.js
- autoprefixer
- directives

---

## Login inválido recorrente

Causa:
- refresh/logout/cookies

Corrigido:
- withCredentials
- cookies
- logout defensivo
- restore session

---

## Logout backend

Erro:

```txt
Hash.update(undefined)
```

Corrigido:
- validação refreshToken undefined

---

# Estado Atual Considerado Estável

- login
- refresh
- persistência sessão
- React Query
- DataTable
- formulários
- create empresa
- roteamento
- tema

---

# Pendências Restantes da Fase 03

## Alta prioridade

- toast system
- dialogs
- confirm modal
- CRUD edit
- CRUD delete
- paginação server-side
- filtros
- skeleton loading
- error boundary

---

## Média prioridade

- upload foundation
- debounce search
- feature-first organization
- telemetry
- loading overlays

---

## Finalização

- testes
- lint final
- husky
- CI
- quality gates

---

# Próxima Recomendação

Continuar com:
1. UX foundation
2. Toast system
3. Confirm dialogs
4. CRUD edit/delete
5. Paginação server-side
6. filtros avançados

---

# Observações Importantes

## Backend

Evitar misturar:
- ApiResponse wrapper
- DTO direto

Padronizar respostas.

---

## React Query

Usar:
- query hooks separados
- mutation hooks separados

---

## Frontend

Manter:
- services desacoplados
- forms reutilizáveis
- DataTable genérica
- componentes enterprise
