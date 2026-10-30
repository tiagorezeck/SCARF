// Teste SCARF — modelo de David Rock (neurociência social).
// 5 domínios: Status, Certeza, Autonomia, Relacionamento, Justiça.
// 30 questões estruturadas (6 por domínio), mantendo o formato original de escolhas situacionais.
// Formato: 30 perguntas, 5 opções cada (a-e). Cada opção corresponde a um domínio:
//   a = Status · b = Certeza · c = Autonomia · d = Relacionamento · e = Justiça

export type ScarfDomain = 'status' | 'certeza' | 'autonomia' | 'relacionamento' | 'justica'

export interface SituationAnalysis {
  context: string
  reward: string
  threat: string
  recommendation: string
}

export interface ScarfDomainMeta {
  label: string
  en: string
  color: string
  summary: string
  description: string[]
  tip: string
  // Novas estruturas situacionais baseadas no NeuroLeadership Institute:
  situations: {
    feedback: SituationAnalysis
    meetings: SituationAnalysis
    changes: SituationAnalysis
    collaboration: SituationAnalysis
  }
  guideForPeersAndLeaders: {
    do: string[]
    dont: string[]
  }
}

export const SCARF_DOMAINS: Record<ScarfDomain, ScarfDomainMeta> = {
  status: {
    label: 'Status',
    en: 'Status',
    color: '#E11D48',
    summary: 'Importância relativa, respeito, visibilidade e valorização.',
    description: [
      'Status refere-se à necessidade social de importância comparativa, significado, respeito e estima. Não está restrito à hierarquia formal, mas à percepção de competência, visibilidade e relevância dentro de um grupo.',
      'Quando o Status é elevado, a pessoa busca desafios intelectuais ou estratégicos de impacto e gosta de sentir que suas ideias moldam os rumos do negócio. A falta de feedback ou ser desconsiderado em decisões gera forte retração neural.',
      'No cérebro, uma ameaça ao Status ativa as mesmas redes neurais de dor física (córtex cingulado anterior dorsal). Já o reconhecimento sincero e a atribuição de projetos nobres ativam o circuito de recompensa no estriado.',
    ],
    tip: 'Busque projetos que ampliem sua maestria técnica e reputação; assuma a liderança de frentes desafiadoras.',
    situations: {
      feedback: {
        context: 'Devolutivas de Desempenho e Críticas',
        reward: 'Elogio individualizado que valorize o diferencial e a maestria entregue.',
        threat: 'Críticas públicas ou comparações depreciativas com pares da equipe.',
        recommendation: 'Realize feedbacks sempre em particular e convide o profissional a autoavaliar suas entregas antes de apontar pontos de ajuste.',
      },
      meetings: {
        context: 'Reuniões e Tomadas de Decisão',
        reward: 'Ter sua opinião solicitada nominalmente antes da batida do martelo.',
        threat: 'Ser ignorado, interrompido frequentemente ou desconsiderado na pauta.',
        recommendation: 'Destaque o protagonismo de suas análises e conceda espaço formal para exposição de ideias.',
      },
      changes: {
        context: 'Reestruturações e Novas Diretrizes',
        reward: 'Ser envolvido como embaixador ou ponto focal da nova fase.',
        threat: 'Sentir que a mudança diminuiu seu escopo, prestígio ou influência.',
        recommendation: 'Deixe evidente como o novo desenho organizacional expande seu impacto e relevância estratégica.',
      },
      collaboration: {
        context: 'Trabalho em Equipe e Divisão de Tarefas',
        reward: 'Liderar frentes estratégicas ou atuar como referência técnica consultiva.',
        threat: 'Receber apenas atividades operacionais sem visibilidade ou poder de voz.',
        recommendation: 'Combine entregas de alta visibilidade com mentoria de membros mais novos da equipe.',
      },
    },
    guideForPeersAndLeaders: {
      do: [
        'Reconheça publicamente as contribuições exclusivas e o mérito das conquistas.',
        'Peça seus conselhos e opiniões em tópicos estratégicos de alta complexidade.',
        'Ofereça oportunidades de aprendizado que elevem suas credenciais e maestria.',
      ],
      dont: [
        'Nunca o corrija ou desautorize na frente de colegas ou clientes.',
        'Evite dar feedbacks genéricos que ignorem o esforço e a dedicação dedicados.',
        'Não retire projetos de sua responsabilidade sem uma conversa franca e fundamentada.',
      ],
    },
  },
  certeza: {
    label: 'Certeza',
    en: 'Certainty',
    color: '#2563EB',
    summary: 'Previsibilidade, clareza, processos e planejamento.',
    description: [
      'O cérebro é uma máquina de previsão de padrões. Para quem tem Certeza alta, ambiguidades geram sobrecarga metabólica e ativam o circuito de erro no córtex pré-frontal, resultando em estresse elevado.',
      'Pessoas guiadas pela Certeza destacam-se pelo rigor metodológico, organização de fluxos, cumprimento de prazos e minimização de riscos operacionais. São os guardiões da solidez em qualquer operação.',
      'Gatilhos de recompensa surgem com pautas antecipadas, acordos explícitos, métricas transparentes e transparência sobre os próximos passos da equipe.',
    ],
    tip: 'Antecipe alinhamentos, faça perguntas de clareza e estabeleça planos de contingência estruturados.',
    situations: {
      feedback: {
        context: 'Devolutivas de Desempenho e Críticas',
        reward: 'Critérios objetivos com fatos, dados e cronograma claro para reavaliação.',
        threat: 'Feedbacks vagos como "você precisa melhorar sua postura" sem parâmetros definidos.',
        recommendation: 'Estruture o feedback com plano de ação detalhado: o que foi feito, o desvio e o marco temporal esperado.',
      },
      meetings: {
        context: 'Reuniões e Tomadas de Decisão',
        reward: 'Pauta enviada previamente com objetivo e duração delimitados.',
        threat: 'Reuniões improvisadas de última hora sem foco ou sem fechamento claro.',
        recommendation: 'Compartilhe materiais com 24h de antecedência e encerre registrando responsáveis e prazos.',
      },
      changes: {
        context: 'Reestruturações e Novas Diretrizes',
        reward: 'Cronograma de transição por fases com clareza dos impactos imediatos.',
        threat: 'Rumores de corredores e avisos repentinos de mudança de rumo sem contexto.',
        recommendation: 'Comunique o "porquê", o "o quê" e o "quando" da mudança, mesmo que o plano ainda esteja em construção.',
      },
      collaboration: {
        context: 'Trabalho em Equipe e Divisão de Tarefas',
        reward: 'Matriz de responsabilidades transparente (RACI) e papéis delimitados.',
        threat: 'Fronteiras difusas de atribuições e sobreposições confusas de papéis.',
        recommendation: 'Defina quem faz o quê e qual o padrão de entrega esperado para cada etapa.',
      },
    },
    guideForPeersAndLeaders: {
      do: [
        'Compartilhe agendas, cronogramas e objetivos com antecedência.',
        'Explique o racional e a lógica das decisões antes de solicitar a execução.',
        'Cumpra os prazos e acordos firmados ou avise com margem se houver desvio.',
      ],
      dont: [
        'Não mude prioridades subitamente sem explicar o motivo operacional.',
        'Evite deixar mensagens enigmáticas como "precisamos conversar depois" sem assunto.',
        'Não tolere ambiguidades nos requisitos de um projeto.',
      ],
    },
  },
  autonomia: {
    label: 'Autonomia',
    en: 'Autonomy',
    color: '#7C3AED',
    summary: 'Liberdade de escolha, protagonismo e controle sobre o trabalho.',
    description: [
      'A percepção de escolha e controle pessoal tem impacto comprovado na saúde mental e cardiovascular. Ter responsabilidade sem poder decisório correspondente é uma das maiores causas de burnout corporativo.',
      'Profissionais com Autonomia dominante prosperam quando recebem o objetivo final ("o quê") e têm liberdade total para desenhar os meios ("como"). Detestam controle minucioso e rotinas rígidas sem sentido.',
      'Quando sentem que estão no controle do seu ritmo e estratégias, seu nível de engajamento intrínseco atinge o patamar máximo de produtividade.',
    ],
    tip: 'Negocie escopos baseados em resultados e entregáveis, preservando sua flexibilidade de execução.',
    situations: {
      feedback: {
        context: 'Devolutivas de Desempenho e Críticas',
        reward: 'Espaço para diagnosticar seus próprios pontos fortes e definir seu plano de evolução.',
        threat: 'Imposição de receitas prontas ou prescrição detalhada de como deve se comportar.',
        recommendation: 'Faça perguntas reflexivas: "Como você avalia essa entrega e como prefere abordar na próxima?".',
      },
      meetings: {
        context: 'Reuniões e Tomadas de Decisão',
        reward: 'Ter autoridade para deliberar sobre sua frente sem necessitar de aprovações em cascata.',
        threat: 'Microgerenciamento com exigência de prestação de contas diária detalhada.',
        recommendation: 'Estabeleça pontos de checagem quinzenais focados no resultado final, não nas microetapas.',
      },
      changes: {
        context: 'Reestruturações e Novas Diretrizes',
        reward: 'Poder escolher como adaptar sua rotina e ferramentas ao novo cenário.',
        threat: 'Regras inflexíveis de procedimento que eliminem o poder de manobra individual.',
        recommendation: 'Apresente os objetivos globais da mudança e convide-o a desenhar sua própria metodologia de transição.',
      },
      collaboration: {
        context: 'Trabalho em Equipe e Divisão de Tarefas',
        reward: 'Responsabilidade ponta a ponta por um bloco de entrega independente.',
        threat: 'Trabalho com dependências excessivas onde cada passo requer validação de terceiros.',
        recommendation: 'Delegue a posse integral de subsistemas ou frentes autônomas do projeto.',
      },
    },
    guideForPeersAndLeaders: {
      do: [
        'Defina as metas e expectativas com clareza e saia do caminho da execução.',
        'Ofereça opções de escolha sempre que possível (ex: "Você prefere A ou B?").',
        'Confie na sua capacidade de encontrar as melhores soluções técnicas.',
      ],
      dont: [
        'Evite microgerenciamento ou cobranças frequentes sobre métodos de trabalho.',
        'Não tome decisões sobre o dia a dia dele sem consultá-lo previamente.',
        'Não imponha restrições burocráticas sem uma justificativa sólida.',
      ],
    },
  },
  relacionamento: {
    label: 'Relacionamento',
    en: 'Relatedness',
    color: '#059669',
    summary: 'Pertencimento, conexão humana, confiança e sinergia de equipe.',
    description: [
      'Evolutivamente, estar fora do grupo significava morte. Para o cérebro social, conexões interpessoais seguras ativam liberação de ocitocina, gerando confiança mútua e resiliência emocional.',
      'Quem tem Relacionamento dominante coloca as pessoas no centro: valoriza o clima psicológico, a camaradagem, a escuta ativa e o espírito de comunidade. Sofre em ambientes frios, transacionais ou hipercompetitivos.',
      'Gatilhos de recompensa incluem momentos informais de bate-papo, apoio mútuo em momentos de sobrecarga e a sensação genuína de que "estamos juntos nessa jornada".',
    ],
    tip: 'Cultive conexões genuínas e promova momentos de integração; evite o isolamento em tarefas solitárias.',
    situations: {
      feedback: {
        context: 'Devolutivas de Desempenho e Críticas',
        reward: 'Conversa afetuosa e empática que reafirme o valor do vínculo profissional.',
        threat: 'Feedbacks mecânicos, frios ou desprovidos de conexão emocional.',
        recommendation: 'Inicie criando uma ponte pessoal genuína e mostre que o feedback é um ato de cuidado com seu crescimento.',
      },
      meetings: {
        context: 'Reuniões e Tomadas de Decisão',
        reward: 'Check-in humano inicial ("Como você está?") e incentivo à cocriação coletiva.',
        threat: 'Interações estritamente tecnicistas onde os sentimentos são desconsiderados.',
        recommendation: 'Reserve 5 minutos iniciais para acolhimento e escuta antes de entrar nas pautas duras.',
      },
      changes: {
        context: 'Reestruturações e Novas Diretrizes',
        reward: 'Espaço seguro para desabafar e expressar inseguranças sem medo de julgamento.',
        threat: 'Ruptura repentina de equipes e perda súbita do convívio com parceiros de confiança.',
        recommendation: 'Dê tempo para a equipe processar a transição junta e planeje rituais de despedida e integração.',
      },
      collaboration: {
        context: 'Trabalho em Equipe e Divisão de Tarefas',
        reward: 'Projetos em pares ou grupos colaborativos orientados ao bem comum.',
        threat: 'Competição interna, silos departamentais ou isolamento prolongado.',
        recommendation: 'Aloque-o em frentes que exijam facilitação de grupos e articulação entre pessoas.',
      },
    },
    guideForPeersAndLeaders: {
      do: [
        'Dedique tempo para conversar sobre como ele está além das tarefas profissionais.',
        'Estimule o espírito de time e valorize o trabalho colaborativo.',
        'Seja transparente e construa uma relação pautada na vulnerabilidade e na lealdade.',
      ],
      dont: [
        'Evite tratamentos puramente transacionais ("só me mande o relatório").',
        'Não o isole em funções 100% solitárias por longos períodos.',
        'Não minimize conflitos emocionais ou a dor de rompimento de vínculos na equipe.',
      ],
    },
  },
  justica: {
    label: 'Justiça',
    en: 'Fairness',
    color: '#D97706',
    summary: 'Equidade, regras claras, transparência e imparcialidade.',
    description: [
      'A percepção de injustiça ativa a ínsula anterior (a mesma área cerebral que reage a odores repugnantes e repugnância física). Injustiça corporativa gera repulsa visceral, quebrando a lealdade institucional.',
      'Profissionais movidos por Justiça são defensores incansáveis da transparência: exigem regras uniformes para todos, repudiam privilégios velados e protegem colegas que estejam em desvantagem injusta.',
      'A recompensa por equidade é sentida quando há meritocracia real, transparência nos critérios de promoção e distribuição equilibrada de cobranças e oportunidades.',
    ],
    tip: 'Busque compreender o contexto das decisões antes de interpretá-las como injustiça deliberada.',
    situations: {
      feedback: {
        context: 'Devolutivas de Desempenho e Críticas',
        reward: 'Demonstração de que a mesma régua e critérios foram aplicados a todos os colaboradores.',
        threat: 'Tratamentos discrepantes ou percepção de protecionismo a terceiros.',
        recommendation: 'Apresente os referenciais globais de avaliação para comprovar a imparcialidade do processo.',
      },
      meetings: {
        context: 'Reuniões e Tomadas de Decisão',
        reward: 'Debates francos com regras claras de tempo e fala para todos os presentes.',
        threat: 'Decisões tomadas "por baixo dos panos" antes da reunião formal.',
        recommendation: 'Mantenha total transparência sobre premissas e variáveis consideradas na decisão.',
      },
      changes: {
        context: 'Reestruturações e Novas Diretrizes',
        reward: 'Sacrifícios ou bônus compartilhados proporcionalmente por todos os níveis.',
        threat: 'Medidas em que a equipe operacional arca com custos enquanto a liderança é poupada.',
        recommendation: 'Demonstre a proporcionalidade e a razoabilidade da mudança para todos os envolvidos.',
      },
      collaboration: {
        context: 'Trabalho em Equipe e Divisão de Tarefas',
        reward: 'Carga de trabalho balanceada e reconhecimento justo do esforço de cada um.',
        threat: 'Membros da equipe que se escoram no trabalho alheio sem consequências.',
        recommendation: 'Monitore o balanceamento de demandas para evitar que os mais produtivos fiquem sobrecarregados.',
      },
    },
    guideForPeersAndLeaders: {
      do: [
        'Seja transparente em relação a critérios de avaliação, bônus e promoções.',
        'Pratique o que prega e cumpra as regras institucionais com rigor ético.',
        'Ouça os dois lados de uma controvérsia antes de emitir qualquer veredito.',
      ],
      dont: [
        'Nunca tolere favoritismo, concessões veladas ou protecionismo corporativo.',
        'Não prometa nada que não possa cumprir de forma justa para todos.',
        'Não esconda informações cruciais sob o manto de falsos pretextos.',
      ],
    },
  },
}

export const SCARF_ORDER: ScarfDomain[] = ['status', 'certeza', 'autonomia', 'relacionamento', 'justica']

// ─────────────────────────────────────────────────────────────────────────────
// DIAGNÓSTICO EM 3 NÍVEIS PARA CADA UM DOS 5 DOMÍNIOS SCARF
// Baseado na metodologia de David Rock (NeuroLeadership Institute):
//   • Acima de 70% (>= 70%): Nível Alto (Gatilho Primário / Alta Sensibilidade)
//   • 50% a 69% (50% a 69%): Nível Médio (Zona Neutra / Equilíbrio Situacional)
//   • Abaixo de 50% (< 50%): Nível Baixo (Baixa Sensibilidade / Alerta de Ponto Cego)
// ─────────────────────────────────────────────────────────────────────────────

export type DomainTierLevel = 'alto' | 'medio' | 'baixo'

export interface DomainTierData {
  level: DomainTierLevel
  rangeLabel: string
  tierName: string
  neuroAnalysis: string
  dailyBehavior: string
  blindspotOrRisk: string
  leadershipAction: {
    forSelf: string
    forLeaderAndPeers: string
  }
}

export function getDomainTier(pct: number): DomainTierLevel {
  if (pct >= 70) return 'alto'
  if (pct >= 50) return 'medio'
  return 'baixo'
}

export const DOMAIN_TIERS: Record<ScarfDomain, Record<DomainTierLevel, DomainTierData>> = {
  status: {
    alto: {
      level: 'alto',
      rangeLabel: 'Acima de 70%',
      tierName: 'Alta Sensibilidade — Gatilho Primário de Engajamento',
      neuroAnalysis:
        'Seu cérebro processa o reconhecimento e o prestígio como estímulos de altíssima recompensa dopaminérgica no estriado ventral. Em contrapartida, qualquer desconsideração pública, desautorização ou sensação de desvalorização ativa prontamente o córtex cingulado anterior dorsal, provocando dor social equiparável ao desconforto físico e imediata retração neural.',
      dailyBehavior:
        'Você é intensamente movido pela busca da excelência, maestria técnica e relevância. Destaca-se por assumir projetos desafiadores de alto impacto e gosta de sentir que suas ideias moldam os rumos do negócio. Sua produtividade atinge o ápice quando seu mérito exclusivo é validado de forma autêntica.',
      blindspotOrRisk:
        'Risco de interpretar divergências técnicas como ataques pessoais à sua credibilidade profissional, ou sentir frustração desproporcional em culturas corporativas com baixa tradição de devolutiva e elogio.',
      leadershipAction: {
        forSelf: 'Fortaleça sua autoeficácia interna e ancore sua autoestima nos resultados entregues, mitigando a dependência de validações externas contínuas.',
        forLeaderAndPeers: 'Reconheça nominalmente suas contribuições singulares, peça suas opiniões em tópicos estratégicos e nunca o corrija ou desautorize diante de terceiros.',
      },
    },
    medio: {
      level: 'medio',
      rangeLabel: '50% a 69%',
      tierName: 'Sensibilidade Moderada — Equilíbrio Situacional',
      neuroAnalysis:
        'O Status opera em uma zona de estabilidade adaptativa. Seu circuito neural aprecia o respeito e a consideração profissional, mas não há hiper-reatividade ou sofrimento quando você precisa trabalhar nos bastidores ou quando o mérito é compartilhado difusamente por todo o grupo.',
      dailyBehavior:
        'Você transita com maturidade tanto na linha de frente quanto no suporte operacional. Valoriza o reconhecimento justo, mas não faz dele a condição indispensável para entregar excelência. Reage com serenidade e postura reflexiva mesmo em cenários de pouca visibilidade política.',
      blindspotOrRisk:
        'Pode eventualmente acomodar-se em posições coadjuvantes e esquecer-se de reivindicar a visibilidade e as oportunidades que legitimamente merece.',
      leadershipAction: {
        forSelf: 'Não hesite em posicionar estrategicamente suas vitórias e defender seu espaço de protagonismo em momentos-chave de evolução na carreira.',
        forLeaderAndPeers: 'Forneça feedbacks objetivos de progresso e mantenha um canal aberto de escuta técnica, sem a necessidade de cerimônias pomposas.',
      },
    },
    baixo: {
      level: 'baixo',
      rangeLabel: 'Abaixo de 50%',
      tierName: 'Baixa Sensibilidade — Ponto Cego na Convivência',
      neuroAnalysis:
        'Hierarquias formais, títulos de cargo e visibilidade comparativa exercem baixíssimo impacto sobre o seu circuito de ameaça ou recompensa. Você possui altíssima resiliência à ausência de elogios e uma imunidade natural contra politicagens corporativas.',
      dailyBehavior:
        'Você é genuinamente focado na entrega prática, descomplicado e imune a vaidades organizacionais. Sente-se confortável atuando nos bastidores e prefere a resolução concreta de problemas a disputas por holofotes.',
      blindspotOrRisk:
        'ALERTA DE PONTO CEGO: Como você não necessita de elogios frequentes para produzir, tende a achar dispensável elogiar liderados ou colegas que têm Status elevado. Essa postura pode ser lida pelos outros como frieza, descaso ou falta de consideração pelo esforço dedicado.',
      leadershipAction: {
        forSelf: 'Exercite intencionalmente a prática do elogio nominal aos seus colegas e liderados. Lembre-se de que para quem tem Status alto, o reconhecimento é o combustível principal da motivação.',
        forLeaderAndPeers: 'Alinhe expectativas diretas, foque nos resultados práticos e dispense bajulações artificiais.',
      },
    },
  },
  certeza: {
    alto: {
      level: 'alto',
      rangeLabel: 'Acima de 70%',
      tierName: 'Alta Sensibilidade — Necessidade Primária de Previsibilidade',
      neuroAnalysis:
        'Seu córtex pré-frontal funciona como um meticuloso decodificador de padrões. A ausência de clareza ou diretrizes ambíguas gera sobrecarga metabólica e ativa o circuito de erro neural, elevando os níveis de cortisol e provocando ansiedade, ruminação e perda de foco cognitivo.',
      dailyBehavior:
        'Você é o alicerce de solidez e previsibilidade de qualquer time: planeja com antecipação, documenta processos, mapeia riscos com precisão cirúrgica e cumpre cronogramas à risca. Transmite extrema segurança e estabilidade operacional.',
      blindspotOrRisk:
        'Risco de lentidão na tomada de decisões em cenários de alta volatilidade ("paralisia por análise") e desconforto acentuado diante de mudanças bruscas de prioridades de última hora.',
      leadershipAction: {
        forSelf: 'Pratique a aceitação de que a incerteza é inerente ao ambiente de negócios; desenhe planos de contingência em vez de exigir garantias absolutas antes de agir.',
        forLeaderAndPeers: 'Compartilhe pautas prévias, cronogramas detalhados e o racional estruturado de qualquer mudança antes de cobrar a execução.',
      },
    },
    medio: {
      level: 'medio',
      rangeLabel: '50% a 69%',
      tierName: 'Sensibilidade Moderada — Equilíbrio Situacional',
      neuroAnalysis:
        'Seu cérebro prefere orientações claras e metas definidas, mas possui excelente plasticidade cognitiva para conviver com desvios de rota e incertezas moderadas sem entrar em estado de estresse reativo.',
      dailyBehavior:
        'Combina rigor com maleabilidade: organiza fluxos e define parâmetros básicos, mas consegue pivotar e criar soluções de contorno com rapidez quando o planejamento inicial não sobrevive ao contato com a realidade.',
      blindspotOrRisk:
        'Pode alternar entre rigor excessivo em projetos favoritos e flexibilização arriscada de controles em momentos de correria.',
      leadershipAction: {
        forSelf: 'Estabeleça marcos de controle apenas para os pontos críticos do projeto, preservando margens para inovação e adaptação espontânea.',
        forLeaderAndPeers: 'Defina o objetivo macro e as premissas essenciais, mantendo transparência sem sobrecarregar com excesso de minúcias burocráticas.',
      },
    },
    baixo: {
      level: 'baixo',
      rangeLabel: 'Abaixo de 50%',
      tierName: 'Baixa Sensibilidade — Ponto Cego na Convivência',
      neuroAnalysis:
        'Você possui um limiar extraordinariamente alto para navegar na ambiguidade. Cenários abertos, indefinidos ou de experimentação contínua não ativam seu alarme de ameaça; ao contrário, despertam curiosidade e agilidade mental.',
      dailyBehavior:
        'Você é extremamente adaptável, destemido diante do desconhecido e excelente em momentos de crise repentina. Age com desenvoltura mesmo dispondo de apenas uma fração das informações necessárias.',
      blindspotOrRisk:
        'ALERTA DE PONTO CEGO: Por se sentir em casa no improviso, você pode alterar planos e prioridades de última hora sem comunicar formalmente a equipe, provocando desorientação e estresse paralisante em liderados e pares que dependem de Certeza.',
      leadershipAction: {
        forSelf: 'Antes de mudar de direção, documente o novo caminho e avise seus pares com antecedência. O que para você parece dinamismo inovador, para os outros soa como desgoverno desorganizado.',
        forLeaderAndPeers: 'Aproveite sua vocação para desbravar frentes novas e projetos exploratórios de alta ambiguidade.',
      },
    },
  },
  autonomia: {
    alto: {
      level: 'alto',
      rangeLabel: 'Acima de 70%',
      tierName: 'Alta Sensibilidade — Necessidade Primária de Liberdade e Controle',
      neuroAnalysis:
        'A percepção de livre arbítrio e poder de decisão ativa profundamente os centros de recompensa intrínseca do seu cérebro. Por outro lado, o microgerenciamento ou ordens excessivamente prescritivas ativam uma resposta de asfixia e aversão neural, derrubando imediatamente sua motivação.',
      dailyBehavior:
        'Você é altamente proativo, autodirigido e empreendedor. Produz em estado de fluxo quando recebe o resultado esperado e tem ampla liberdade para conceber suas próprias soluções. Destesta amarras burocráticas sem propósito.',
      blindspotOrRisk:
        'Tendência a resistir a rotinas corporativas padronizadas, relutância em prestar contas com frequência e propensão a ser visto como excessivamente independente ou isolado da equipe.',
      leadershipAction: {
        forSelf: 'Compreenda que alinhamentos e prestações de contas são instrumentos de governança e confiança mútua, não instrumentos de vigilância pessoal.',
        forLeaderAndPeers: 'Adote a liderança por contexto: acorde as metas e limites orçamentários ("o quê") e conceda total liberdade de escolha na metodologia ("como").',
      },
    },
    medio: {
      level: 'medio',
      rangeLabel: '50% a 69%',
      tierName: 'Sensibilidade Moderada — Equilíbrio Situacional',
      neuroAnalysis:
        'Você valoriza a autonomia em suas entregas cotidianas, mas compreende com naturalidade que o trabalho em equipe exige sincronismo e obediência a diretrizes corporativas, adaptando-se sem conflito interno.',
      dailyBehavior:
        'Sabe atuar com independência quando o escopo é delegado, mas opera com igual disciplina dentro de processos já consolidados. Não encara feedbacks ou acompanhamentos da gestão como invasão indevida de território.',
      blindspotOrRisk:
        'Em ambientes muito centralizadores, pode demorar para reivindicar autonomia adicional por comodidade ou respeito reverencial à hierarquia.',
      leadershipAction: {
        forSelf: 'Negocie ativamente espaços de criação nos projetos onde suas escolhas técnicas façam a diferença.',
        forLeaderAndPeers: 'Ofereça opções de caminhos ("Prefere estruturar pela opção A ou B?") para elevar seu nível de protagonismo e satisfação.',
      },
    },
    baixo: {
      level: 'baixo',
      rangeLabel: 'Abaixo de 50%',
      tierName: 'Baixa Sensibilidade — Ponto Cego na Convivência',
      neuroAnalysis:
        'Receber diretrizes minuciosas, manuais rígidos ou supervisão direta continuada não gera estresse ou incômodo neural. Você opera com conforto e serenidade em estruturas organizacionais prescritivas e bem balizadas.',
      dailyBehavior:
        'Você é um executor leal e consistente de diretrizes consolidadas. Segue padrões com fidelidade, respeita decisões superiores e sente-se mais seguro quando o rumo está explicitamente traçado por outrem.',
      blindspotOrRisk:
        'ALERTA DE PONTO CEGO: Como líder ou colega, você tende a dizer minuciosamente como as coisas devem ser feitas, monitorando cada passo alheio. Para colaboradores com alta Autonomia, essa postura soa como sufocante microgerenciamento e desconfiança destrutiva.',
      leadershipAction: {
        forSelf: 'Ao delegar uma tarefa, resista à vontade de prescrever cada microetapa. Pergunte ao outro: "Como você prefere executar essa meta?" e dê espaço para sua autoria.',
        forLeaderAndPeers: 'Forneça instruções claras de partida, suporte de retaguarda e validação estruturada dos resultados intermediários.',
      },
    },
  },
  relacionamento: {
    alto: {
      level: 'alto',
      rangeLabel: 'Acima de 70%',
      tierName: 'Alta Sensibilidade — Necessidade Primária de Conexão e Confiança',
      neuroAnalysis:
        'Seu cérebro social é altamente sintonizado com os laços interpessoais e a segurança do grupo. Vínculos autênticos e atmosfera acolhedora liberam ocitocina e serotonina, maximizando sua cooperação e resiliência. A indiferença, a frieza ou a rivalidade interna acionam o alarme visceral de isolamento.',
      dailyBehavior:
        'Você coloca o fator humano no coração de qualquer iniciativa. Constrói pontes duradouras, promove a sinergia da equipe, escuta ativamente e cuida do clima psicológico. Transforma grupos de trabalho dispersos em verdadeiras comunidades de apoio mútuo.',
      blindspotOrRisk:
        'Dificuldade para conduzir conversas difíceis ou aplicar cobranças rigorosas por medo de romper laços afetivos; risco de absorver em excesso os problemas e tensões emocionais de colegas.',
      leadershipAction: {
        forSelf: 'Lembre-se de que a clareza e o feedback sincero sobre problemas são demonstrações profundas de respeito e cuidado com a evolução do outro.',
        forLeaderAndPeers: 'Dedique tempo para conexões humanas autênticas no início de reuniões ("Como você está?") antes de entrar nos temas técnicos e demandas formais.',
      },
    },
    medio: {
      level: 'medio',
      rangeLabel: '50% a 69%',
      tierName: 'Sensibilidade Moderada — Equilíbrio Situacional',
      neuroAnalysis:
        'Você valoriza o bom convívio, a camaradagem e o respeito coletivo, mas sua capacidade de concentração e entrega profissional não é refém do nível de proximidade afetiva imediata dos membros do time.',
      dailyBehavior:
        'Mantém postura empática e cordial, porém com boundaries profissionais sólidos. Trabalha em harmonia com perfis variados sem necessitar de envolvimento íntimo pessoal para cooperar com produtividade.',
      blindspotOrRisk:
        'Pode por vezes esquecer de alimentar pequenos rituais de aproximação interpessoal durante períodos de sobrecarga operacional intensa.',
      leadershipAction: {
        forSelf: 'Mantenha pequenos momentos de escuta e contato com os pares, mesmo nas semanas mais atribuladas da rotina corporativa.',
        forLeaderAndPeers: 'Cultive um ambiente profissional colaborativo e saudável, sem forçar interações sociais fora do escopo funcional.',
      },
    },
    baixo: {
      level: 'baixo',
      rangeLabel: 'Abaixo de 50%',
      tierName: 'Baixa Sensibilidade — Ponto Cego na Convivência',
      neuroAnalysis:
        'A necessidade de validação afetiva ou pertencimento gregário não influencia seus circuitos motivacionais. Seu cérebro separa com facilidade as relações afetivas da esfera funcional e dos objetivos do trabalho.',
      dailyBehavior:
        'Você é prático, direto, orientado a entregas objetivas e imune a dramas ou melindres interpessoais. Trabalha de forma autossuficiente e solitária por longos períodos sem acusar sentimento de isolamento.',
      blindspotOrRisk:
        'ALERTA DE PONTO CEGO: Sua postura pode ser interpretada por colegas como excessivamente fria, transacional ou desprovida de empatia ("só me manda o relatório e pronto"). Pessoas com Relacionamento alto podem se sentir invisíveis ou rejeitadas na sua presença.',
      leadershipAction: {
        forSelf: 'Faça o esforço consciente de investir dois minutos em cumprimentos e trocas humanas antes de iniciar cobranças operacionais. A empatia ativa alavancará sua liderança.',
        forLeaderAndPeers: 'Valorize sua objetividade e pragmatismo para resolver impasses lógicos e demandas sem ruído emocional.',
      },
    },
  },
  justica: {
    alto: {
      level: 'alto',
      rangeLabel: 'Acima de 70%',
      tierName: 'Alta Sensibilidade — Necessidade Primária de Equidade e Ética',
      neuroAnalysis:
        'A percepção de injustiça ou tratamento discrepante ativa intensamente a ínsula anterior (a mesma rede neural ligada à repulsa física e ao nojo). Privilégios velados, promessas descumpridas ou falta de transparência em critérios causam indignação visceral e quebra imediata da lealdade institucional.',
      dailyBehavior:
        'Você é a bússola ética da organização: defende a meritocracia transparente, combate favoritismos velados e luta para que as mesmas regras e cobranças sejam aplicadas de maneira igualitária a todos os integrantes do ecossistema.',
      blindspotOrRisk:
        'Risco de comprar batalhas desgastantes por desequilíbrios pontuais ou adotar uma intransigência excessiva diante de exceções contextuais legítimas.',
      leadershipAction: {
        forSelf: 'Investigue o contexto completo e os dados subjacentes antes de classificar uma situação como injustiça deliberada ou favorecimento indevido.',
        forLeaderAndPeers: 'Mantenha absoluta transparência em critérios de promoção, bonificação e distribuição de tarefas, explicando abertamente o racional de cada deliberação.',
      },
    },
    medio: {
      level: 'medio',
      rangeLabel: '50% a 69%',
      tierName: 'Sensibilidade Moderada — Equilíbrio Situacional',
      neuroAnalysis:
        'Você zela pela ética e pelo respeito mútuo, mas possui o pragmatismo cognitivo necessário para entender que as circunstâncias corporativas são dinâmicas e que exceções podem ser requeridas para viabilizar soluções estratégicas.',
      dailyBehavior:
        'Pratica a integridade com bom senso: valoriza a equidade, mas sabe navegar em negociações e consensos viáveis sem paralisar projetos por preciosismo moral ou formalismos desnecessários.',
      blindspotOrRisk:
        'Pode tolerar pequenos desníveis na distribuição de demandas por tempo demasiado antes de manifestar seu descontentamento aos gestores.',
      leadershipAction: {
        forSelf: 'Manifeste seus questionamentos sobre equilíbrio de demandas de forma precoce e construtiva, evitando o acúmulo de incômodos silenciosos.',
        forLeaderAndPeers: 'Assegure coerência constante entre o discurso ético institucional e as atitudes práticas tomadas na rotina da equipe.',
      },
    },
    baixo: {
      level: 'baixo',
      rangeLabel: 'Abaixo de 50%',
      tierName: 'Baixa Sensibilidade — Ponto Cego na Convivência',
      neuroAnalysis:
        'Você possui uma mentalidade altamente pragmática e utilitarista. Assimetrias na distribuição de benefícios ou esforços não acionam sua ínsula anterior, desde que o resultado global estratégico seja alcançado com sucesso.',
      dailyBehavior:
        'Você é flexível, focado na resolução prática de problemas e confortável com tratamentos diferenciados, exceções negociadas e decisões táticas que acelerem os resultados do negócio.',
      blindspotOrRisk:
        'ALERTA DE PONTO CEGO: Você corre o risco de criar tratamentos privilegiados, mudar regras no meio do jogo ou sobrecarregar os mais eficientes sem perceber a profunda revolta e desmotivação que isso engendra naqueles que valorizam a Justiça.',
      leadershipAction: {
        forSelf: 'Antes de aplicar exceções ou alterar critérios acordados, explique a lógica com clareza para toda a equipe para evitar a impressão de protecionismo ou arbitrariedade.',
        forLeaderAndPeers: 'Envolva-o em negociações estratégicas de alta complexidade onde a flexibilidade tática seja uma vantagem competitiva.',
      },
    },
  },
}

export function getDomainTierData(domain: ScarfDomain, pct: number): DomainTierData {
  const level = getDomainTier(pct)
  return DOMAIN_TIERS[domain][level]
}

// ─────────────────────────────────────────────────────────────────────────────
// MAPA DE SENSIBILIDADE SOCIAL (CARDS DE SENSIBILIDADE INSTITUTO COMET)
// ─────────────────────────────────────────────────────────────────────────────

export type SensitivityLevel = 'alta' | 'moderada' | 'baixa'

export interface SocialSensitivityCard {
  domain: ScarfDomain
  letter: 'S' | 'C' | 'A' | 'R' | 'F'
  title: string
  subtitle: string
  interpretacao: string
  potencialPositivo: string
  possivelLimitacao: string
}

export const SOCIAL_SENSITIVITY_MAP: Record<
  ScarfDomain,
  {
    letter: 'S' | 'C' | 'A' | 'R' | 'F'
    title: string
    subtitle: string
    levels: Record<
      SensitivityLevel,
      {
        interpretacao: string
        potencialPositivo: string
        possivelLimitacao: string
      }
    >
  }
> = {
  status: {
    letter: 'S',
    title: 'Reconhecimento',
    subtitle: 'Valorização, importância e reconhecimento social.',
    levels: {
      alta: {
        interpretacao: 'Forte direcionamento para a excelência, o destaque profissional e a validação do mérito.',
        potencialPositivo:
          'Pode apresentar forte ambição, desejo de crescimento, busca por excelência e motivação para conquistar reconhecimento por seus resultados. Tende a valorizar suas conquistas, buscar evolução profissional e empenhar-se para alcançar posições de destaque.',
        possivelLimitacao:
          'Pode apresentar sensibilidade a críticas desfavoráveis, frustração quando o mérito não é destacado publicamente ou tendência a priorizar o reconhecimento individual sobre o coletivo.',
      },
      moderada: {
        interpretacao: 'Equilíbrio entre valorização do mérito pessoal e satisfação em contribuir nos bastidores.',
        potencialPositivo:
          'Aprecia o reconhecimento sincero e a evolução profissional, mas não depende de aplausos constantes para se manter engajado. Sabe compartilhar méritos e atua com maturidade em funções de suporte.',
        possivelLimitacao:
          'Pode por vezes não reivindicar o espaço ou a visibilidade que legitimamente merece, aceitando ficar em segundo plano em momentos decisivos de promoção.',
      },
      baixa: {
        interpretacao: 'Foco integral na entrega prática, simplicidade e desapego a títulos ou hierarquias formais.',
        potencialPositivo:
          'Alta resiliência e imunidade a vaidades organizacionais. Trabalha confortavelmente sem necessidade de elogios frequentes e prioriza o resultado sobre o prestígio pessoal.',
        possivelLimitacao:
          'Pode achar dispensável elogiar ou valorizar os outros, gerando sensação de frieza ou indiferença em liderados e colegas que dependem de reconhecimento.',
      },
    },
  },
  certeza: {
    letter: 'C',
    title: 'Previsibilidade',
    subtitle: 'Clareza, segurança e previsibilidade.',
    levels: {
      alta: {
        interpretacao: 'Busca contínua por clareza estruturada, controle de riscos e antecipação de cenários.',
        potencialPositivo:
          'Excelente capacidade de organização, rigor metodológico, planejamento e prevenção de falhas. Garante que compromissos sejam cumpridos com consistência e segurança operacional.',
        possivelLimitacao:
          'Pode demonstrar ansiedade excessiva diante do improviso, lentidão para decidir sem todos os dados disponíveis e resistência a mudanças súbitas de diretriz.',
      },
      moderada: {
        interpretacao: 'Equilíbrio entre método estruturado e maleabilidade para lidar com imprevistos cotidianos.',
        potencialPositivo:
          'Organiza bem suas rotinas e fluxos, mas consegue recalcular a rota sem sofrimento quando surgem mudanças de prioridade. Une estabilidade com flexibilidade.',
        possivelLimitacao:
          'Pode oscilar entre rigor em projetos estratégicos e informalidade excessiva em controles cotidianos em períodos de correria.',
      },
      baixa: {
        interpretacao: 'Naturalidade e adaptabilidade para agir em cenários incertos, voláteis ou pouco definidos.',
        potencialPositivo:
          'Pode lidar com situações incertas, mudanças inesperadas e cenários pouco definidos com maior naturalidade. Tende a demonstrar flexibilidade, espontaneidade e disposição para experimentar caminhos novos, mesmo sem ter todas as informações disponíveis.',
        possivelLimitacao:
          'Pode negligenciar a necessidade de planejamento estruturado, mudar diretrizes sem avisar a equipe ou subestimar a importância de processos claros para colegas que necessitam de estabilidade.',
      },
    },
  },
  autonomia: {
    letter: 'A',
    title: 'Autonomia',
    subtitle: 'Liberdade de escolha e controle sobre as próprias ações.',
    levels: {
      alta: {
        interpretacao: 'Protagonismo, necessidade de liberdade decisória e espaço para conceber e executar.',
        potencialPositivo:
          'Valoriza liberdade de escolha, independência e participação nas decisões. Pode demonstrar iniciativa, protagonismo, responsabilidade e disposição para assumir desafios sem depender constantemente de orientações. Tende a buscar ambientes que ofereçam espaço para criar, decidir e executar.',
        possivelLimitacao:
          'Pode apresentar resistência a controles, regras e direcionamentos, mesmo quando necessários. Em determinadas situações, pode ter dificuldade para delegar, aceitar decisões superiores, trabalhar sob supervisão ou reconhecer que a autonomia individual precisa respeitar os limites e objetivos coletivos.',
      },
      moderada: {
        interpretacao: 'Equilíbrio entre iniciativa individual e respeito aos processos e alinhamentos de time.',
        potencialPositivo:
          'Produz com boa independência quando delegado, mas colabora de forma disciplinada dentro de diretrizes coletivas. Aceita feedbacks e acompanhamentos sem atrito.',
        possivelLimitacao:
          'Pode hesitar em tomar decisões autônomas ousadas em cenários de vácuo de liderança se esperar validação formal.',
      },
      baixa: {
        interpretacao: 'Segurança em operar sob diretrizes consolidadas, processos detalhados e supervisão clara.',
        potencialPositivo:
          'Lealdade e disciplina na execução de padrões corporativos. Sente-se confortável recebendo instruções passo a passo e seguindo métodos testados com fidelidade.',
        possivelLimitacao:
          'Como gestor ou colega, pode tender a microgerenciar os outros ditando exatamente como fazer cada tarefa, sufocando pessoas que valorizam a autonomia.',
      },
    },
  },
  relacionamento: {
    letter: 'R',
    title: 'Conexão',
    subtitle: 'Confiança, vínculos e pertencimento.',
    levels: {
      alta: {
        interpretacao: 'Prioridade absoluta às pessoas, clima de confiança mútua e pertencimento coletivo.',
        potencialPositivo:
          'Constrói pontes interpessoais sólidas, promove a harmonia, cuida do bem-estar dos colegas e transforma ambientes de trabalho em equipes coesas e acolhedoras.',
        possivelLimitacao:
          'Dificuldade para conduzir confrontos necessários ou dar feedbacks duros por medo de estremecer a relação; risco de sobrecarga emocional ao absorver dores alheias.',
      },
      moderada: {
        interpretacao: 'Profissionalismo empático com limites saudáveis entre trabalho e vida pessoal.',
        potencialPositivo:
          'Mantém excelente relacionamento e coleguismo com todos, preservando a objetividade funcional. Trabalha em equipe com naturalidade sem demandar intimidade.',
        possivelLimitacao:
          'Pode em períodos de alta pressão técnica negligenciar rituais de aproximação e conversa com a equipe.',
      },
      baixa: {
        interpretacao: 'Foco pragmático nas tarefas e independência de proximidade interpessoal frequente.',
        potencialPositivo:
          'Pode demonstrar independência nas relações, facilidade para trabalhar individualmente e menor necessidade de integração social constante. Tende a manter o foco nas atividades e objetivos sem depender tanto de proximidade pessoal, aprovação ou pertencimento a grupos.',
        possivelLimitacao:
          'Pode demonstrar distanciamento nas relações, investir pouco na construção de vínculos e não perceber quando outras pessoas precisam de acolhimento, proximidade ou integração. Em determinadas situações, pode transmitir frieza, reduzir a colaboração ou subestimar a importância da confiança nas relações profissionais.',
      },
    },
  },
  justica: {
    letter: 'F',
    title: 'Justiça',
    subtitle: 'Imparcialidade, transparência e tratamento justo.',
    levels: {
      alta: {
        interpretacao: 'Compromisso intransigente com a equidade, meritocracia clara e regras uniformes.',
        potencialPositivo:
          'Defende a transparência absoluta, combate privilégios indevidos e luta para que todos recebam tratamento equilibrado e ético. Gera alto senso de confiança e retidão.',
        possivelLimitacao:
          'Pode ser excessivamente rígido ao julgar exceções contextuais ou comprar desgastes desproporcionais por pequenas divergências processuais.',
      },
      moderada: {
        interpretacao: 'Ponderação entre imparcialidade ética e compreensão de particularidades contextuais.',
        potencialPositivo:
          'Valoriza justiça e transparência, mas consegue considerar circunstâncias, diferenças individuais e necessidades específicas. Pode equilibrar imparcialidade e flexibilidade, compreendendo que tratar todos de maneira justa nem sempre significa oferecer exatamente as mesmas condições.',
        possivelLimitacao:
          'Pode apresentar dúvidas quando precisa decidir entre manter critérios iguais ou considerar situações particulares. Em determinados contextos, pode tolerar incoerências para evitar conflitos ou demonstrar insatisfação quando percebe diferenças de tratamento que não consegue compreender.',
      },
      baixa: {
        interpretacao: 'Pragmatismo utilitarista focado na viabilidade tática e resultados práticos.',
        potencialPositivo:
          'Alta flexibilidade para negociar exceções, adaptar acordos e tomar decisões pragmáticas que destravem resultados sem se prender a formalidades excessivas.',
        possivelLimitacao:
          'Pode criar tratamentos diferenciados ou alterar regras sem perceber a forte sensação de injustiça ou favoritismo que isso gera na equipe.',
      },
    },
  },
}

export function getSocialSensitivityCard(domain: ScarfDomain, pct: number): SocialSensitivityCard {
  const tier = getDomainTier(pct)
  const mapTier: SensitivityLevel = tier === 'alto' ? 'alta' : tier === 'medio' ? 'moderada' : 'baixa'
  const domainData = SOCIAL_SENSITIVITY_MAP[domain]
  const levelData = domainData.levels[mapTier]

  return {
    domain,
    letter: domainData.letter,
    title: domainData.title,
    subtitle: domainData.subtitle,
    interpretacao: levelData.interpretacao,
    potencialPositivo: levelData.potencialPositivo,
    possivelLimitacao: levelData.possivelLimitacao,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ASSOCIAÇÕES ENTRE DOMÍNIOS (INTERAÇÃO DO PAR TOP 1 + TOP 2)
// Metodologia: O comportamento manifesto resulta da interação primária e secundária.
// ─────────────────────────────────────────────────────────────────────────────
export interface ScarfPairing {
  archetype: string
  tagline: string
  dynamics: string
  strengths: string[]
  blindspots: string[]
  workPreference: string
}

const PAIRING_KEY = (d1: ScarfDomain, d2: ScarfDomain) => [d1, d2].sort().join('-')

export const SCARF_PAIRINGS: Record<string, ScarfPairing> = {
  'autonomia-status': {
    archetype: 'O Empreendedor Protagonista',
    tagline: 'Movido por maestria, autoridade e liberdade para liderar suas próprias vitórias.',
    dynamics: 'Combina a necessidade de destaque e valorização (Status) com o desejo irrefreável de comandar a execução à sua própria maneira (Autonomia). Não tolera amarras burocráticas nem liderança por imposição.',
    strengths: ['Capacidade de assumir grandes riscos e responsabilidades', 'Proatividade e liderança executiva natural', 'Alto foco em conquistas expressivas e maestria'],
    blindspots: ['Pode ser visto como individualista ou resistente a conselhos', 'Dificuldade em delegar ou aceitar supervisão'],
    workPreference: 'Projetos especiais de alta visibilidade com autonomia total para desenhar a estratégia.',
  },
  'autonomia-certeza': {
    archetype: 'O Arquiteto Independente',
    tagline: 'Liberdade para projetar com rigor, controle metodológico e previsibilidade.',
    dynamics: 'Une a aversão ao improviso desordenado (Certeza) com a necessidade de governar seu próprio processo (Autonomia). Gosta de criar seus próprios sistemas operacionais e segui-los com disciplina.',
    strengths: ['Excelência em planejamento estratégico e estruturação de processos', 'Alta auto-organização sem necessidade de acompanhamento', 'Confiabilidade extrema nas entregas'],
    blindspots: ['Pode resistir a métodos impostos por outros departamentos', 'Pode se fechar em seus próprios sistemas perfeitos'],
    workPreference: 'Funções de planejamento, arquitetura técnica ou gestão de processos com liberdade de desenho.',
  },
  'autonomia-relacionamento': {
    archetype: 'O Articulador Confiável',
    tagline: 'Parceria humana genuína combinada com liberdade de movimento e ação.',
    dynamics: 'Busca criar conexões baseadas na confiança mútua e respeito, sem dependência ou controle sufocante. Valoriza amizades sinceras no trabalho, mas precisa do seu próprio espaço para pensar e produzir.',
    strengths: ['Facilidade para engajar pessoas através da confiança e não da coerção', 'Excelente ouvinte e parceiro de projetos', 'Empatia equilibrada com independência'],
    blindspots: ['Pode se isolar quando se sente sobrecarregado pelas demandas afetivas do grupo', 'Dificuldade de confronto direto com parceiros próximos'],
    workPreference: 'Ambientes cooperativos onde tenha sua própria área de responsabilidade claramente delimitada.',
  },
  'autonomia-justica': {
    archetype: 'O Defensor Meritocrático',
    tagline: 'Liberdade individual fundada na ética, respeito mútuo e regras transparentes.',
    dynamics: 'Acredita que cada um deve ser livre para buscar seus resultados, desde que as condições sejam iguais e justas para todos. Repudia controles opressores tanto quanto privilégios ilícitos.',
    strengths: ['Integridade inegociável e defesa da transparência', 'Não aceita protecionismo nem arbitrariedades', 'Autonomia orientada a resultados éticos'],
    blindspots: ['Pode se tornar inflexível quando identifica incoerências éticas na gestão', 'Tendência a comprar batalhas difíceis contra injustiças institucionais'],
    workPreference: 'Ambientes com governança clara, mérito auditável e sem politicagem de bastidores.',
  },
  'certeza-status': {
    archetype: 'O Especialista Rigoroso',
    tagline: 'Reconhecimento baseado em conhecimento técnico sólido, precisão e credibilidade.',
    dynamics: 'Almeja respeito e autoridade (Status) construídos através do domínio profundo de metodologias e fatos inquestionáveis (Certeza). Orgulha-se de nunca errar dados ou previsões.',
    strengths: ['Extrema precisão analítica e embasamento teórico', 'Capacidade de antecipar gargalos e blindar a equipe contra riscos', 'Credibilidade técnica indiscutível'],
    blindspots: ['Ansiedade intensa diante de mudanças repentinas de escopo', 'Dificuldade para agir com dados incompletos ou incerteza'],
    workPreference: 'Análise de risco, auditoria, consultoria especializada e projetos de alta exigência de precisão.',
  },
  'certeza-relacionamento': {
    archetype: 'O Guardião do Time',
    tagline: 'Segurança psicológica, processos confiáveis e estabilidade para as pessoas.',
    dynamics: 'Dedica-se a criar um ambiente harmonioso, seguro e previsível para o grupo. A incerteza nas relações ou conflitos não resolvidos drenam sua energia, pois busca estabilidade relacional.',
    strengths: ['Criação de fortes laços de lealdade e segurança na equipe', 'Excelente organizador de rituais e alinhamentos de time', 'Previsibilidade e acolhimento contínuo'],
    blindspots: ['Resistência a desligamentos ou mudanças de membros na equipe', 'Pode tolerar baixa performance para evitar desconforto na relação'],
    workPreference: 'Gestão de pessoas em operações consolidadas, áreas de suporte humanizado e operações contínuas.',
  },
  'certeza-justica': {
    archetype: 'O Compliance Ético',
    tagline: 'Normas claras, imparcialidade estrita e governança consistente.',
    dynamics: 'A incerteza e a injustiça são os dois maiores gatilhos de estresse. Quando os critérios são explícitos e aplicados igualmente a todos, seu cérebro opera em calma e máxima produtividade.',
    strengths: ['Capacidade de auditar e desenhar políticas corporativas impecáveis', 'Senso apurado de equidade e dever', 'Eliminação de vieses e privilégios'],
    blindspots: ['Pode parecer burocrático ou inflexível em situações que exigem flexibilidade de exceção', 'Dificuldade em aceitar zonas cinzentas'],
    workPreference: 'Governança, compliance, assessoria jurídica, gestão de qualidade e controles regulatórios.',
  },
  'relacionamento-status': {
    archetype: 'O Líder Inspirador',
    tagline: 'Influência carismática, prestígio social e conexão autêntica com as pessoas.',
    dynamics: 'O status aqui é conquistado através do afeto e da admiração do grupo. Gosta de ser querido, respeitado e visto como uma liderança inspiradora e agregadora de talentos.',
    strengths: ['Carisma, comunicação envolvente e capacidade de mobilização', 'Facilidade para construir alianças estratégicas e networking', 'Motivação de equipes em momentos desafiadores'],
    blindspots: ['Vulnerável à rejeição social ou à falta de aprovação da equipe', 'Pode demorar para dar feedbacks duros por receio de perder admiração'],
    workPreference: 'Liderança de times, desenvolvimento de negócios, relações institucionais e porta-voz de causas.',
  },
  'justica-status': {
    archetype: 'O Líder de Princípios',
    tagline: 'Autoridade moral e valorização conquistada pelo exemplo e pela retidão.',
    dynamics: 'Quer ser reconhecido não pelo poder formal, mas pela nobreza de suas atitudes e pela lealdade aos princípios. Exige respeito proporcional ao esforço justo que dedica ao coletivo.',
    strengths: ['Senso de liderança exemplar baseado na coerência entre fala e prática', 'Coragem moral para questionar decisões incorretas', 'Respeito genuíno conquistado por merecimento'],
    blindspots: ['Pode se indignar rapidamente com politicagem corporativa', 'Risco de parecer moralista quando discorda de estratégias utilitaristas'],
    workPreference: 'Cargos de direção ética, ouvidoria, mediação de conflitos e liderança transformacional.',
  },
  'justica-relacionamento': {
    archetype: 'O Mediador Humanitário',
    tagline: 'Cuidado genuíno com o bem-estar coletivo, harmonia e inclusão ética.',
    dynamics: 'Acredita que o sucesso de uma equipe só é legítimo se todos forem tratados com dignidade, empatia e equidade. É o elo de coesão que não tolera que ninguém seja deixado para trás.',
    strengths: ['Mediação sensível de desavenças e pacificação de conflitos', 'Cultura de segurança psicológica profunda', 'Combate ativo a assédio ou exclusão'],
    blindspots: ['Tende a absorver o sofrimento ou as dores da equipe', 'Pode desgastar sua energia tentando agradar e equilibrar todos os lados'],
    workPreference: 'Gestão de cultura, mediação de conflitos, sustentabilidade e liderança humanizada.',
  },
}

export function getScarfPairing(d1: ScarfDomain, d2: ScarfDomain): ScarfPairing {
  const key = PAIRING_KEY(d1, d2)
  return (
    SCARF_PAIRINGS[key] ?? {
      archetype: 'Perfil Dinâmico Multifacetado',
      tagline: 'Equilíbrio flexível entre domínios neurossociais complementares.',
      dynamics: `Integra elementos fortes de ${SCARF_DOMAINS[d1].label} e ${SCARF_DOMAINS[d2].label}, adaptando suas reações de acordo com o contexto situacional.`,
      strengths: ['Versatilidade e adaptabilidade a diferentes culturas de trabalho', 'Visão ampla dos gatilhos de engajamento da equipe'],
      blindspots: ['Pode alternar prioridades de acordo com o nível de estresse da fase'],
      workPreference: 'Projetos multidisciplinares com interação dinâmica.',
    }
  )
}

const LETTER_DOMAIN: Record<string, ScarfDomain> = {
  a: 'status',
  b: 'certeza',
  c: 'autonomia',
  d: 'relacionamento',
  e: 'justica',
}

export interface ScarfOption {
  domain: ScarfDomain
  text: string
}
export interface ScarfQuestion {
  text: string
  options: ScarfOption[]
}

function q(text: string, a: string, b: string, c: string, d: string, e: string): ScarfQuestion {
  return {
    text,
    options: [
      { domain: LETTER_DOMAIN.a, text: a },
      { domain: LETTER_DOMAIN.b, text: b },
      { domain: LETTER_DOMAIN.c, text: c },
      { domain: LETTER_DOMAIN.d, text: d },
      { domain: LETTER_DOMAIN.e, text: e },
    ],
  }
}

export const SCARF_QUESTIONS: ScarfQuestion[] = [
  // 1-14 Originais
  q(
    'Vários membros da equipe da qual você faz parte estão discordando entre si e procuram você para pedir ajuda. Primeiramente, você:',
    'Pensa que seria mais fácil se estivesse no comando, para simplesmente dizer o que eles devem fazer',
    'Esclarece o que eles esperam de você',
    'Tenta resolver o problema sem ter que falar com ninguém',
    'Conversa com cada parte separadamente para ouvir o ponto de vista de cada um',
    'Procura por uma solução que seja satisfatória a todos'
  ),
  q(
    'Alguém está atrasado para a reunião. Qual é a sua reação?',
    'Você sente que foi negligenciado pela pessoa',
    'Você verifica qual era a hora, data e local corretos',
    'Você gostaria de estar com seu laptop, para não perder tempo esperando',
    'Você se pergunta o que pode ter provocado o atraso',
    'Você se irrita porque se esforçou muito para chegar a tempo'
  ),
  q(
    'Você recebeu um feedback negativo do seu líder sobre um projeto importante. Você:',
    'Fica decepcionado consigo por não ter atendido às expectativas do seu líder',
    'Pede mais detalhes sobre o feedback',
    'Decide fazer as coisas do seu jeito nos projetos futuros',
    'Se sente constrangido e evita seu chefe pelo resto da semana',
    'Pensa que o feedback negligenciou os aspectos positivos'
  ),
  q(
    'Um atendente do suporte técnico pede para que você espere na linha. Você:',
    'Fica irritado, pois ele não está dando a atenção devida a você',
    'Fica pensando sobre quanto tempo vai ter que esperar',
    'Usa o tempo para responder e-mails',
    'Sente pena da pessoa que colocou você em espera, ela parecia estressada',
    'Espera pacientemente, já que todos estão no mesmo barco'
  ),
  q(
    'Hoje é o seu primeiro dia como gestor e você está pensando sobre sua nova equipe. A sua primeira reunião é:',
    'Com seu superior, para descobrir o que é importante para a equipe',
    'Com toda a equipe, para esclarecer as expectativas',
    'Com cada membro da equipe, para descobrir como cada um gosta de ser gerenciado',
    'Um almoço descontraído para conhecer as pessoas',
    'Com o RH, para comparar seu salário com o do resto da equipe'
  ),
  q(
    'Você está indo para o aeroporto, onde vai embarcar para um voo internacional. Você:',
    'Chega ao aeroporto pontualmente, o avião não vai decolar sem você',
    'Chega ao aeroporto com muito tempo de sobra, chegar atrasado o estressa',
    'Se preocupa com a falta de opções para filmes e refeições',
    'Espera se sentar ao lado de alguém que seja agradável',
    'Torce para ser transferido para a classe executiva por conta do seu programa de milhas'
  ),
  q(
    'Sua família está pressionando você para passar mais tempo com eles. Você:',
    'Sente-se frustrado, pois eles não entendem o quão ocupado você está',
    'Gostaria de saber como fazê-los felizes',
    'Concorda com eles, desde que você decida o que vão fazer',
    'Sente-se mal por tê-los magoado',
    'Fica irritado com a falta de reconhecimento do seu esforço'
  ),
  q(
    'Você está procurando por um carro novo. Como você decide qual carro comprar?',
    'Não preciso discutir muito, eu já sei qual carro comprar',
    'Leio e comparo as avaliações da indústria',
    'Vou até as maiores concessionárias, onde há uma gama de escolhas ampla',
    'Minha família sempre compra em uma concessionária local; vou comprar lá também',
    'Acho o melhor preço através da internet'
  ),
  q(
    'Você se inscreveu em um novo treinamento. Você está:',
    'Satisfeito por poder melhorar suas qualificações',
    'Nervoso por conta das expectativas que serão postas sobre você',
    'Preocupado, podem pedir para você fazer algo que não o agrada',
    'Animado porque poderá conhecer pessoas novas',
    'Com esperança de que todos se esforcem igualmente'
  ),
  q(
    'Você está levando um velho amigo para jantar. É mais provável que você:',
    'O leve para o novo restaurante da cidade',
    'O leve onde as críticas são relativamente boas',
    'Primeiro descubra qual é a comida preferida do seu amigo para depois decidir onde ir',
    'Vá para o seu restaurante favorito, onde todos se conhecem',
    'Ligue para ele, assim vocês podem decidir juntos'
  ),
  q(
    'Amigos vão passar o final de semana na sua casa. Você:',
    'Preferiria que a viagem fosse na primavera, quando a cidade fica mais linda e as árvores estão floridas',
    'Passa a semana toda planejando o itinerário',
    'Espera ter um tempo para recarregar suas energias durante o final de semana',
    'Espera poder aproveitar bem o tempo com eles',
    'Envia sugestões do que podem fazer, assim eles escolhem as mais interessantes'
  ),
  q(
    'Seu chefe quer sair com você para comemorar o sucesso do último projeto. Você:',
    'Fica feliz por ele reconhecer o seu trabalho duro',
    'Esclarece com seu chefe o que exatamente o agradou',
    'Espera que possa escolher o lugar',
    'Sugere fazer algo com toda a equipe',
    'Acha ótimo que ele gaste um pouco da fortuna dele com você'
  ),
  q(
    'Sua equipe está trabalhando em um projeto importante, porém vocês precisam esperar pela decisão de outros departamentos. Você:',
    'Se estressa com a impressão de que isso vai comprometer a sua credibilidade',
    'Fala com os outros gerentes para saber mais detalhes',
    'Sente-se prejudicado por conta de toda essa burocracia',
    'Pensa no impacto que isso vai gerar na moral da sua equipe',
    'Gostaria que os outros entendessem o quanto isso prejudica sua equipe'
  ),
  q(
    'Está difícil conectar-se com alguns jovens da sua equipe. Você:',
    'Diz a eles que devem respeitá-lo, pois você é o gerente deles',
    'Fala com outros gerentes para descobrir o que funcionou para eles',
    'Lê artigos na internet à procura de coisas que possam ser implementadas',
    'Chama-os para um almoço, assim você pode melhorar a conexão com eles',
    'Pergunta a eles como você pode trabalhar esse problema'
  ),
  // 15-30 Novas questões estruturadas de alta qualidade no mesmo formato
  q(
    'Você foi convidado para apresentar os resultados do trimestre para a diretoria executiva. Antes da reunião, você:',
    'Espera ser publicamente reconhecido como o principal responsável pelo sucesso da equipe',
    'Revisa todas as métricas e dados detalhadamente para garantir que não haverá surpresas ou falhas',
    'Prefere estruturar a apresentação inteiramente do seu jeito, sem interferências rígidas',
    'Certifica-se de incluir todos os colegas que colaboraram para que se sintam parte da conquista',
    'Preocupa-se em destacar de forma justa o esforço proporcional de cada membro da equipe'
  ),
  q(
    'A empresa anunciou uma reestruturação repentina nos processos internos. Sua primeira reação é:',
    'Pensar em como essa mudança afetará o seu nível de influência e visibilidade perante a liderança',
    'Sentir incômodo pela falta de clareza imediata sobre quais serão as novas regras e expectativas',
    'Querer garantir que ainda terá liberdade para decidir como executar suas próprias entregas',
    'Conversar com os colegas para saber como estão lidando com a novidade e apoiá-los',
    'Avaliar se a reestruturação será aplicada de maneira igualitária e transparente para todos'
  ),
  q(
    'O seu gestor propõe novas metas de desempenho para o próximo semestre. Você:',
    'Analisa se o cumprimento dessas metas trará maior destaque profissional e prestígio na empresa',
    'Esclarece exatamente quais são os indicadores, prazos e critérios de avaliação esperados',
    'Busca negociar liberdade para definir o plano de ação e os caminhos para atingir os objetivos',
    'Procura alinhar as metas com a equipe para garantir que todos se apoiem mutuamente',
    'Verifica se as metas são realistas e distribuídas de forma equitativa entre todos os integrantes'
  ),
  q(
    'Dois projetos diferentes exigem a sua atenção imediata com prazos concorrentes. Você:',
    'Escolhe o projeto que lhe dará maior visibilidade e reconhecimento junto à alta liderança',
    'Busca definir uma ordem de prioridade clara e oficializada com a chefia para evitar ambiguidades',
    'Assume o controle da situação e decide por conta própria qual entrega priorizar',
    'Consulta os envolvidos em ambos os projetos para negociar prazos que preservem a harmonia',
    'Avalia qual projeto tem um compromisso mais justo com os prazos acordados com os clientes'
  ),
  q(
    'A empresa decide adotar um novo modelo de trabalho. Sua principal preocupação é:',
    'Perder oportunidades de interagir diretamente com os líderes e demonstrar seu valor no dia a dia',
    'Saber exatamente quais dias, horários e regras devem ser cumpridos sem margem para confusão',
    'Ter flexibilidade para gerenciar seu próprio tempo e escolher onde produzir melhor',
    'Manter os momentos de convivência e o vínculo de amizade com os colegas de equipe',
    'Garantir que a política de presença seja aplicada de forma justa e sem privilégios para alguns'
  ),
  q(
    'Durante a avaliação de desempenho anual, o foco principal que você busca é:',
    'Saber se sua contribuição única está sendo notada e valorizada em comparação aos demais',
    'Receber diretrizes claras e objetivas sobre o que precisa manter ou ajustar no próximo ciclo',
    'Ter espaço para propor suas próprias iniciativas de melhoria sem microgerenciamento',
    'Fortalecer a parceria e a confiança mútua na relação com seu gestor',
    'Certificar-se de que a avaliação baseou-se em critérios justos, imparciais e transparentes'
  ),
  q(
    'Um erro cometido em um relatório importante da sua área é descoberto. Você:',
    'Preocupa-se com a impressão que isso causará sobre a sua competência profissional',
    'Quer entender exatamente onde o processo falhou para criar um controle que impeça a repetição',
    'Assume a responsabilidade de corrigir o problema imediatamente do seu próprio modo',
    'Busca conversar com a outra área para manter o bom relacionamento e esclarecer o ocorrido',
    'Assegura-se de que o erro seja tratado de forma construtiva, sem culpas injustas'
  ),
  q(
    'Um novo profissional experiente chega para integrar a sua equipe de trabalho. Você:',
    'Fica atento para ver como a chegada da nova pessoa impacta sua posição e influência no grupo',
    'Preocupa-se em entender rapidamente quais serão as atribuições e o papel exato do novo colega',
    'Dá espaço para que a pessoa trabalhe livremente, sem interferir excessivamente na sua rotina',
    'Faz questão de acolher o colega, convidando-o para almoçar e integrá-lo ao grupo',
    'Observa se a carga de trabalho está sendo distribuída de maneira justa entre todos'
  ),
  q(
    'Uma reunião de equipe é marcada sem pauta definida com antecedência. Sua reação imediata é:',
    'Pensar se terá espaço para expor suas ideias e demonstrar seu valor na discussão',
    'Sentir incômodo pela falta de planejamento e pauta estruturada para a reunião',
    'Aproveitar a liberdade para direcionar os tópicos para o que considera mais produtivo',
    'Ver a reunião como uma oportunidade agradável de trocar ideias e fortalecer o grupo',
    'Questionar se o tempo de todos está sendo respeitado com uma pauta justa e objetiva'
  ),
  q(
    'Seu gestor delega a você uma responsabilidade de grande visibilidade. Você:',
    'Vê isso como uma validação importante do seu prestígio e competência perante a organização',
    'Solicita direcionamentos claros sobre os limites de autonomia e os entregáveis esperados',
    'Fica entusiasmado com a liberdade para conduzir o projeto do seu próprio jeito',
    'Compartilha a conquista com a equipe e convida outros para participarem junto',
    'Verifica se os recursos e o apoio necessários foram disponibilizados de forma justa'
  ),
  q(
    'Surgem comentários na equipe sobre diferenças nas condições de trabalho. Você:',
    'Analisa onde você se posiciona em termos de valorização e reconhecimento',
    'Busca informações oficiais e transparentes sobre as políticas da empresa',
    'Prefere focar na sua própria carreira e negociação independente',
    'Preocupa-se com o clima de desconfiança que isso pode gerar entre os membros da equipe',
    'Considera inadmissível qualquer tratamento desigual ou falta de equidade nas regras'
  ),
  q(
    'Você tem uma ideia inovadora para melhorar a operação diária. Para implementá-la, você:',
    'Espera que sua sugestão seja publicamente reconhecida e elogiada pela diretoria',
    'Desenvolve um plano detalhado com etapas previsíveis para mitigar qualquer risco',
    'Testa a ideia por conta própria antes de pedir autorização formal',
    'Apresenta a ideia primeiro aos colegas mais próximos para testar o apoio do grupo',
    'Certifica-se de que o mérito e os benefícios sejam distribuídos justamente entre todos'
  ),
  q(
    'O volume de trabalho aumenta drasticamente devido a uma demanda urgente de última hora. Você:',
    'Aceita o desafio para demonstrar sua capacidade superior de entrega sob pressão',
    'Exige clareza imediata sobre quais outras tarefas devem ser pausadas para focar na urgência',
    'Reorganiza sua própria agenda e ritmo de trabalho do modo que julgar mais eficiente',
    'Propõe que a equipe se una em regime de mutirão para ajudarem uns aos outros',
    'Repudia quando demandas excessivas recaem sempre sobre as mesmas pessoas'
  ),
  q(
    'A alta liderança comunica uma grande mudança estratégica sem abrir espaço para debate. Você:',
    'Avalia o impacto dessa decisão na sua relevância e influência na estrutura corporativa',
    'Busca entender detalhadamente o racional por trás da decisão para recuperar a previsibilidade',
    'Incomoda-se com a imposição vertical e a falta de autonomia nas decisões locais',
    'Observa como a equipe reage coletivamente para manter o espírito de união e apoio',
    'Analisa se a decisão foi tomada de forma transparente e ética com todos os envolvidos'
  ),
  q(
    'Sua área precisa contratar um novo fornecedor externo para um projeto crítico. Você prioriza:',
    'Uma marca de prestígio reconhecido no mercado que eleve o status do projeto',
    'Um fornecedor com histórico comprovado de confiabilidade e processos previsíveis',
    'Flexibilidade para adaptar o escopo e os entregáveis conforme as necessidades evoluírem',
    'Uma parceria baseada em forte proximidade humana, confiança mútua e sinergia',
    'Uma concorrência absolutamente transparente, justa e com critérios éticos'
  ),
  q(
    'Um projeto complexo foi concluído com sucesso após meses de esforço. Na comemoração, você valoriza mais:',
    'Receber um agradecimento público nominal destacando o seu protagonismo na conquista',
    'Saber que os processos e padrões estabelecidos servirão de garantia segura para o futuro',
    'A liberdade para decidir como usará seu tempo de descanso após a conclusão',
    'O momento de confraternização e celebração afetuosa com as pessoas da equipe',
    'A certeza de que todos os participantes foram justamente recompensados e reconhecidos'
  ),
]

export type ScarfScores = Record<ScarfDomain, number>

export function calculateScarfScores(answers: Record<string, ScarfDomain>): ScarfScores {
  const scores: ScarfScores = { status: 0, certeza: 0, autonomia: 0, relacionamento: 0, justica: 0 }
  for (const d of Object.values(answers)) {
    if (d in scores) scores[d] += 1
  }
  return scores
}

export function rankScarf(scores: ScarfScores): ScarfDomain[] {
  return [...SCARF_ORDER].sort((a, b) => scores[b] - scores[a])
}

export const SCARF_TOTAL = SCARF_QUESTIONS.length // 30
