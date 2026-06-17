# CONTEXTO DE CONTINUIDADE — FINANCEIRO JS FE

Data: 15/06/2026

Objetivo deste documento:
Permitir a continuidade do projeto em um novo chat sem perda de contexto técnico, arquitetural ou funcional.

---

# 1. VISÃO GERAL DO PROJETO

Nome:
Financeiro JS FE

Objetivo:
Desenvolver o Front-End do sistema Financeiro JS consumindo uma API REST própria.

Stack:

- React
- TypeScript
- Vite
- React Router
- Axios
- React Hook Form
- Zod
- Tailwind CSS
- Shadcn UI

Diretrizes adotadas:

- MVP primeiro
- Sem ORM
- Sem Redux
- Sem Zustand
- Sem abstrações prematuras
- Código limpo
- Estrutura modular
- Preparação para RBAC futuro

---

# 2. STATUS ATUAL

Fase Atual:

Fase 03 — Autenticação e Infraestrutura de Navegação

Etapa Concluída:

Etapa 09 — Header autenticado com Logout

Próxima Etapa:

Etapa 10 — Navegação Base

Situação Geral:

Concluído:

- Login
- Logout
- Persistência de sessão
- AuthProvider
- AuthContext
- AuthStorage
- Axios Interceptors
- ProtectedRoute
- PublicRoute
- AuthLayout
- AppLayout
- Dashboard protegido
- Theme Toggle
- Header autenticado

Pendente:

- Validação completa do Refresh Token
- Sidebar
- Menu principal
- RBAC
- Módulos de negócio

---

# 3. ARQUITETURA ADOTADA

Fluxo de autenticação:

LoginPage
    ↓
AuthProvider.login()
    ↓
AuthService.login()
    ↓
POST /auth/login
    ↓
AuthStorage.setSession()
    ↓
Dashboard

Persistência:

LocalStorage
    ↓
AuthProvider
    ↓
Restore Session

Fluxo de autorização:

Axios Request Interceptor
    ↓
Authorization Bearer
    ↓
API

Fluxo de proteção:

ProtectedRoute
    ↓
Valida authenticated
    ↓
Permite ou redireciona

---

# 4. DECISÕES ARQUITETURAIS

## AuthContext

Problema:

Compartilhar sessão entre componentes.

Alternativas:

- Redux
- Zustand
- Context API

Decisão:

Context API

Motivo:

Escopo atual simples.

---

## Persistência

Problema:

Manter login após F5.

Decisão:

LocalStorage

Motivo:

Simplicidade e baixo custo.

---

## Interceptors

Problema:

Evitar adicionar Authorization manualmente.

Decisão:

Axios Interceptors

Benefícios:

- Centralização
- Reuso
- Menos código repetido

---

## Layouts

Problema:

Evitar duplicação de Header.

Decisão:

AuthLayout
AppLayout

Benefício:

Separação de responsabilidades.

---

## Configuração JWT

Situação:

Existe configuração em:

.env

e

src/config/auth.ts

Decisão:

Centralizar tudo no .env futuramente.

---

# 5. ESTRUTURA ATUAL

src/

├── app/
│   └── router/
│
├── components/
│
├── contexts/
│   └── auth/
│
├── layouts/
│   ├── auth-layout.tsx
│   └── app-layout.tsx
│
├── lib/
│   ├── auth/
│   └── axios/
│
├── pages/
│   ├── auth/
│   │   └── login-page.tsx
│   │
│   ├── dashboard/
│   │   └── dashboard-page.tsx
│   │
│   └── errors/
│
├── routes/
│   ├── protected-route.tsx
│   └── public-route.tsx
│
├── services/
│   └── auth/
│
└── types/

---

# 6. ARQUIVOS IMPORTANTES

## src/services/auth/auth-service.ts

Responsável:

- login
- refresh
- logout

---

## src/lib/auth/auth-storage.ts

Responsável:

Persistência local:

- accessToken
- refreshToken
- user

---

## src/contexts/auth/auth-provider.tsx

Responsável:

- login()
- logout()
- authenticated
- user

---

## src/lib/axios/interceptors.ts

Responsável:

- Bearer Token automático
- Refresh automático
- Retry

---

## src/routes/protected-route.tsx

Responsável:

Bloquear acesso sem autenticação.

---

## src/routes/public-route.tsx

Responsável:

Bloquear acesso ao login quando autenticado.

---

## src/layouts/app-layout.tsx

Responsável:

- Header
- Theme Toggle
- Informações do usuário
- Logout

---

# 7. ENDPOINTS UTILIZADOS

## Login

POST /auth/login

Request:

```json
{
  "login": "admin",
  "password": "123456"
}
```

---

## Refresh

POST /auth/refresh

Request:

```json
{
  "refreshToken": "..."
}
```

Status:

Implementado
Ainda não validado completamente

---

## Logout

POST /auth/logout

---

## Usuário Logado

GET /auth/me/info

Utilizado para:

* validação do token
* dashboard

---

# 8. PROBLEMAS ENCONTRADOS

## Backend desligado

Erro:

ERR_CONNECTION_REFUSED

Solução:

Iniciar servidor.

---

## CORS

Erro:

No Access-Control-Allow-Origin

Solução:

Configurar CORS no backend.

---

## React 19

Erro:

Calling setState synchronously within an effect

Solução:

Inicializar estado diretamente do LocalStorage.

---

## Dashboard

Erro:

GET /health

404

Causa:

Endpoint inexistente.

Solução:

Troca para:

GET /auth/me/info

---

# 9. TESTES EXECUTADOS

## Login

Resultado:

200 OK

---

## Persistência

Resultado:

Sessão restaurada após F5

---

## Authorization

Resultado:

Bearer enviado corretamente

---

## Dashboard

Resultado:

GET /auth/me/info funcionando

---

## Guards

Resultado:

Funcionando

---

## Layouts

Resultado:

Funcionando

---

# 10. PENDÊNCIAS

## Técnicas

Validar Refresh Token automático.

Configuração sugerida:

JWT_EXPIRES_IN=30s

JWT_REFRESH_EXPIRES_IN=5m

Fluxo esperado:

GET /auth/me/info -> 401

POST /auth/refresh -> 200

GET /auth/me/info -> 200

---

## Arquiteturais

Centralizar configuração JWT no .env.

---

## Funcionais

Implementar Sidebar.

Implementar Navegação Base.

Implementar RBAC.

---

# 11. PRÓXIMA ETAPA

Etapa 10 — Navegação Base

Objetivo:

Criar estrutura principal de navegação da aplicação.

Itens previstos:

* Sidebar recolhível
* Dashboard
* Cadastros
* Movimentação
* Relatórios
* Configurações

Estrutura prevista:

Dashboard

Cadastros
├─ Empresas
├─ Usuários
└─ Perfis

Movimentação
├─ Contas
├─ Recebimentos
└─ Pagamentos

Relatórios

Configurações

---

# 12. CRITÉRIOS DE APROVAÇÃO DA ETAPA 10

✓ Sidebar renderiza

✓ Navegação funcional

✓ Item ativo destacado

✓ Integração com React Router

✓ Compatível com AppLayout

✓ Estrutura preparada para RBAC

---

# 13. CHECKLIST CONSOLIDADO

✓ AuthService

✓ AuthStorage

✓ AuthProvider

✓ AuthContext

✓ Login

✓ Logout

✓ Persistência

✓ Interceptors

✓ Authorization Bearer

✓ ProtectedRoute

✓ PublicRoute

✓ AuthLayout

✓ AppLayout

✓ Dashboard

✓ Theme Toggle

✓ Header autenticado

□ Refresh Token validado

□ Sidebar

□ Navegação principal

□ RBAC

□ Módulos de negócio
