# Mapa de Sensibilidade Social SCARF | Instituto COMET

Implementação da seção oficial **Mapa de Sensibilidade Social** no relatório do teste SCARF, apresentando a interpretação individualizada e equilibrada das 5 necessidades sociais segundo a metodologia do Instituto COMET, sem alterar o algoritmo de cálculo ou pontuação existente.

> [!IMPORTANT]
> **Aprovação Necessária**: Este plano atende a todas as diretrizes do prompt oficial do Instituto COMET. Nenhuma linha de código dos testes ou relatórios foi modificada previamente. A execução iniciará imediatamente após o seu comando de aprovação ("Proceed" / "Aprovar").

---

## 1. Visão Geral e Conceito

O **Mapa de Sensibilidade Social** organiza a leitura das 5 necessidades humanas mapeadas pelo modelo SCARF sob a ótica do Instituto COMET:
- Tradução e nomenclatura oficial 100% em português (sem termos em inglês na interface):
  - **S — Reconhecimento** (Valorização, importância e reconhecimento social)
  - **C — Previsibilidade** (Clareza, segurança e previsibilidade)
  - **A — Autonomia** (Liberdade de escolha e controle sobre as próprias ações)
  - **R — Conexão** (Confiança, vínculos e pertencimento)
  - **F — Justiça** (Imparcialidade, transparência e tratamento justo)
- Avaliação determinística e imparcial: nenhum nível é considerado superior, inferior, bom ou ruim. Cada faixa destaca potenciais positivos e possíveis limitações contextuais.
- Respeito estrito às faixas percentuais:
  - **0% a 49%**: Sensibilidade Baixa
  - **50% a 69%**: Sensibilidade Moderada
  - **70% a 100%**: Sensibilidade Alta

---

## 2. Diagnóstico Técnico da Estrutura Atual

1. **Estrutura Atual do Teste**:
   - As 30 questões situacionais alimentam o mapa de respostas em `src/pages/ScarfTestPage.tsx`.
   - O algoritmo calcula as ocorrências de cada domínio social (máximo 30 pontos) através de `calculateScarfScores(answers)`.
2. **Variáveis que Armazenam as 5 Pontuações**:
   - `scores: ScarfScores` com as chaves: `status`, `certeza`, `autonomia`, `relacionamento`, `justica`.
   - Armazenadas no objeto persistido `ScarfResponse` em `src/lib/storage.ts`.
3. **Escala Percentual (0% a 100%)**:
   - Cada dimensão é calculada por: `pct = Math.round((scores[key] / SCARF_TOTAL) * 100)`, resultando estritamente em uma escala de 0 a 100.
4. **Sem Alteração de Algoritmo**:
   - As variáveis, pontuações, perguntas e histórico do usuário permanecem 100% inalterados.

---

## 3. Identidade Visual & Design System (Instituto COMET)

A seção terá estética sóbria, elegante e executiva:
- **Fundo**: Superfície escura em tons de grafite profundo (`#111827` / `#0F172A`).
- **Cards**: Superfícies grafite com bordas sutis em hairline (`#1E293B`, border `#334155`).
- **Destaque Principal**: Laranja COMET (`#F97316` / `#EA580C`) para a identidade da marca, barras de progresso e ênfase tipográfica.
- **Tipografia**: Títulos e percentuais em branco puro (`#FFFFFF`), textos secundários em cinza-claro (`#94A3B8`).
- **Sinalização Discreta**:
  - **Potencial Positivo**: Verde esmeralda suave com ícone discreto de crescimento (`↗`).
  - **Possível Limitação**: Coral/âmbar discreto com ícone sutil de atenção (`⚠` ou `○`).

---

## 4. Arquitetura de Componentes e Dados

```
┌─────────────────────────────────────────────────────────────┐
│                 src/lib/comet-scarf-data.ts                 │
│  - Tipos: CometSensitivityLevel ('baixa'|'moderada'|'alta') │
│  - Dimensões oficiais COMET (S, C, A, R, F)                 │
│  - Biblioteca determinística das 15 interpretações oficiais  │
│  - Função helper getCometSensitivity(pct)                   │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                src/pages/ScarfResultPage.tsx                │
│  - Seção integrada: MAPA DE SENSIBILIDADE SOCIAL            │
│  - Introdução oficial COMET + Legenda compacta              │
│  - Grid responsivo (2 colunas desktop, 1 coluna mobile)     │
│  - 5 Cards com cabeçalho, percentual, nível, barra de       │
│    progresso, interpretação, potencial positivo e limitação │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Arquivos a Serem Criados ou Alterados

1. **`src/lib/comet-scarf-data.ts` (Novo Módulo)**:
   - Armazenará com precisão absoluta os textos oficiais fornecidos na Seção 4 do prompt para as 5 dimensões e os 3 níveis (total de 15 blocos interpretativos determinísticos).
   - Mapeará as chaves internas (`status` -> Reconhecimento, `certeza` -> Previsibilidade, `autonomia` -> Autonomia, `relacionamento` -> Conexão, `justica` -> Justiça).
   - Função `getCometSensitivity(pct: number): 'baixa' | 'moderada' | 'alta'`.

2. **`src/pages/ScarfResultPage.tsx` (Atualização)**:
   - Integração do componente do **Mapa de Sensibilidade Social** na página de resultados.
   - Aplicação da identidade visual grafite e Laranja COMET com contraste WCAG AA.
   - Layout responsivo: 2 colunas no desktop, último card centralizado ou com largura balanceada, 1 coluna no mobile.
   - Renderização limpa tanto na interface web quanto na impressão/exportação para PDF (`window.print()`).
   - Sem criação de abas adicionais, preservando todas as seções e dados existentes.

---

## 6. Verificação e Testes

- Validação das 15 combinações interpretativas com os textos literais fornecidos.
- Validação das faixas de corte: 0-49% (Baixa), 50-69% (Moderada) e 70-100% (Alta).
- Verificação de responsividade (Desktop 1440px, Tablet e Mobile 375px).
- Compilação via `npm run build` e verificação de tipagem (`tsc --noEmit`).
