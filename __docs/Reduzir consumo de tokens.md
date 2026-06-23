# Principais causas do alto consumo de tokens

---

# 1. Reenvio repetitivo de arquivos completos

## Problema

Você frequentemente envia:

* arquivos inteiros;
* múltiplos arquivos;
* estruturas completas.

Mesmo quando:

* apenas 2~3 linhas mudaram.

---

# Impacto

Muito alto.

Exemplo:

```txt
data-table.tsx
300 linhas
```

reenviado 5 vezes:

* explode contexto;
* aumenta custo;
* reduz janela útil.

---

# Melhor abordagem

Enviar apenas:

````md
Arquivo:
src/components/data-table/data-table.tsx

Trecho atual:
```tsx
<TableBody>
````

Erro:
...

````

---

# 2. Refactors longos durante debug

## Problema

Durante erros pequenos:
- a solução virou refactor estrutural.

Exemplo:
- erro de Authorization;
- acabou envolvendo:
  - DataTable;
  - AppPage;
  - toolbar;
  - columns;
  - render contract.

---

# Impacto

Muito alto.

Cada refactor:
- gera código gigante;
- gera múltiplas revisões;
- gera regressões.

---

# Melhor abordagem

Aplicar:

```txt
patch minimalista
````

Primeiro:

* corrigir bug;
* depois refatorar.

---

# 3. Solicitação frequente de "arquivo completo"

## Problema

Você pede corretamente:

* "gere arquivo completo".

Mas isso:

* multiplica tokens drasticamente.

Especialmente em:

* components;
* hooks;
* pages.

---

# Melhor abordagem

Durante debug:

* permitir patch incremental.

Exemplo:

```md
Alterar apenas:

ANTES
...

DEPOIS
...
```

---

# 4. Resumos gigantes dentro do próprio chat

## Problema

Os resumos:

* repetem muito contexto;
* reexplicam arquitetura inteira.

---

# Impacto

Gigantesco.

Exemplo:

* 5k~15k tokens facilmente.

---

# Melhor abordagem

## Usar 3 níveis de resumo

---

## A. Resumo técnico curto

```md
- interceptor corrigido
- DataTable estabilizado
- React Query OK
- CRUD pendente
```

---

## B. Contexto operacional

Somente:

* estado atual;
* próximos passos;
* arquivos importantes.

---

## C. Resumo completo

Gerar APENAS:

* troca de chat;
* checkpoint importante.

---

# 5. Diagnósticos especulativos longos

## Problema

Muitas mensagens:

* investigaram múltiplos cenários;
* sem arquivos suficientes.

Exemplo:

```txt
provavelmente...
talvez...
possivelmente...
```

---

# Impacto

Muito alto.

---

# Melhor abordagem

Fluxo mais eficiente:

```txt
1. pedir arquivo
2. diagnosticar
3. corrigir
```

Sem:

* hipóteses longas;
* arquiteturas intermediárias.

---

# 6. Código excessivamente formatado

## Problema

Muito uso de:

* headers;
* separadores;
* blocos repetidos.

---

# Impacto

Moderado.

---

# Melhor abordagem

Preferir:

```md
Arquivo:
src/...

Substituir:
...
```

Sem:

* múltiplos títulos;
* explicações repetidas.

---

# 7. Mudança de estratégia no meio do debug

## Problema

Fluxo foi:

* patch;
* refactor;
* enterprise;
* restauração;
* estabilização.

---

# Impacto

Muito alto.

Porque:

* código duplicado;
* explicações duplicadas;
* correções sobre correções.

---

# Melhor abordagem

Definir explicitamente:

```txt
MODO:
- patch mínimo
OU
- refactor estrutural
```

antes da implementação.

---

# 8. Geração repetida do mesmo contexto

## Problema

O mesmo contexto foi:

* resumido;
* reestruturado;
* regenerado;
* convertido.

---

# Melhor abordagem

Manter:

* 1 contexto principal;
* 1 changelog incremental.

---

# Estratégia ideal para próximos chats

---

# Durante debug

## NÃO pedir:

* arquivos completos;
* contexto completo;
* resumo completo.

---

## Pedir:

```md
Arquivo:
...

Trecho:
...

Erro:
...
```

---

# Durante implementação

## Permitir:

```txt
patch incremental
```

Somente gerar arquivo completo:

* quando estabilizar.

---

# Em mudanças grandes

Abrir novo chat com:

* contexto enxuto;
* somente arquitetura relevante.

---

# Melhor estrutura de contexto

---

# Contexto ideal

```md
# Estado Atual

- auth OK
- DataTable OK
- CRUD pendente

# Stack

- React
- TS
- React Query

# Arquivos críticos

- api.ts
- empresa-service.ts

# Próxima tarefa

Implementar CRUD Empresas
```

---

# NÃO incluir

* histórico inteiro;
* erros antigos resolvidos;
* tentativas intermediárias;
* diagnósticos obsoletos.

---

# Maior ganho imediato

## Os 3 que mais reduzirão tokens

### 1.

Enviar apenas trechos com erro.

---

### 2.

Usar patch incremental durante debug.

---

### 3.

Evitar resumo/contexto completo frequente.

---

# Estimativa de redução

Aplicando isso:

```txt
30% ~ 60%
```

de redução de consumo facilmente.
