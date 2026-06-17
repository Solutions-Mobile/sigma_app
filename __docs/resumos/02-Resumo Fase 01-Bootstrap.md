# Resumo-002-Bootstrap-FE.md

## Projeto

```txt
FinanceiroJS-FE
```

## Fase

```txt
Fase 1
```

## Marco

```txt
Bootstrap do Front-End
```

---

# Decisões Tomadas

## Biblioteca de Componentes

```txt
shadcn/ui
```

Motivos:

* Componentes desacoplados
* Sem vendor lock-in
* Código dentro do projeto
* Integração nativa com Tailwind

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

## Tema

```txt
Dark Mode
Light Mode
```

Paleta aprovada:

### Light

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

### Dark

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

# Autenticação

## Estratégia

### Access Token

```txt
Armazenado apenas em memória
(AuthContext)
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

## Refresh

Implementado no backend.

### Endpoint

```http
POST /auth/refresh
```

### Response esperada

```json
{
  "token": "novo-jwt"
}
```

---

## Logout

Implementado no backend.

### Endpoint

```http
POST /auth/logout
```

### Response esperada

```json
{
  "success": true
}
```

---

# Cadastro de Usuário

Decisão:

```txt
Não implementar nesta fase.
```

Motivo:

```txt
O endpoint exige tenantId.
O fluxo público de criação de tenant ainda não existe.
O cadastro será tratado posteriormente pelo módulo Users.
```

---

# Estrutura Planejada

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
├── App.tsx
└── main.tsx
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

# Telas da Fase 1

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
Layout vertical
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

# PWA

Implementar:

```txt
Manifest
Service Worker
Theme Color
Instalação
Ícones
```

Não implementar:

```txt
Push Notifications
Offline Sync
Background Sync
```

---

# Bootstrap Executado

Projeto criado:

```bash
npm create vite@latest financeirojs-fe -- --template react-ts
```

Dependências previstas:

```bash
npm install axios
npm install react-router-dom
npm install lucide-react
npm install next-themes

npm install clsx
npm install class-variance-authority
npm install tailwind-merge

npm install tailwindcss @tailwindcss/vite

npm install -D vite-plugin-pwa
```

---

# Limpeza do Template

Pode remover:

```txt
src/assets/react.svg
public/vite.svg
```

Também pode remover:

```txt
src/App.css
src/index.css
```

---

# Estrutura Temporária

```txt
src/
├── assets/
├── App.tsx
└── main.tsx
```

---

# Próxima Entrega

## Projeto

```txt
FinanceiroJS-FE
```

## Fase

```txt
Fase 1
```

## Próximo Marco

```txt
Configuração da infraestrutura do projeto
```

## Escopo

```txt
- Configuração Tailwind v4
- Configuração Vite
- Alias @
- Configuração shadcn/ui
- Estrutura definitiva de diretórios
- Theme Provider
- PWA
- Axios Client
- AuthContext
- Route Guards
```
