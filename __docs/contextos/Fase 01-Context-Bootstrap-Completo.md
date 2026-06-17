# CONTEXT COMPLETO — FINANCEIROJS-FE — FASE 1

## Objetivo

Construção do Front-End base do ERP FinanceiroJS.

Escopo inicial:

```txt
Auth
Dashboard
Estrutura Base
PWA
Dark/Light Theme
```

Módulos futuros:

```txt
Users
Tenants
Accounts
Categories
Parties
Invoices
Installments
Payments
```

---

# Stack Oficial

```json
{
  "framework": "React 19",
  "language": "TypeScript",
  "build": "Vite",
  "router": "React Router",
  "http": "Axios",
  "style": "Tailwind CSS v4",
  "components": "shadcn/ui",
  "icons": "Lucide React",
  "pwa": true,
  "theme": true
}
```

---

# Arquitetura

## Mobile First

Toda implementação deverá seguir:

```txt
Mobile
↓
Tablet
↓
Desktop
```

---

## Estrutura

```txt
src/
│
├── app/
│   ├── layouts/
│   ├── providers/
│   ├── guards/
│   ├── router/
│   └── theme/
│
├── modules/
│   ├── auth/
│   │
│   ├── dashboard/
│   │
│   ├── users/
│   └── tenants/
│
├── shared/
│   ├── api/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── types/
│   ├── constants/
│   └── utils/
│
├── assets/
│
├── main.tsx
└── vite-env.d.ts
```

---

# Layout Principal

## Desktop

```txt
┌─────────────────────────────────────┐
│ Header                              │
├──────────────┬──────────────────────┤
│ Sidebar      │ Content              │
│              │                      │
│              │                      │
└──────────────┴──────────────────────┘
```

---

## Mobile

```txt
┌───────────────────────┐
│ Header                │
├───────────────────────┤
│ Content               │
│                       │
├───────────────────────┤
│ Bottom Navigation     │
└───────────────────────┘
```

---

# Telas da Fase 1

## Login

Layout:

```txt
Split Screen
```

Desktop:

```txt
┌─────────────────────┬─────────────────────┐
│ Branding            │ Login               │
│                     │                     │
│ Logo                │ Login               │
│ Informações         │ Senha               │
│ Destaques           │ Entrar              │
└─────────────────────┴─────────────────────┘
```

Mobile:

```txt
┌─────────────────────┐
│ Logo                │
│ Login               │
│ Senha               │
│ Entrar              │
└─────────────────────┘
```

---

## Cadastro de Usuário

Layout:

```txt
Split Screen
```

Desktop:

```txt
┌─────────────────────┬─────────────────────┐
│ Benefícios          │ Cadastro            │
│                     │                     │
│ Multi Tenant        │ Nome                │
│ Segurança           │ Email               │
│ Gestão              │ Senha               │
│                     │ Confirmar Senha     │
└─────────────────────┴─────────────────────┘
```

---

## Dashboard

Primeira versão:

```txt
┌───────────────────────────────┐
│ Bem-vindo                     │
├───────────────────────────────┤
│ Usuário Atual                 │
├───────────────────────────────┤
│ Tenant Atual                  │
├───────────────────────────────┤
│ Último Login                  │
└───────────────────────────────┘
```

Sem gráficos nesta fase.

---

# API

Base URL

```ts
const API_BASE_URL =
  "http://localhost:3000/sf/v1";
```

---

# Auth

## Login

Endpoint:

```http
POST /auth/login
```

Request:

```json
{
  "login": "marcos",
  "password": "123456"
}
```

Response:

```json
{
  "token": "jwt",
  "user": {
    "id": "f0493b7d-34ac-48ed-b19d-4916bb685269",
    "login": "marcos",
    "profile": "admin",
    "email": "admin@empresa.com",
    "tenantId": "f9fa8b4b-d086-489d-b000-7818d5917c65"
  }
}
```

---

## Me

Endpoint:

```http
GET /auth/me/info
```

Response:

```json
{
  "user": {
    "id": "f0493b7d-34ac-48ed-b19d-4916bb685269",
    "tenantId": "f9fa8b4b-d086-489d-b000-7818d5917c65",
    "login": "marcos",
    "email": "admin@empresa.com",
    "profile": "admin"
  }
}
```

---

## Register User

Endpoint:

```http
POST /auth/user
```

Request:

```json
{
  "tenantId": "uuid",
  "login": "marcos",
  "email": "admin@empresa.com",
  "password": "123456",
  "profile": "admin"
}
```

---

## Refresh

Assumir implementado.

Endpoint:

```http
POST /auth/refresh
```

Response:

```json
{
  "token": "jwt"
}
```

---

## Logout

Assumir implementado.

Endpoint:

```http
POST /auth/logout
```

Response:

```json
{
  "success": true
}
```

---

# Autenticação

## Estratégia

Access Token:

```txt
React Context
Memory Only
```

Não persistir:

```txt
localStorage
sessionStorage
```

---

## Refresh Token

```txt
Cookie HttpOnly
Secure
SameSite=Lax
```

---

## Fluxo

```txt
Login
  ↓
Recebe JWT
  ↓
AuthContext
  ↓
Axios Interceptor
  ↓
401
  ↓
/auth/refresh
  ↓
Novo JWT
```

---

# Perfis

Backend atual:

```txt
admin
user
```

Frontend deverá preparar estrutura para:

```txt
SYSTEM_ADMIN
OWNER
ADMIN
USER
```

Mapeamento inicial:

```txt
admin → ADMIN
user → USER
```

---

# Paleta

## Light

```txt
Background    #F8FAFC
Surface       #FFFFFF

Primary       #334155
Secondary     #475569

Indigo        #4F46E5

Success       #15803D
Warning       #D97706
Danger        #DC2626

Text          #0F172A
Border        #CBD5E1
```

---

## Dark

```txt
Background    #020617
Surface       #0F172A

Primary       #64748B
Secondary     #94A3B8

Indigo        #6366F1

Success       #22C55E
Warning       #F59E0B
Danger        #EF4444

Text          #E2E8F0
Border        #334155
```

---

# PWA

Primeira versão

```txt
Manifest
Service Worker
Instalável
Theme Color
Ícones
```

Fora do escopo:

```txt
Push Notifications
Offline Sync
Background Sync
```

---

# Entrega Seguinte

Implementação completa da Fase 1:

```txt
✓ Estrutura Vite
✓ Tailwind v4
✓ shadcn/ui
✓ Dark/Light
✓ PWA
✓ Axios Client
✓ Auth Context
✓ Route Guards
✓ Login
✓ Cadastro
✓ Dashboard
✓ App Layout
✓ Sidebar
✓ Header
✓ Mobile Navigation
✓ Theme Toggle
```
