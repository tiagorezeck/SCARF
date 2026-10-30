// Biblioteca Oficial do Mapa de Sensibilidade Social SCARF — Instituto COMET
// Metodologia: 5 dimensões em português e 3 faixas de sensibilidade (Baixa, Moderada, Alta).
// Biblioteca determinística fixa com as 15 interpretações oficiais.

import { ScarfDomain } from './scarf-data'

export type CometSensitivityLevel = 'baixa' | 'moderada' | 'alta'

export interface CometDimensionMeta {
  code: 'S' | 'C' | 'A' | 'R' | 'F'
  domainKey: ScarfDomain
  name: string
  needDescription: string
}

export interface CometTierInterpretation {
  level: CometSensitivityLevel
  levelLabel: string // "Baixa", "Moderada", "Alta"
  levelRangeLabel: string // "0% a 49%", "50% a 69%", "70% a 100%"
  shortMeaning: string
  positivePotential: string
  possibleLimitation: string
}

export const COMET_DIMENSIONS: Record<ScarfDomain, CometDimensionMeta> = {
  status: {
    code: 'S',
    domainKey: 'status',
    name: 'Reconhecimento',
    needDescription: 'Valorização, importância e reconhecimento social.',
  },
  certeza: {
    code: 'C',
    domainKey: 'certeza',
    name: 'Previsibilidade',
    needDescription: 'Clareza, segurança e previsibilidade.',
  },
  autonomia: {
    code: 'A',
    domainKey: 'autonomia',
    name: 'Autonomia',
    needDescription: 'Liberdade de escolha e controle sobre as próprias ações.',
  },
  relacionamento: {
    code: 'R',
    domainKey: 'relacionamento',
    name: 'Conexão',
    needDescription: 'Confiança, vínculos e pertencimento.',
  },
  justica: {
    code: 'F',
    domainKey: 'justica',
    name: 'Justiça',
    needDescription: 'Imparcialidade, transparência e tratamento justo.',
  },
}

export const COMET_ORDER: ScarfDomain[] = ['status', 'certeza', 'autonomia', 'relacionamento', 'justica']

export function getCometSensitivity(pct: number): CometSensitivityLevel {
  if (pct >= 70) return 'alta'
  if (pct >= 50) return 'moderada'
  return 'baixa'
}

export const COMET_INTERPRETATIONS: Record<
  ScarfDomain,
  Record<CometSensitivityLevel, CometTierInterpretation>
> = {
  // DIMENSÃO 1 — RECONHECIMENTO (S)
  status: {
    baixa: {
      level: 'baixa',
      levelLabel: 'Sensibilidade baixa',
      levelRangeLabel: '0% a 49%',
      shortMeaning:
        'Independência em relação a status ou reconhecimento formal, com foco na realização pessoal.',
      positivePotential:
        'Não depende de cargos pomposos, reconhecimento público ou status social para se sentir realizado. Pode demonstrar simplicidade, independência e menor necessidade de aprovação externa. Tende a valorizar mais a satisfação pessoal, a liberdade e o significado das próprias conquistas do que a posição que ocupa perante os outros.',
      possibleLimitation:
        'Pode desenvolver pouca ambição direcionada ao crescimento profissional, acomodar-se em posições confortáveis, deixar de buscar novas oportunidades e não demonstrar todo o seu potencial. Em determinadas situações, pode subestimar a importância do reconhecimento, tanto para si quanto para as pessoas ao seu redor, deixando de valorizar conquistas e contribuições.',
    },
    moderada: {
      level: 'moderada',
      levelLabel: 'Sensibilidade moderada',
      levelRangeLabel: '50% a 69%',
      shortMeaning:
        'Equilíbrio entre a apreciação do reconhecimento profissional e a satisfação intrínseca.',
      positivePotential:
        'Valoriza reconhecimento e conquistas, mas não depende constantemente da aprovação externa para manter sua satisfação. Pode equilibrar realização pessoal, reconhecimento profissional e desenvolvimento, buscando crescimento sem necessariamente precisar demonstrar suas conquistas o tempo todo.',
      possibleLimitation:
        'Pode oscilar entre buscar reconhecimento e desconsiderar sua importância. Em determinadas situações, pode deixar oportunidades passarem por não dar a devida importância à própria valorização ou, em outros momentos, sentir frustração quando seu esforço não é reconhecido.',
    },
    alta: {
      level: 'alta',
      levelLabel: 'Sensibilidade alta',
      levelRangeLabel: '70% a 100%',
      shortMeaning:
        'Forte direcionamento para a excelência, o destaque profissional e a validação do mérito.',
      positivePotential:
        'Pode apresentar forte ambição, desejo de crescimento, busca por excelência e motivação para conquistar reconhecimento por seus resultados. Tende a valorizar suas conquistas, buscar evolução profissional e empenhar-se para alcançar posições de destaque.',
      possibleLimitation:
        'Pode desenvolver dependência de aprovação, competitividade excessiva, preocupação exagerada com a própria imagem e dificuldade em lidar com críticas ou falta de reconhecimento. Em determinadas situações, pode priorizar a aparência de sucesso em detrimento da satisfação pessoal ou do desenvolvimento coletivo.',
    },
  },

  // DIMENSÃO 2 — PREVISIBILIDADE (C)
  certeza: {
    baixa: {
      level: 'baixa',
      levelLabel: 'Sensibilidade baixa',
      levelRangeLabel: '0% a 49%',
      shortMeaning:
        'Naturalidade e adaptabilidade para agir em cenários incertos, voláteis ou pouco definidos.',
      positivePotential:
        'Pode lidar com situações incertas, mudanças inesperadas e cenários pouco definidos com maior naturalidade. Tende a demonstrar flexibilidade, espontaneidade e disposição para experimentar caminhos novos, mesmo sem ter todas as informações disponíveis.',
      possibleLimitation:
        'Pode negligenciar o planejamento, a organização e a análise de riscos. Em determinadas situações, pode tomar decisões precipitadas, subestimar consequências e deixar de oferecer informações ou orientações claras às pessoas que precisam de previsibilidade para trabalhar com segurança.',
    },
    moderada: {
      level: 'moderada',
      levelLabel: 'Sensibilidade moderada',
      levelRangeLabel: '50% a 69%',
      shortMeaning:
        'Equilíbrio funcional entre preparação cuidadosa e capacidade de manobra diante de imprevistos.',
      positivePotential:
        'Pode equilibrar planejamento e flexibilidade, valorizando informações e organização sem depender de condições totalmente previsíveis para agir. Tende a adaptar seu nível de preparação conforme a complexidade e a importância da situação.',
      possibleLimitation:
        'Pode apresentar dificuldades quando precisa decidir entre agir com informações incompletas ou esperar por maior clareza. Em momentos de mudança, pode oscilar entre a necessidade de segurança e a vontade de avançar, atrasando decisões ou gerando dúvidas.',
    },
    alta: {
      level: 'alta',
      levelLabel: 'Sensibilidade alta',
      levelRangeLabel: '70% a 100%',
      shortMeaning:
        'Priorização do planejamento rigoroso, clareza metodológica e mitigação proativa de riscos.',
      positivePotential:
        'Valoriza planejamento, organização, clareza e preparação. Pode demonstrar responsabilidade, capacidade de antecipação, atenção aos riscos e preocupação em estabelecer condições seguras para executar atividades e tomar decisões.',
      possibleLimitation:
        'Pode apresentar dificuldade diante de mudanças inesperadas, excesso de preocupação com cenários futuros e resistência a situações pouco definidas. Em determinadas circunstâncias, pode buscar tantas informações e garantias que acaba adiando decisões, limitando a experimentação e reduzindo sua capacidade de adaptação.',
    },
  },

  // DIMENSÃO 3 — AUTONOMIA (A)
  autonomia: {
    baixa: {
      level: 'baixa',
      levelLabel: 'Sensibilidade baixa',
      levelRangeLabel: '0% a 49%',
      shortMeaning:
        'Conforto para trabalhar sob diretrizes estruturadas, regras claras e condução externa.',
      positivePotential:
        'Pode demonstrar facilidade para trabalhar com orientações, regras e direcionamentos estabelecidos. Tende a adaptar-se a estruturas organizacionais, aceitar decisões coletivas e colaborar com processos definidos, sem precisar controlar constantemente a maneira como as atividades são executadas.',
      possibleLimitation:
        'Pode depender excessivamente de orientações, apresentar pouca iniciativa para tomar decisões e esperar que outras pessoas indiquem o caminho. Em determinadas situações, pode deixar de assumir responsabilidades, defender suas próprias ideias ou buscar oportunidades que exigem maior independência.',
    },
    moderada: {
      level: 'moderada',
      levelLabel: 'Sensibilidade moderada',
      levelRangeLabel: '50% a 69%',
      shortMeaning:
        'Harmonia entre iniciativa individual e alinhamento colaborativo com metas institucionais.',
      positivePotential:
        'Pode equilibrar independência e colaboração, valorizando a liberdade para tomar decisões, mas reconhecendo a importância de orientações, regras e objetivos coletivos. Tende a compreender quando precisa agir por conta própria e quando é necessário alinhar suas decisões com outras pessoas.',
      possibleLimitation:
        'Pode apresentar conflitos quando sua liberdade de ação é limitada ou quando precisa seguir direcionamentos com os quais não concorda. Em algumas situações, pode hesitar entre assumir o controle e aceitar a condução de outras pessoas.',
    },
    alta: {
      level: 'alta',
      levelLabel: 'Sensibilidade alta',
      levelRangeLabel: '70% a 100%',
      shortMeaning:
        'Protagonismo, necessidade de liberdade decisória e espaço para conceber e executar.',
      positivePotential:
        'Valoriza liberdade de escolha, independência e participação nas decisões. Pode demonstrar iniciativa, protagonismo, responsabilidade e disposição para assumir desafios sem depender constantemente de orientações. Tende a buscar ambientes que ofereçam espaço para criar, decidir e executar.',
      possibleLimitation:
        'Pode apresentar resistência a controles, regras e direcionamentos, mesmo quando necessários. Em determinadas situações, pode ter dificuldade para delegar, aceitar decisões superiores, trabalhar sob supervisão ou reconhecer que a autonomia individual precisa respeitar os limites e objetivos coletivos.',
    },
  },

  // DIMENSÃO 4 — CONEXÃO (R)
  relacionamento: {
    baixa: {
      level: 'baixa',
      levelLabel: 'Sensibilidade baixa',
      levelRangeLabel: '0% a 49%',
      shortMeaning:
        'Foco pragmático nas tarefas e independência de proximidade interpessoal frequente.',
      positivePotential:
        'Pode demonstrar independência nas relações, facilidade para trabalhar individualmente e menor necessidade de integração social constante. Tende a manter o foco nas atividades e objetivos sem depender tanto de proximidade pessoal, aprovação ou pertencimento a grupos.',
      possibleLimitation:
        'Pode demonstrar distanciamento nas relações, investir pouco na construção de vínculos e não perceber quando outras pessoas precisam de acolhimento, proximidade ou integração. Em determinadas situações, pode transmitir frieza, reduzir a colaboração ou subestimar a importância da confiança nas relações profissionais.',
    },
    moderada: {
      level: 'moderada',
      levelLabel: 'Sensibilidade moderada',
      levelRangeLabel: '50% a 69%',
      shortMeaning:
        'Capacidade de construir laços de confiança preservando a objetividade e a individualidade.',
      positivePotential:
        'Valoriza relacionamentos e confiança, mas também consegue preservar sua independência. Pode equilibrar convivência, colaboração e individualidade, adaptando sua interação conforme as necessidades do ambiente e das pessoas envolvidas.',
      possibleLimitation:
        'Pode alternar entre proximidade e distanciamento, dependendo do contexto. Em determinadas situações, pode não investir suficientemente na construção de vínculos ou, ao contrário, dedicar atenção excessiva à integração social em detrimento de outras responsabilidades.',
    },
    alta: {
      level: 'alta',
      levelLabel: 'Sensibilidade alta',
      levelRangeLabel: '70% a 100%',
      shortMeaning:
        'Valorização central de vínculos humanos, acolhimento, espírito de grupo e pertencimento.',
      positivePotential:
        'Valoriza relacionamentos, confiança, pertencimento e integração. Pode demonstrar facilidade para criar vínculos, colaborar, acolher pessoas e fortalecer o espírito de grupo. Tende a reconhecer a importância das relações humanas para o funcionamento dos times.',
      possibleLimitation:
        'Pode desenvolver necessidade excessiva de aceitação, dificuldade para lidar com rejeição, desconforto diante de conflitos e resistência a tomar decisões que possam desagradar outras pessoas. Em determinadas situações, pode priorizar a harmonia dos relacionamentos em detrimento de conversas difíceis, posicionamentos necessários e resultados.',
    },
  },

  // DIMENSÃO 5 — JUSTIÇA (F)
  justica: {
    baixa: {
      level: 'baixa',
      levelLabel: 'Sensibilidade baixa',
      levelRangeLabel: '0% a 49%',
      shortMeaning:
        'Flexibilidade prática perante diferenças de tratamento e foco direto em resultados.',
      positivePotential:
        'Pode demonstrar flexibilidade diante de diferenças, compreender que nem todas as situações exigem tratamento idêntico e evitar conflitos excessivos por questões de comparação ou distribuição. Tende a concentrar sua atenção nos objetivos e resultados, sem se prender constantemente à percepção de igualdade.',
      possibleLimitation:
        'Pode tolerar situações injustas por tempo excessivo, deixar de questionar decisões incoerentes ou não perceber quando outras pessoas estão sendo prejudicadas. Em determinadas situações, pode subestimar a importância da transparência, da imparcialidade e da confiança nas relações.',
    },
    moderada: {
      level: 'moderada',
      levelLabel: 'Sensibilidade moderada',
      levelRangeLabel: '50% a 69%',
      shortMeaning:
        'Ponderação entre imparcialidade ética e compreensão de particularidades contextuais.',
      positivePotential:
        'Valoriza justiça e transparência, mas consegue considerar circunstâncias, diferenças individuais e necessidades específicas. Pode equilibrar imparcialidade e flexibilidade, compreendendo que tratar todos de maneira justa nem sempre significa oferecer exatamente as mesmas condições.',
      possibleLimitation:
        'Pode apresentar dúvidas quando precisa decidir entre manter critérios iguais ou considerar situações particulares. Em determinados contextos, pode tolerar incoerências para evitar conflitos ou demonstrar insatisfação quando percebe diferenças de tratamento que não consegue compreender.',
    },
    alta: {
      level: 'alta',
      levelLabel: 'Sensibilidade alta',
      levelRangeLabel: '70% a 100%',
      shortMeaning:
        'Compromisso inegociável com a equidade, transparência, coerência e combate a privilégios.',
      positivePotential:
        'Demonstra forte valorização da justiça, da transparência, da coerência e do respeito aos acordos. Pode defender princípios, questionar privilégios indevidos e contribuir para ambientes organizacionais mais éticos, confiáveis e imparciais.',
      possibleLimitation:
        'Pode demonstrar baixa tolerância a incoerências, privilégios e decisões que considere injustas. Em determinadas situações, pode tornar-se rígido, confrontativo ou excessivamente crítico, tendo dificuldade para compreender contextos excepcionais, negociar soluções ou aceitar decisões que não correspondam à sua percepção de justiça.',
    },
  },
}

export function getCometInterpretation(
  domain: ScarfDomain,
  pct: number
): CometTierInterpretation {
  const level = getCometSensitivity(pct)
  return COMET_INTERPRETATIONS[domain][level]
}
