````md
# Resumo Completo — Correções Fase 03

## Contexto Inicial

Após as implementações da Fase 03, ocorreram regressões na feature de Empresas.

### Sintomas principais

- tabela sem dados;
- Authorization não enviado ao backend;
- campo search desaparecendo;
- actions renderizando sem funcionar;
- sort deixando de funcionar.

---

# Problema Principal Identificado

O frontend deixou de enviar:

```txt
Authorization: Bearer <token>
````

No backend:

```ts
const authHeader = req.headers.authorization;

console.log("authHeader:", authHeader);
```

Resultado:

```txt
authHeader: undefined
```

---

# Diagnóstico Técnico

## Problema 1 — Axios sem interceptor

Arquivo:

```txt
src/lib/axios/api.ts
```

A instância Axios era criada sem registrar interceptors.

---

## Problema 2 — Dependência circular

Entre:

```txt
src/lib/axios/api.ts
src/lib/axios/interceptors.ts
```

Fluxo quebrado:

```txt
api.ts
 -> importa interceptors.ts

interceptors.ts
 -> importa api.ts
```

Resultado:

* bootstrap parcial;
* interceptor não registrado corretamente;
* Authorization ausente.

---

## Problema 3 — empresa-service usando client errado

Arquivo:

```txt
src/services/empresas/empresa-service.ts
```

Estava usando:

```ts
httpClient
```

Sem interceptor.

Resultado:

```txt
401 Unauthorized
```

---

## Problema 4 — Contrato do DataTable quebrado

O DataTable original esperava:

```ts
render(value, row)
```

Mas foi alterado incorretamente para:

```ts
render(row, row)
```

Resultado:

* render quebrado;
* sort quebrado;
* actions quebradas.

---

## Problema 5 — DOM inválido

Arquivo:

```txt
src/components/data-table/data-table-loading.tsx
```

Possuía:

```tsx
<tbody>
```

Mesmo já existindo:

```tsx
<TableBody>
```

na tabela principal.

Resultado:

* DOM inválido;
* render interrompido;
* search desaparecendo.

---

# Correções Aplicadas

## Axios / Auth

### api.ts

* registro correto de interceptors;
* setupInterceptors(api).

---

### interceptors.ts

* remoção da dependência circular;
* tipagem correta;
* refresh token estabilizado;
* retry request estabilizado.

---

### empresa-service.ts

Migração de:

```ts
httpClient
```

para:

```ts
api
```

com interceptor.

---

# React Query

Implementado:

```ts
placeholderData: keepPreviousData
```

Benefícios:

* evita flicker;
* mantém cache durante paginação;
* UX mais estável.

---

# Debounce

Implementado:

```ts
useDebounce()
```

Benefícios:

* reduz chamadas HTTP;
* evita spam de requests.

---

# URL Sync

Implementado:

```txt
?page=1&search=abc
```

Benefícios:

* persistência da navegação;
* refresh consistente;
* deep-linking.

---

# Error Boundary

Implementado:

* fallback global;
* retry visual;
* isolamento de erro React.

---

# DataTable

Refatorações:

* loading separado;
* empty state separado;
* paginação separada;
* search separado.

Arquivos:

```txt
data-table-loading.tsx
data-table-empty.tsx
data-table-pagination.tsx
data-table-search.tsx
```

---

# Arquivos Alterados

## Axios

```txt
src/lib/axios/api.ts
src/lib/axios/interceptors.ts
```

---

## Serviços

```txt
src/services/empresas/empresa-service.ts
```

---

## React Query

```txt
src/hooks/queries/use-empresas-query.ts
```

---

## Hooks

```txt
src/hooks/use-url-pagination.ts
src/hooks/use-debounce.ts
```

---

## Error Boundary

```txt
src/components/error-boundary/error-boundary.tsx
src/components/error-boundary/error-fallback.tsx
```

---

## DataTable

```txt
src/components/data-table/data-table.tsx
src/components/data-table/data-table-loading.tsx
src/components/data-table/data-table-empty.tsx
src/components/data-table/data-table-pagination.tsx
src/components/data-table/data-table-search.tsx
```

---

## Empresas

```txt
src/pages/cadastros/empresas/empresa-list-page.tsx
```

---

# Estado Atual

## Resolvido

### Auth

* Authorization funcionando;
* interceptor funcionando;
* refresh token funcionando.

---

### Backend

Agora recebe:

```txt
Authorization: Bearer eyJ...
```

---

### React Query

* estabilizado;
* paginação funcionando;
* loading funcionando.

---

### Tabela

* render básico funcionando;
* dados carregando novamente.

---

# Problemas Ainda Existentes

## 1. Search não aparece

Mesmo após correções.

Provável causa:

* regressão estrutural da feature Empresas;
* toolbar original removida.

---

## 2. Sort deixou de funcionar

O contrato original do DataTable foi parcialmente perdido durante refactor.

---

## 3. Actions renderizam mas não executam

Atualmente:

```ts
onEdit: console.log
onDelete: console.log
```

Os handlers reais foram perdidos.

---

# Diagnóstico Consolidado

## O problema atual NÃO é mais:

* auth;
* interceptor;
* backend;
* React Query.

---

## O problema atual é:

Regressão arquitetural da feature Empresas.

---

# Causa Raiz

A implementação enterprise substituiu parcialmente a estrutura original da feature.

A versão anterior possuía:

* sorting;
* toolbar;
* actions reais;
* callbacks reais;
* integração visual;
* fluxo completo da feature.

Parte desses contratos foi simplificada durante o refactor.

---

# Próxima Etapa Recomendada

Restaurar a arquitetura original da feature Empresas mantendo:

## Manter

* interceptor corrigido;
* auth corrigido;
* React Query;
* paginação server-side;
* debounce;
* URL sync.

---

## Restaurar

* toolbar original;
* search original;
* sort original;
* actions reais;
* dialogs/modais;
* callbacks reais.

---

# Estado Técnico Estimado

## Infraestrutura

```txt
95%
```

---

## Feature Empresas

```txt
70% ~ 80%
```

Devido às regressões funcionais atuais.

```
```
