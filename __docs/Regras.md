Sugiro adicionar a seguinte regra ao projeto.

---

# Regra — Geração de Contexto para Continuidade em Novo Chat

Quando o usuário solicitar:

```text
Gerar contexto
Criar contexto
Contexto para próximo chat
Preparar próximo chat
```

deve ser gerado um documento completo para continuidade do projeto em outro chat.

## Objetivo

Permitir que um novo chat continue o projeto sem perda de contexto técnico, arquitetural ou funcional.

---

## Formato Obrigatório

O contexto deve conter:

### 1. Visão Geral do Projeto

```text
Nome do projeto
Objetivo
Escopo atual
Tecnologias utilizadas
Versões relevantes
```

---

### 2. Status Atual

```text
Fase atual
Etapa atual
Percentual aproximado concluído
Itens concluídos
Itens pendentes
```

---

### 3. Arquitetura

```text
Estrutura de diretórios
Padrões adotados
Fluxo de autenticação
Fluxo de navegação
Fluxo de comunicação com API
```

---

### 4. Decisões Arquiteturais

Para cada decisão:

```text
Problema
Alternativas avaliadas
Decisão tomada
Motivação
Impactos futuros
```

---

### 5. Estrutura de Pastas

Exemplo:

```text
src/

├── app/
├── components/
├── contexts/
├── layouts/
├── lib/
├── pages/
├── routes/
├── services/
├── types/
```

---

### 6. Arquivos Criados

Para cada arquivo:

```text
Path completo
Responsabilidade
Dependências relevantes
```

---

### 7. Arquivos Alterados

Para cada arquivo:

```text
Path completo
O que foi alterado
Motivo da alteração
```

---

### 8. Fluxos Implementados

Exemplo:

```text
Login

Usuário
  ↓
LoginPage
  ↓
AuthProvider
  ↓
AuthService
  ↓
Backend
  ↓
AuthStorage
  ↓
Dashboard
```

---

### 9. Endpoints Utilizados

Para cada endpoint:

```text
Método
URL
Request
Response
Finalidade
```

---

### 10. Problemas Encontrados

Para cada problema:

```text
Descrição
Causa raiz
Solução aplicada
```

---

### 11. Testes Executados

Para cada teste:

```text
Objetivo
Passos
Resultado esperado
Resultado obtido
```

---

### 12. Pendências

Separadas por:

```text
Técnicas
Funcionais
Arquiteturais
```

---

### 13. Próxima Etapa

Deve conter:

```text
Objetivo
Arquivos previstos
Implementações previstas
Dependências
Critérios de aprovação
```

---

### 14. Checklist Consolidado

Formato:

```text
✓ concluído

□ pendente
```

---

## Regra de Entrega

Quando solicitado:

```text
Gerar contexto
```

o assistente deve:

```text
✓ Gerar SEMPRE em arquivo para download

✓ Utilizar nível de detalhamento técnico

✓ Incluir contexto suficiente para continuar o projeto em outro chat

✓ Incluir decisões arquiteturais

✓ Incluir pendências

✓ Incluir próximos passos

✓ Considerar todo o histórico do projeto disponível
```

---

## Regra Complementar

Quando o usuário solicitar:

```text
Fazer resumo
```

e depois:

```text
Gerar contexto
```

o contexto deve ser mais detalhado que o resumo e focado em:

```text
continuidade do desenvolvimento
```

enquanto o resumo permanece focado em:

```text
registro histórico e estudo
```
