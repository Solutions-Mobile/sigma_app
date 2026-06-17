# CONTEXT COMPLETO — FINANCEIROJS-FE — INÍCIO DA FASE 3

## Projeto

FinanceiroJS-FE

---

## Status Atual

Fase 2 concluída funcionalmente.

Infraestrutura do Front-End pronta e operacional.

Validações concluídas:

- Build funcionando
- Dev Server funcionando
- Alias @ funcionando
- Tailwind funcionando
- shadcn/ui funcionando
- ThemeProvider funcionando
- Dark/Light funcionando
- Persistência de tema funcionando
- Router funcionando
- Route Guards funcionando
- AuthContext mock funcionando
- Axios configurado
- Variáveis de ambiente configuradas
- PWA configurado

---

## Stack Oficial do Projeto

| Tecnologia | Versão |
|------------|---------|
| React | 19.2.x |
| TypeScript | 6.0.3 |
| Vite | 8.x |
| TailwindCSS | 4.3.x |
| React Router | 7.8.x |
| Axios | 1.11.x |
| Zustand | 5.x |
| React Hook Form | 7.x |
| Zod | 4.x |
| shadcn/ui | 4.9.x |
| next-themes | 0.4.x |
| vite-plugin-pwa | 1.3.x |

---

## Estrutura Atual

src/
├── App.tsx
├── main.tsx
│
├── app/
│   ├── layouts/
│   ├── providers/
│   └── router/
│
├── components/
│   ├── common/
│   ├── forms/
│   └── ui/
│
├── contexts/
│   └── auth/
│
├── hooks/
│
├── lib/
│   ├── auth/
│   ├── axios/
│   └── utils/
│
├── pages/
│   ├── auth/
│   ├── dashboard/
│   └── errors/
│
├── services/
│
├── styles/
│
└── types/

---

## Implementado na Fase 2

### Providers

src/app/providers/

- ThemeProvider
- Providers

### Router

src/app/router/

- router.tsx
- private-route.tsx
- public-route.tsx

### Contexto de Autenticação (Mock)

src/contexts/auth/

- auth-context.ts
- auth-provider.tsx
- use-auth.ts
- types.ts

Implementação atual:

- user
- authenticated
- loading
- login() mock
- logout() mock

Ainda sem integração com API.

### Axios

src/lib/axios/api.ts

Configuração atual:

- baseURL = import.meta.env.VITE_API_URL
- timeout = 30000

### Variáveis de Ambiente

.env.development

VITE_API_URL=http://localhost:3000/sf/v1

.env.production

VITE_API_URL=https://api.seudominio.com/sf/v1

### Theme

next-themes

Persistência:

localStorage

Chave:

financeirojs-theme

### Theme Toggle

src/components/common/theme-toggle.tsx

### PWA

vite-plugin-pwa

Configuração:

registerType: "autoUpdate"

Arquivos:

public/
├── favicon.ico
├── pwa-192x192.png
└── pwa-512x512.png

Observação:

Não utilizar virtual:pwa-register.

---

## Backend Disponível

Já implementado.

Recursos disponíveis:

- Login
- Refresh Token
- Logout

Endpoints:

POST /auth/login

POST /auth/refresh

POST /auth/logout

---

## LoginResponseDTO do Backend

interface LoginResponseDTO {
  accessToken: string;
  refreshToken: string;

  user: {
    id: string;
    login: string;
    profile: string;
    email: string;
    tenantId: string;
  };
}

---

## Escopo da Fase 3

### 1. DTOs

Criar:

src/services/auth/dtos/

Arquivos:

- login-request.dto.ts
- login-response.dto.ts
- refresh-response.dto.ts

---

### 2. Auth Service

Criar:

src/services/auth/auth-service.ts

Responsabilidades:

- login()
- refresh()
- logout()

Utilizar:

src/lib/axios/api.ts

---

### 3. Storage

Criar:

src/lib/auth/auth-storage.ts

Responsabilidades:

- salvar accessToken
- salvar refreshToken
- salvar user
- recuperar sessão
- remover sessão

Persistência:

localStorage

---

### 4. Refatorar AuthProvider

Arquivo:

src/contexts/auth/auth-provider.tsx

Remover:

- login mock
- logout mock

Implementar:

- login real
- logout real
- restore session
- refresh session

---

### 5. Axios Interceptors

Criar:

src/lib/axios/interceptors.ts

Responsabilidades:

- Authorization Bearer
- Captura de 401
- Refresh automático
- Retry da requisição original
- Logout automático em falha

---

### 6. Login Page

Arquivo:

src/pages/auth/login-page.tsx

Utilizar:

- react-hook-form
- zod
- shadcn/ui

Campos:

- login
- senha

Ações:

- Entrar

---

### 7. Sessão

Persistir:

- accessToken
- refreshToken
- user

Estratégia:

localStorage

---

### 8. Proteção de Rotas

Passar a utilizar autenticação real.

Remover dependência do mock atual.

---

### 9. Dashboard

Objetivo:

Validar autenticação.

Exibir:

- Nome
- Login
- Perfil
- Tenant

Obtidos do LoginResponseDTO.

---

## Fora do Escopo da Fase 3

Não implementar:

- Users
- Tenants
- ACL
- Perfis
- Permissões
- Menus dinâmicos
- CRUDs
- Cadastros

---

## Critério de Encerramento da Fase 3

- Login funcional
- Logout funcional
- Refresh Token funcional
- Sessão persistida
- Interceptors ativos
- Dashboard protegida
- Redirecionamento automático
- Logout automático
- Build sem erros
- Preview sem erros

---

## Próxima Fase

Fase 4

Implementar:

- AppLayout definitivo
- Sidebar
- Header
- Breadcrumb
- Dashboard inicial
- Navegação principal
