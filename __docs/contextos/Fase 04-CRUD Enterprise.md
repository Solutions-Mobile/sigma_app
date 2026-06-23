````md id="ry0x1w"
# CONTEXTO — Financeiro JS FE
## Estado Atual Consolidado — Pós Estabilização Fase 03

---

# Projeto

Frontend Web:
- React
- TypeScript
- Vite
- React Query
- Axios
- shadcn/ui
- TailwindCSS
- React Router

Objetivo:
Sistema financeiro enterprise modular.

---

# Diretrizes Arquiteturais

## Backend
- arquitetura modular;
- sem ORM;
- queries parametrizadas;
- REST API;
- JWT auth;
- refresh token.

---

## Frontend
- arquitetura modular;
- clean code;
- componentes reutilizáveis;
- React Query;
- sem abstrações prematuras;
- foundation enterprise progressiva.

---

# Estrutura Arquitetural Atual

## Consolidado

### Auth
✅ concluído

- login;
- logout;
- refresh token;
- auth guards;
- session restore;
- interceptor Axios;
- protected routes.

---

### Layouts
✅ concluído

- AuthLayout;
- AppLayout;
- Header;
- Toolbar;
- Sidebar foundation.

---

### Routing
✅ concluído

- React Router;
- rotas protegidas;
- páginas:
  - 403
  - 404

---

### PWA
✅ concluído

- manifest;
- service worker;
- installable app;
- ícone Sigma.

---

### React Query
✅ consolidado

Implementado:
- keepPreviousData;
- cache;
- staleTime;
- gcTime;
- retry.

---

### Error Handling
✅ consolidado

- ErrorBoundary global;
- fallback UI;
- retry visual.

---

### Axios
✅ consolidado

Problema crítico corrigido:
- Authorization não enviado.

Causa:
- interceptor não registrado;
- dependência circular entre:
  - api.ts
  - interceptors.ts

Situação atual:
✅ resolvido.

---

# Estrutura DataTable

## Estado Atual
✅ consolidado parcialmente enterprise

---

## Recursos funcionando

### Listagem
✅

---

### Paginação server-side
✅

Contrato:

```txt
?page=1&limit=10
````

---

### Search

✅ restaurado

Contrato:

```txt
?search=abc
```

---

### Sort

✅ restaurado

---

### Loading Skeleton

✅

---

### Empty State

✅

---

### URL Sync

✅

Exemplo:

```txt
/empresas?page=2&search=abc
```

---

### React Query Integration

✅

---

# Feature Empresas

## Estado Atual

🟡 parcialmente consolidada

---

# Funcionando

## Listagem

✅

---

## Paginação

✅

---

## Search

✅

---

## Sort

✅

---

## Toolbar

✅

---

## Authorization

✅

Backend recebe:

```txt
Authorization: Bearer eyJ...
```

---

# Pendente

## CRUD real

Ainda NÃO implementado:

### Create

❌

---

### Update

❌

---

### Delete

❌

---

### Dialogs reais

❌

---

### Mutations refinadas

❌

---

### Invalidations refinadas

❌

---

# Problemas Técnicos Importantes Corrigidos

---

## 1. Authorization undefined

Backend:

```ts
const authHeader =
  req.headers.authorization;
```

Retornava:

```txt
undefined
```

---

## Correção

### api.ts

```ts
setupInterceptors(api)
```

---

### interceptors.ts

Refatorado:

* removida dependência circular;
* setup tipado corretamente.

---

### empresa-service.ts

Migração:

```ts
httpClient
```

→

```ts
api
```

com interceptor.

---

# 2. DataTable quebrado

Problema:
Contrato de render incorreto.

Errado:

```ts
render(row, row)
```

Correto:

```ts
render(value, row)
```

---

# 3. DOM inválido

Problema:
`tbody` duplicado em:

```txt
data-table-loading.tsx
```

Corrigido.

---

# Estado Técnico Consolidado

## Infraestrutura FE

```txt
~95% a 97%
```

---

## Feature Empresas

```txt
~85% a 90%
```

---

# Próxima Fase

# Fase 04 — CRUD Enterprise

Objetivo:
transformar Empresas no blueprint definitivo dos CRUDs.

---

# Escopo Inicial da Fase 04

## Forms Foundation

Estrutura esperada:

```txt
src/components/forms
```

---

## React Hook Form + Zod

Padronização:

* validação;
* schemas;
* typing;
* error handling.

---

## Mutations

Criar:

```txt
use-create-empresa.ts
use-update-empresa.ts
use-delete-empresa.ts
```

---

## Dialogs

Implementar:

* confirm delete;
* form dialog;
* async dialog.

---

## UX

Padronizar:

* loading submit;
* disable submit;
* toast;
* retry;
* optimistic UX.

---

## Dirty State Guard

Implementar:

* beforeunload;
* route blocking;
* form dirty detection.

---

# Objetivo Arquitetural da Fase 04

Transformar CRUD em:

* estrutura reutilizável;
* altamente padronizada;
* baixa repetição;
* foundation enterprise escalável.

---

# Resultado Esperado Pós Fase 04

Nova entidade deverá exigir apenas:

```txt
DTO
Schema
Service
Columns
FormFields
```

Todo restante já estará pronto:

* DataTable;
* dialogs;
* forms;
* mutations;
* loading;
* pagination;
* search;
* invalidation;
* toasts;
* validation.

---

# Regras do Projeto

## Sempre gerar:

* arquivos completos;
* path completo;
* indicar:

  * "Substitua por esta estrutura"

quando necessário.

---

## Não utilizar

* ORM;
* abstrações excessivas;
* frameworks extras sem autorização.

---

## Prioridades

1. funcionalidade;
2. estabilidade;
3. clean code;
4. escalabilidade progressiva.

---

# Observação Importante

Qualquer alteração que implique mudanças no backend:
❌ deve ser adiada para o futuro.

O frontend deve:

* adaptar-se ao backend atual;
* preservar contratos existentes.

```
```
