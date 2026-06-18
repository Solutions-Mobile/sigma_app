# Roteiro de Estudo — Frontend Moderno (Baseado no Projeto Atual)

## Objetivo

Sair de uma visão “frontend como camada visual” para:

* arquitetura frontend moderna,
* aplicações SPA/PWA robustas,
* gerenciamento de estado,
* autenticação,
* cache,
* acessibilidade,
* design system,
* performance,
* DX (Developer Experience).

Foco no stack que apareceu no projeto.

---

# 1. Fundamentos do Ecossistema Moderno

## Estudar

### JavaScript moderno

* ES Modules
* async/await
* event loop
* closures
* destructuring
* spread/rest
* fetch API
* AbortController
* Proxy
* Map / Set
* generators

### TypeScript

* generics
* utility types
* discriminated unions
* mapped types
* keyof
* infer
* conditional types
* type narrowing
* declaration merging

## Objetivo prático

Você deve conseguir:

* tipar APIs complexas,
* criar hooks reutilizáveis,
* criar DTOs seguros,
* inferir tipos automaticamente.

## Material

* [TypeScript Official Docs](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)
* [MDN JavaScript Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript?utm_source=chatgpt.com)

---

# 2. React — Arquitetura Moderna

## Estudar

### Base

* JSX
* Virtual DOM
* reconciliation
* rendering lifecycle
* hooks

### Hooks importantes

* useState
* useEffect
* useMemo
* useCallback
* useRef
* useContext

### Conceitos avançados

* controlled vs uncontrolled
* composition
* lifting state up
* render patterns
* memoization
* concurrent rendering
* Suspense
* lazy loading

### Problema importante

Entender:

* stale closures
* render desnecessário
* dependency arrays
* referential equality

Isso apareceu diretamente nos warnings do projeto.

## Objetivo prático

Conseguir:

* evitar rerender excessivo,
* criar componentes reutilizáveis,
* criar DataTable performática,
* entender warnings do React Compiler.

## Material

* [React Docs](https://react.dev?utm_source=chatgpt.com)

---

# 3. Estruturação de Projetos Frontend

## Estudar

### Arquitetura

* feature-first
* modular architecture
* shared layer
* app layer
* infra layer
* separation of concerns

### Estruturas comuns

```txt
src/
 ├── app/
 ├── pages/
 ├── features/
 ├── shared/
 ├── services/
 ├── hooks/
 ├── layouts/
 ├── components/
```

## Objetivo

Entender:

* por que separar features,
* por que evitar componente “God Component”,
* como manter escalabilidade.

---

# 4. Vite

## Estudar

* dev server
* HMR
* build pipeline
* environment variables
* aliases
* plugins

## Objetivo

Entender:

* por que Vite substituiu webpack em muitos cenários,
* diferença entre build dev e prod.

## Material

* [Vite Docs](https://vite.dev?utm_source=chatgpt.com)

---

# 5. React Router

## Estudar

* nested routes
* layouts
* protected routes
* loaders
* navigation state
* route params
* lazy routes

## Objetivo

Implementar:

* AuthLayout
* AppLayout
* páginas 403/404
* rotas privadas

## Material

* [React Router Docs](https://reactrouter.com?utm_source=chatgpt.com)

---

# 6. React Query / TanStack Query

Esse é um dos recursos mais importantes para backend developers entrando em frontend moderno.

## Estudar

### Conceitos

* server state
* cache
* staleTime
* gcTime
* invalidation
* optimistic update
* mutation
* query keys
* retries
* background refetch

### Problema que resolve

Frontend moderno NÃO deve ficar:

```ts
useEffect(() => {
 fetch(...)
}, [])
```

para tudo.

React Query resolve:

* cache,
* sincronização,
* loading,
* retry,
* refetch,
* deduplicação.

## Objetivo

Conseguir:

* criar camada de API escalável,
* invalidar cache corretamente,
* evitar requisições redundantes.

## Material

* [TanStack Query Docs](https://tanstack.com/query/latest?utm_source=chatgpt.com)

---

# 7. Zustand

## Estudar

* global state
* slices
* selectors
* persist middleware
* shallow compare

## Objetivo

Entender:

* diferença entre:

  * local state,
  * server state,
  * global state.

## Comparar

| Tipo         | Ferramenta  |
| ------------ | ----------- |
| Local state  | useState    |
| Server state | React Query |
| Global state | Zustand     |

## Material

* [Zustand Docs](https://zustand.docs.pmnd.rs?utm_source=chatgpt.com)

---

# 8. Forms — React Hook Form + Zod

## Estudar

### React Hook Form

* uncontrolled forms
* register
* Controller
* formState
* validation lifecycle

### Zod

* schema validation
* parse
* safeParse
* refinement
* transforms

## Objetivo

Criar:

* formulários performáticos,
* validação compartilhada,
* tipagem derivada do schema.

## Material

* [React Hook Form Docs](https://react-hook-form.com?utm_source=chatgpt.com)
* [Zod Docs](https://zod.dev?utm_source=chatgpt.com)

---

# 9. Tailwind CSS

## Estudar

### Conceitos

* utility-first
* responsive modifiers
* dark mode
* spacing scale
* tokens
* variants

### Problema importante

Entender:

* por que Tailwind reduz CSS acoplado,
* como evitar “className gigante”.

## Objetivo

Conseguir:

* criar layouts rapidamente,
* criar design consistente,
* reutilizar tokens.

## Material

* [Tailwind Docs](https://tailwindcss.com/docs?utm_source=chatgpt.com)

---

# 10. shadcn/ui

## Estudar

### Conceito

shadcn NÃO é biblioteca visual pronta.

É:

* composição de componentes,
* Radix UI + Tailwind,
* código copiado para o projeto.

### Entender

* slot pattern
* variants
* cva
* accessibility

## Objetivo

Conseguir:

* customizar componentes,
* manter controle do código,
* entender conflitos de versão.

## Material

* [shadcn/ui](https://ui.shadcn.com?utm_source=chatgpt.com)
* [Radix UI](https://www.radix-ui.com?utm_source=chatgpt.com)

---

# 11. PWA

## Estudar

### Conceitos

* manifest
* service worker
* cache offline
* installability
* push notifications

### Lighthouse

Entender:

* performance,
* accessibility,
* SEO,
* best practices.

## Objetivo

Conseguir:

* instalar app no mobile,
* cachear assets,
* funcionar offline parcialmente.

## Material

* [PWA Docs Google](https://web.dev/progressive-web-apps/?utm_source=chatgpt.com)

---

# 12. Autenticação Frontend

## Estudar

### Tokens

* JWT
* access token
* refresh token
* silent refresh

### Fluxos

* interceptors
* retry request
* logout automático
* race conditions

### Segurança

* XSS
* CSRF
* storage risks

## Objetivo

Entender profundamente o fluxo implementado no backend.

---

# 13. Data Table Avançada

## Estudar

### TanStack Table

* column defs
* row models
* sorting
* filtering
* pagination
* virtualization

### Performance

* memoization
* stable references
* derived state

## Objetivo

Resolver:

* warnings,
* rerender,
* tabelas grandes.

## Material

* [TanStack Table Docs](https://tanstack.com/table/latest?utm_source=chatgpt.com)

---

# 14. Performance Frontend

## Estudar

### Métricas

* LCP
* CLS
* TTI
* hydration

### Técnicas

* code splitting
* lazy loading
* memoization
* virtualization

## Ferramentas

* React DevTools
* Lighthouse
* Profiler

---

# 15. Testes

## Estudar

### Unitários

* Vitest
* Testing Library

### E2E

* Playwright

## Objetivo

Conseguir:

* testar hooks,
* rotas,
* autenticação,
* tabelas.

---

# 16. Pipeline e Qualidade

## Estudar

* ESLint
* Prettier
* Husky
* lint-staged
* CI/CD

---

# Ordem Recomendada

## Fase 1 — Base

1. TypeScript avançado
2. React moderno
3. Hooks
4. Vite
5. React Router

---

## Fase 2 — Arquitetura

6. Estruturação frontend
7. Zustand
8. React Query
9. Auth flows

---

## Fase 3 — UI

10. Tailwind
11. shadcn/ui
12. Forms
13. Data Tables

---

## Fase 4 — Profissionalização

14. PWA
15. Performance
16. Testes
17. CI/CD

---

# Projeto Ideal Para Consolidar

Criar sozinho:

## Sistema Financeiro Simplificado

Com:

* login JWT,
* refresh token,
* dashboard,
* CRUD,
* DataTable,
* filtros,
* formulários,
* cache,
* PWA,
* tema dark/light,
* offline parcial.

Você já iniciou exatamente esse caminho no projeto atual.
