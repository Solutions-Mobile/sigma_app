# FinanceiroJS-FE

## Fase

```txt
Fase 1
```

## Status

```txt
Planejamento concluído
Arquitetura aprovada
Aguardando implementação
```

---

# Objetivo da Fase

Implementar a base do Front-End do FinanceiroJS contendo:

```txt
Auth
Dashboard
Estrutura Base
PWA
Dark/Light Theme
```

---

# Stack Oficial

```txt
React 19
TypeScript
Vite
Axios
React Router
Tailwind CSS v4
shadcn/ui
Lucide React
PWA
```

---

# Decisões Arquiteturais

## Biblioteca de Componentes

```txt
shadcn/ui
```

Motivos:

```txt
Componentes desacoplados
Sem vendor lock
Código fica dentro do projeto
Alta flexibilidade visual
Excelente integração com Tailwind
```

---

## Estilização

```txt
Tailwind CSS v4
```

Estratégia:

```txt
Mobile First
```

---

## Autenticação

### Access Token

```txt
React Context
Memória apenas
```

Não utilizar:

```txt
localStorage
sessionStorage
```

---

### Refresh Token

```txt
Cookie HttpOnly
Secure
SameSite=Lax
```

---

### Fluxo

```txt
Login
 ↓
JWT em memória
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

# Layout

## Desktop

```txt
┌─────────────────────────────────────┐
│ Header                              │
├──────────────┬──────────────────────┤
│ Sidebar      │ Conteúdo             │
└──────────────┴──────────────────────┘
```

---

## Mobile

```txt
┌───────────────────────┐
│ Header                │
├───────────────────────┤
│ Conteúdo              │
├───────────────────────┤
│ Bottom Navigation     │
└───────────────────────┘
```

---

# Telas da Primeira Entrega

## Login

```txt
Split Screen
```

Desktop:

```txt
Branding | Login
```

Mobile:

```txt
Login vertical
```

---

## Cadastro de Usuário

```txt
Split Screen
```

Desktop:

```txt
Benefícios | Cadastro
```

Mobile:

```txt
Cadastro vertical
```

---

## Dashboard

Primeira versão:

```txt
Bem-vindo
Usuário Atual
Tenant Atual
Informações da Sessão
```

Sem gráficos.

---

# Estrutura do Projeto

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
│   ├── dashboard/
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

# API

Base URL

```txt
http://localhost:3000/sf/v1
```

---

# Contratos Auth

## Login

### Endpoint

```http
POST /auth/login
```

### Request

```json
{
  "login": "marcos",
  "password": "123456"
}
```

### Response

```json
{
  "token": "jwt",
  "user": {
    "id": "uuid",
    "login": "marcos",
    "profile": "admin",
    "email": "admin@empresa.com",
    "tenantId": "uuid"
  }
}
```

---

## Me

### Endpoint

```http
GET /auth/me/info
```

### Response

```json
{
  "user": {
    "id": "uuid",
    "tenantId": "uuid",
    "login": "marcos",
    "email": "admin@empresa.com",
    "profile": "admin"
  }
}
```

---

## Novo Usuário

### Endpoint

```http
POST /auth/user
```

### Request

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

```http
POST /auth/refresh
```

---

## Logout

Assumir implementado.

```http
POST /auth/logout
```

---

# Perfis

Backend atual:

```txt
admin
user
```

Mapeamento Front-End:

```txt
admin -> ADMIN
user -> USER
```

Preparar estrutura futura:

```txt
SYSTEM_ADMIN
OWNER
ADMIN
USER
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

Implementar:

```txt
Manifest
Service Worker
Theme Color
Ícones
Instalação
```

Não implementar nesta fase:

```txt
Push Notifications
Offline Sync
Background Sync
```

---

# Próxima Entrega

```txt
Estrutura inicial completa do projeto

- Criação do projeto Vite
- Tailwind v4
- shadcn/ui
- Organização de diretórios
- Tema Dark/Light
- Configuração PWA
- Cliente Axios
- AuthContext
- Route Guards
- App Layout
- Header
- Sidebar
- Mobile Navigation
- Tela Login
- Tela Cadastro
- Dashboard Inicial
```
