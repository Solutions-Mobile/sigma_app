## Regras de Referências
Para este projeto, o ideal é manter um documento de contexto único e ir atualizando-o conforme as decisões forem sendo tomadas.

### 1. Criar um arquivo

```txt
docs/context/financeirojs-fe-context.md
```

ou

```txt
docs/context/financeirojs-context.md
```

---

### 2. Estrutura mínima

```md
# Projeto

FinanceiroJS

# Backend

- Node.js
- Express
- PostgreSQL
- Multi Tenant
- JWT

# Frontend

- React 19
- TypeScript
- Vite
- Tailwind v4
- shadcn/ui
- Axios
- React Router

# API Base

http://localhost:3000/sf/v1

# Auth

## Login

Request
...

Response
...

## Me

...

# Layout

...

# Módulos

## Fase 1

- Auth
- Dashboard

## Fase 2

- Users
- Tenants

# Decisões Arquiteturais

...
```

---

### 3. Ao iniciar um novo chat

Basta informar:

```txt
Continuar projeto FinanceiroJS.

Contexto:
- Utilizar o arquivo financeirojs-fe-context.md versão 2026-06-11
- Estamos na Fase 1
- Última entrega concluída: definição arquitetural
- Próxima entrega: estrutura inicial React
```

ou simplesmente:

```txt
Continuar projeto FinanceiroJS FE.

Último marco:
- Contexto consolidado da Fase 1 aprovado.
- Próximo passo: gerar estrutura do projeto Vite.
```

Como o contexto já está bem consolidado, normalmente isso será suficiente para eu reconstruir rapidamente o cenário.

---

### 4. Melhor abordagem para este projeto

Ao final de cada etapa, gerar um resumo incremental:

```txt
Resumo-001-Arquitetura.md
Resumo-002-Auth.md
Resumo-003-Users.md
Resumo-004-Tenants.md
...
```

E iniciar o próximo chat com:

```txt
Continuar FinanceiroJS FE.

Base:
- Resumo-001-Arquitetura aprovado
- Resumo-002-Auth aprovado

Executar:
- Resumo-003-Users
```

Isso evita depender da memória da conversa e transforma cada chat em uma etapa rastreável do projeto.

---

### 5. Melhor formato de referência

Use sempre:

```txt
Projeto: FinanceiroJS-FE
Fase: 1
Marco: Arquitetura Base
Próxima Entrega: Estrutura React + Layout + Auth
```

Exemplo futuro:

```txt
Projeto: FinanceiroJS-FE
Fase: 2
Marco: Users
Próxima Entrega: Listagem e Cadastro de Usuários
```

Esse formato é suficiente para retomar o desenvolvimento sem precisar reenviar todo o histórico.
