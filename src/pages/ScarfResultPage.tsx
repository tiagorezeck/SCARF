import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts'
import {
  SCARF_DOMAINS,
  SCARF_ORDER,
  SCARF_TOTAL,
  ScarfDomain,
  ScarfScores,
  getScarfPairing,
  getDomainTierData,
  getDomainTier,
  getSocialSensitivityCard,
} from '@/src/lib/scarf-data'
import { StorageService, ScarfResponse } from '@/src/lib/storage'

export default function ScarfResultPage() {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<ScarfResponse | null>(null)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<
    'geral' | 'diagnostico' | 'sensibilidade' | 'combinacao' | 'situacoes' | 'manual'
  >('geral')

  useEffect(() => {
    if (id) {
      const res = StorageService.getScarfById(id)
      setData(res)
    }
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center max-w-md w-full space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Resultado não encontrado</h2>
          <p className="text-sm text-gray-500">
            Não encontramos a avaliação SCARF com o identificador fornecido.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              to="/scarf"
              className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700"
            >
              Fazer o teste
            </Link>
            <Link
              to="/"
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-50"
            >
              Início
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const scores: ScarfScores = data.scores ?? {
    status: 0,
    certeza: 0,
    autonomia: 0,
    relacionamento: 0,
    justica: 0,
  }

  const ranking: ScarfDomain[] =
    data.ranking ?? [...SCARF_ORDER].sort((a, b) => (scores[b] ?? 0) - (scores[a] ?? 0))
  const top1 = ranking[0]
  const top2 = ranking[1]
  const bottom = ranking[ranking.length - 1]

  const pairing = getScarfPairing(top1, top2)

  const radarData = SCARF_ORDER.map((d) => ({
    subject: SCARF_DOMAINS[d].label,
    A: scores[d] ?? 0,
    fullMark: SCARF_TOTAL,
  }))

  const barData = ranking.map((d) => ({
    name: SCARF_DOMAINS[d].label,
    Pontos: scores[d] ?? 0,
    Porcentagem: Math.round(((scores[d] ?? 0) / SCARF_TOTAL) * 100),
    color: SCARF_DOMAINS[d].color,
  }))

  const createdAt = new Date(data.created_at).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  function copyShareLink() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  function handlePrint() {
    window.print()
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-slate-50 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation / Header Actions (Hidden in Print) */}
        <div className="flex items-center justify-between print:hidden">
          <Link
            to="/dashboard"
            className="text-sm text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
          >
            ← Voltar ao dashboard
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>🖨️</span> Imprimir / PDF
            </button>
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-800">
              Página Inicial
            </Link>
          </div>
        </div>

        {/* Profile Card Header */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Relatório Neurocientífico SCARF
                </span>
                <span className="text-xs text-gray-400 font-medium">· {createdAt}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Perfil de {data.name}
              </h1>
              <p className="text-gray-500 text-sm">{data.email}</p>
              {data.phone && <p className="text-gray-400 text-xs">{data.phone}</p>}
            </div>

            <div className="sm:text-right space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Arquétipo Combinado (Top 1 + Top 2)
              </p>
              <div className="inline-block bg-slate-900 text-white font-bold px-3 py-1.5 rounded-xl text-sm shadow-sm">
                {pairing.archetype}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Hidden in Print) */}
        <div className="flex gap-2 overflow-x-auto border-b border-gray-200 pb-2 print:hidden">
          {[
            { id: 'geral', label: 'Visão Geral' },
            { id: 'diagnostico', label: 'Domínios' },
            { id: 'sensibilidade', label: 'Sensibilidade Social' },
            { id: 'combinacao', label: 'Associação de Perfil' },
            { id: 'situacoes', label: 'Cenários' },
            { id: 'manual', label: 'Colaboração' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: VISÃO GERAL & GRÁFICOS */}
        {(activeTab === 'geral' || typeof window !== 'undefined') && (
          <div className={activeTab === 'geral' ? 'space-y-6' : 'hidden print:block print:space-y-6'}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Radar Chart */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col items-center justify-between">
                <div className="w-full">
                  <h3 className="font-bold text-gray-900 text-sm mb-0.5">Mapeamento Geométrico SCARF</h3>
                  <p className="text-xs text-gray-400 mb-2">Equilíbrio neural entre os 5 domínios sociais</p>
                </div>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData} outerRadius={80}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#374151', fontSize: 11, fontWeight: 700 }}
                      />
                      <PolarRadiusAxis angle={30} domain={[0, SCARF_TOTAL]} tick={false} />
                      <Radar
                        name="SCARF"
                        dataKey="A"
                        stroke="#2563EB"
                        fill="#3B82F6"
                        fillOpacity={0.4}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-[11px] text-gray-400 text-center">
                  Formas assimétricas indicam forte dominância de gatilhos específicos.
                </p>
              </div>

              {/* Bar Chart Comparativo */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-0.5">Distribuição de Pontos e Peso Relativo</h3>
                  <p className="text-xs text-gray-400 mb-4">Total de 30 escolhas comportamentais registradas</p>
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData} layout="vertical" barSize={16}>
                        <PolarGrid stroke="#f0f0f0" />
                        <XAxis type="number" domain={[0, SCARF_TOTAL]} tick={{ fontSize: 10 }} />
                        <YAxis
                          type="category"
                          dataKey="name"
                          tick={{ fontSize: 11, fontWeight: 600 }}
                          width={100}
                        />
                        <Tooltip
                          formatter={(v) => [`${v} pontos (${Math.round((Number(v) / SCARF_TOTAL) * 100)}%)`, 'Pontuação']}
                        />
                        <Bar dataKey="Pontos" radius={[0, 4, 4, 0]}>
                          {barData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-1 pt-3 border-t border-gray-100 text-center">
                  {ranking.map((d) => (
                    <div key={d}>
                      <span className="text-[10px] text-gray-400 block uppercase font-bold">{SCARF_DOMAINS[d].label}</span>
                      <span className="text-xs font-black" style={{ color: SCARF_DOMAINS[d].color }}>
                        {scores[d] ?? 0}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hierarquia Detalhada dos 5 Domínios */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
              <h2 className="font-bold text-gray-900 text-base">Hierarquia dos Domínios (David Rock)</h2>
              <div className="grid gap-3">
                {ranking.map((d, index) => {
                  const meta = SCARF_DOMAINS[d]
                  const val = scores[d] ?? 0
                  const pct = Math.round((val / SCARF_TOTAL) * 100)
                  return (
                    <div
                      key={d}
                      className="p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white"
                      style={{ borderLeftColor: meta.color, borderLeftWidth: 6 }}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                            #{index + 1}
                          </span>
                          <span className="font-extrabold text-gray-900 text-base">{meta.label}</span>
                          <span className="text-xs text-gray-400">({meta.en})</span>
                        </div>
                        <p className="text-xs text-gray-600">{meta.summary}</p>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <div className="text-right">
                          <span className="text-2xl font-black" style={{ color: meta.color }}>
                            {pct}%
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Dominância Principal e Secundária */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: SCARF_DOMAINS[top1].color }} />
                  <span className="text-xs uppercase font-bold text-gray-400">Principal Gatilho (Top 1)</span>
                </div>
                <h3 className="text-xl font-extrabold text-gray-900">{SCARF_DOMAINS[top1].label}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {SCARF_DOMAINS[top1].description[0]}
                </p>
                <div className="text-xs bg-slate-50 border border-slate-200 p-3 rounded-xl text-gray-700">
                  <strong>Foco de atenção:</strong> {SCARF_DOMAINS[top1].tip}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: SCARF_DOMAINS[bottom].color }} />
                  <span className="text-xs uppercase font-bold text-gray-400">Menor Gatilho (Neutro)</span>
                </div>
                <h3 className="text-xl font-extrabold text-gray-900">{SCARF_DOMAINS[bottom].label}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Esta área gera menos oscilação emocional imediata em suas decisões. Você raramente se sente na defensiva quando {SCARF_DOMAINS[bottom].label.toLowerCase()} é desafiado.
                </p>
                <div className="text-xs bg-slate-50 border border-slate-200 p-3 rounded-xl text-gray-700">
                  <strong>Atenção com a equipe:</strong> Lembre-se de que outros colegas podem ter {SCARF_DOMAINS[bottom].label.toLowerCase()} como prioridade inegociável.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DIAGNÓSTICO DOS 5 DOMÍNIOS (3 NÍVEIS) */}
        {(activeTab === 'diagnostico' || typeof window !== 'undefined') && (
          <div className={activeTab === 'diagnostico' ? 'space-y-6' : 'hidden print:block print:space-y-6'}>
            {/* Context & Methodology Banner */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-4">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Avaliação Neurocientífica Aprofundada
                </span>
                <h2 className="text-2xl font-black text-gray-900 mt-1">
                  Diagnóstico Textual dos 5 Domínios SCARF
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Análise individualizada baseada na pontuação exata obtida por {data.name}, categorizada em 3 faixas de sensibilidade neural segundo o modelo de David Rock (NeuroLeadership Institute):
                </p>
              </div>

              {/* 3 Tiers Legend */}
              <div className="grid sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/70 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                      Nível Alto
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                      ≥ 70%
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-emerald-950">Gatilho Primário / Alta Sensibilidade</h4>
                  <p className="text-[11px] text-emerald-900 leading-relaxed">
                    Motor principal de engajamento e motivação. Gera grande prazer e produtividade quando atendido, mas aciona forte alarme de ameaça e dor social quando violado.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/70 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-blue-800">
                      Nível Médio
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-200 text-blue-900">
                      50% a 69%
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-blue-950">Zona Neutra / Equilíbrio Situacional</h4>
                  <p className="text-[11px] text-blue-900 leading-relaxed">
                    Flexibilidade e resiliência contextual. O fator é bem-vindo e apreciado, porém sua oscilação passageira não causa sofrimento ou desengajamento paralisante.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/70 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-800">
                      Nível Baixo
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                      &lt; 50%
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-amber-950">Baixa Sensibilidade / Ponto Cego</h4>
                  <p className="text-[11px] text-amber-900 leading-relaxed">
                    Não representa defeito ou incapacidade. Indica autonomia pessoal à falta desse fator, mas exige atenção redobrada para não negligenciar a necessidade nos liderados e pares.
                  </p>
                </div>
              </div>
            </div>

            {/* The 5 Domains in Participant's Hierarchy Order */}
            <div className="space-y-6">
              {ranking.map((domain, index) => {
                const meta = SCARF_DOMAINS[domain]
                const score = scores[domain] ?? 0
                const pct = Math.round((score / SCARF_TOTAL) * 100)
                const tier = getDomainTier(pct)
                const tierData = getDomainTierData(domain, pct)

                const tierBadgeConfig = {
                  alto: {
                    badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                    dot: 'bg-emerald-500',
                    label: 'Nível Alto (≥ 70%) · Gatilho Primário',
                  },
                  medio: {
                    badge: 'bg-blue-100 text-blue-800 border-blue-300',
                    dot: 'bg-blue-500',
                    label: 'Nível Médio (50% a 69%) · Zona Neutra',
                  },
                  baixo: {
                    badge: 'bg-amber-100 text-amber-900 border-amber-300',
                    dot: 'bg-amber-500',
                    label: 'Nível Baixo (< 50%) · Atenção ao Ponto Cego',
                  },
                }[tier]

                return (
                  <div
                    key={domain}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                  >
                    {/* Top bar with domain color */}
                    <div className="h-1.5 w-full" style={{ backgroundColor: meta.color }} />

                    <div className="p-6 sm:p-7 space-y-5">
                      {/* Domain Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-black px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                              #{index + 1}
                            </span>
                            <h3 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                              {meta.label}
                              <span className="text-xs font-normal text-gray-400">({meta.en})</span>
                            </h3>
                            <span
                              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${tierBadgeConfig.badge}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${tierBadgeConfig.dot}`} />
                              {tierBadgeConfig.label}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-gray-600 italic">
                            {tierData.tierName}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
                          <div className="text-right">
                            <span className="text-3xl font-black" style={{ color: meta.color }}>
                              {pct}%
                            </span>
                            <span className="block text-[10px] text-gray-400 font-bold uppercase">
                              {score} de {SCARF_TOTAL} escolhas
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content Blocks */}
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Bloco 1: Neurociência */}
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                            <span>🧠</span> Fundamento Neurocientífico ({tierData.rangeLabel})
                          </h4>
                          <p className="text-xs text-slate-700 leading-relaxed">
                            {tierData.neuroAnalysis}
                          </p>
                        </div>

                        {/* Bloco 2: Manifestação Prática */}
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                            <span>💼</span> Manifestação no Cotidiano de Trabalho
                          </h4>
                          <p className="text-xs text-slate-700 leading-relaxed">
                            {tierData.dailyBehavior}
                          </p>
                        </div>
                      </div>

                      {/* Bloco 3: Riscos & Pontos Cegos */}
                      <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                          <span>⚠️</span> Riscos & Alerta de Ponto Cego
                        </h4>
                        <p className="text-xs text-amber-950 leading-relaxed">
                          {tierData.blindspotOrRisk}
                        </p>
                      </div>

                      {/* Bloco 4: Diretrizes de Ação (Para Si e Para a Equipe) */}
                      <div className="grid sm:grid-cols-2 gap-3 pt-1">
                        <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 space-y-1">
                          <h5 className="text-[11px] font-bold uppercase tracking-wider text-blue-900">
                            Diretriz para Você
                          </h5>
                          <p className="text-xs text-blue-950 leading-relaxed">
                            {tierData.leadershipAction.forSelf}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-1">
                          <h5 className="text-[11px] font-bold uppercase tracking-wider text-indigo-900">
                            Diretriz para Líderes & Colegas
                          </h5>
                          <p className="text-xs text-indigo-950 leading-relaxed">
                            {tierData.leadershipAction.forLeaderAndPeers}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* TAB 3: MAPA DE SENSIBILIDADE SOCIAL (CARDS INSTITUTO COMET - MODO CLARO) */}
        {(activeTab === 'sensibilidade' || typeof window !== 'undefined') && (
          <div className={activeTab === 'sensibilidade' ? 'space-y-6' : 'hidden print:block print:space-y-6'}>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
              {/* Header */}
              <div className="border-b border-gray-100 pb-5 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold tracking-wider px-2.5 py-0.5 rounded-md border border-orange-200 bg-orange-50 text-orange-700 uppercase">
                    INSTITUTO COMET <span className="text-orange-400">·</span> Metodologia SCARF
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight uppercase">
                  MAPA DE SENSIBILIDADE SOCIAL
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-3xl">
                  O SCARF identifica cinco necessidades sociais que influenciam a maneira como percebemos o ambiente, estabelecemos relações e respondemos às situações do cotidiano. Conhecer seu nível de sensibilidade em cada dimensão ajuda a compreender seus potenciais e os aspectos que merecem atenção em seu desenvolvimento.
                </p>

                {/* Faixas de Sensibilidade */}
                <div className="inline-flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-gray-700 mt-2">
                  <span className="font-extrabold uppercase text-[10px] sm:text-[11px] tracking-wider text-gray-500">
                    FAIXAS DE SENSIBILIDADE:
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    <strong className="text-gray-900">Baixa:</strong> 0% a 49%
                  </span>
                  <span className="text-gray-300">·</span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <strong className="text-gray-900">Moderada:</strong> 50% a 69%
                  </span>
                  <span className="text-gray-300">·</span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    <strong className="text-gray-900">Alta:</strong> 70% a 100%
                  </span>
                </div>
              </div>

              {/* MAPA DE CONSTELAÇÃO / ÓRBITAS */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div>
                    <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
                      <span className="text-orange-600">✦</span> Mapa de Constelação Social (Órbitas de Sensibilidade)
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      O centro representa você. Quanto mais afastada da órbita central, maior a intensidade gravitacional e sensibilidade do fator.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center bg-slate-50/60 rounded-xl border border-gray-200 p-4 overflow-x-auto">
                  <svg viewBox="0 0 520 340" className="w-full max-w-lg h-auto overflow-visible">
                    {/* Anéis de Órbitas */}
                    <circle cx="260" cy="170" r="142" fill="none" stroke="#fdba74" strokeWidth="1.5" strokeDasharray="4 4" />
                    <circle cx="260" cy="170" r="102" fill="none" stroke="#fcd34d" strokeWidth="1.5" strokeDasharray="4 4" />
                    <circle cx="260" cy="170" r="58" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4" />

                    {/* Rótulos das Órbitas */}
                    <text x="260" y="24" textAnchor="middle" fill="#ea580c" fontSize="10" fontWeight="800" letterSpacing="1">
                      ÓRBITA ALTA (≥ 70%)
                    </text>
                    <text x="260" y="64" textAnchor="middle" fill="#d97706" fontSize="9" fontWeight="700">
                      ÓRBITA MODERADA (50% - 69%)
                    </text>
                    <text x="260" y="108" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="700">
                      ÓRBITA BAIXA (&lt; 50%)
                    </text>

                    {/* Núcleo Central */}
                    <circle cx="260" cy="170" r="24" fill="#1e293b" stroke="#f97316" strokeWidth="2.5" />
                    <text x="260" y="174" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="900">
                      EU
                    </text>

                    {/* 5 Nós Orbitais */}
                    {SCARF_ORDER.map((domain, idx) => {
                      const score = scores[domain] ?? 0
                      const pct = Math.round((score / SCARF_TOTAL) * 100)
                      const tier = getDomainTier(pct)
                      const card = getSocialSensitivityCard(domain, pct)

                      const angleDeg = -90 + idx * 72
                      const angleRad = (angleDeg * Math.PI) / 180
                      const radius = 45 + (pct / 100) * 97
                      const x = 260 + radius * Math.cos(angleRad)
                      const y = 170 + radius * Math.sin(angleRad)

                      const nodeColor =
                        tier === 'alto' ? '#ea580c' : tier === 'medio' ? '#d97706' : '#64748b'

                      const labelX = x > 260 ? x + 16 : x - 98
                      const labelY = y - 11

                      return (
                        <g key={domain}>
                          <line
                            x1="260"
                            y1="170"
                            x2={x}
                            y2={y}
                            stroke={nodeColor}
                            strokeWidth="1.5"
                            strokeDasharray="2 3"
                            opacity="0.6"
                          />
                          <circle cx={x} cy={y} r="16" fill={nodeColor} stroke="#ffffff" strokeWidth="2.5" />
                          <text x={x} y={y + 4} textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="900">
                            {card.letter}
                          </text>

                          {/* Box informativo */}
                          <rect
                            x={labelX}
                            y={labelY}
                            width="84"
                            height="22"
                            rx="6"
                            fill="#ffffff"
                            stroke={nodeColor}
                            strokeWidth="1"
                          />
                          <text
                            x={labelX + 6}
                            y={labelY + 14}
                            fill="#0f172a"
                            fontSize="9"
                            fontWeight="800"
                          >
                            {card.title} {pct}%
                          </text>
                        </g>
                      )
                    })}
                  </svg>
                </div>
              </div>

              {/* TÍTULO DOS CARDS DETALHADOS */}
              <div className="pt-2 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  Detalhamento Aprofundado por Dimensão
                </span>
                <h3 className="text-lg font-black text-gray-900 mt-0.5">
                  Interpretação, Potenciais e Limitações
                </h3>
              </div>

              {/* Cards Grid — S, C, A, R, F */}
              <div className="grid md:grid-cols-2 gap-6">
                {SCARF_ORDER.map((domain) => {
                  const score = scores[domain] ?? 0
                  const pct = Math.round((score / SCARF_TOTAL) * 100)
                  const tier = getDomainTier(pct)
                  const card = getSocialSensitivityCard(domain, pct)

                  return (
                    <div
                      key={domain}
                      className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        {/* Domain Header with Icon */}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center font-black text-white text-lg shrink-0 shadow-sm">
                            {card.letter}
                          </div>
                          <div>
                            <h3 className="text-lg font-black text-gray-900 leading-tight">
                              {card.title}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {card.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Score Box */}
                        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-baseline gap-2">
                              <span className="text-3xl font-black text-gray-900">{pct}%</span>
                              <span className="text-xs text-gray-500 font-medium">({score} de {SCARF_TOTAL})</span>
                            </div>
                            {tier === 'alto' && (
                              <span className="bg-orange-500 text-white text-[11px] font-black px-3 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                                SENSIBILIDADE ALTA
                              </span>
                            )}
                            {tier === 'medio' && (
                              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-black px-3 py-1 rounded-lg uppercase tracking-wider">
                                SENSIBILIDADE MODERADA
                              </span>
                            )}
                            {tier === 'baixo' && (
                              <span className="bg-slate-200 text-slate-700 border border-slate-300 text-[11px] font-black px-3 py-1 rounded-lg uppercase tracking-wider">
                                SENSIBILIDADE BAIXA
                              </span>
                            )}
                          </div>
                          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min(100, Math.max(5, pct))}%` }}
                            />
                          </div>
                        </div>

                        {/* INTERPRETAÇÃO */}
                        <div className="space-y-1.5">
                          <span className="block text-[10px] font-extrabold uppercase tracking-wider text-gray-500">
                            INTERPRETAÇÃO
                          </span>
                          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-gray-700 leading-relaxed font-normal">
                            {card.interpretacao}
                          </div>
                        </div>

                        {/* POTENCIAL POSITIVO */}
                        <div className="space-y-1.5">
                          <span className="block text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                            <span>↗</span> POTENCIAL POSITIVO
                          </span>
                          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3.5 text-xs text-emerald-950 leading-relaxed">
                            {card.potencialPositivo}
                          </div>
                        </div>

                        {/* POSSÍVEL LIMITAÇÃO */}
                        <div className="space-y-1.5">
                          <span className="block text-[10px] font-extrabold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                            <span>⚠</span> POSSÍVEL LIMITAÇÃO
                          </span>
                          <div className="bg-rose-50/70 border border-rose-200/80 rounded-xl p-3.5 text-xs text-rose-950 leading-relaxed">
                            {card.possivelLimitacao}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Bottom Principle Note */}
              <div className="pt-6 border-t border-gray-100 text-center space-y-1">
                <span className="text-xs font-black uppercase tracking-widest text-orange-600">
                  PRINCÍPIO COMET
                </span>
                <p className="text-xs italic text-gray-500 max-w-xl mx-auto">
                  Compreender para desenvolver, reconhecer potenciais, identificar limitações e transformar comportamento em evolução.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ASSOCIAÇÃO (TOP 1 + TOP 2) */}
        {(activeTab === 'combinacao' || typeof window !== 'undefined') && (
          <div className={activeTab === 'combinacao' ? 'space-y-6' : 'hidden print:block print:space-y-6'}>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Associação Metodológica SCARF
                </span>
                <h2 className="text-2xl font-black text-gray-900 mt-1">{pairing.archetype}</h2>
                <p className="text-sm font-semibold text-gray-600 italic mt-0.5">{pairing.tagline}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Dinâmica Comportamental Integrada</h4>
                <p className="text-sm text-gray-700 leading-relaxed bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  {pairing.dynamics}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <span>✓</span> Forças Neurais do Par ({SCARF_DOMAINS[top1].label} + {SCARF_DOMAINS[top2].label})
                  </h4>
                  <ul className="space-y-1.5 text-xs text-emerald-950">
                    {pairing.strengths.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="font-bold text-emerald-600">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                    <span>⚠</span> Pontos Cegos & Riscos de Tensão
                  </h4>
                  <ul className="space-y-1.5 text-xs text-amber-950">
                    {pairing.blindspots.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="font-bold text-amber-600">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900">
                  Condição Ideal de Produtividade & Engajamento
                </h4>
                <p className="text-xs text-blue-950 leading-relaxed">
                  {pairing.workPreference}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SITUAÇÕES DO DIA A DIA */}
        {(activeTab === 'situacoes' || typeof window !== 'undefined') && (
          <div className={activeTab === 'situacoes' ? 'space-y-6' : 'hidden print:block print:space-y-6'}>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Mapeamento em Cenários Corporativos</h2>
                <p className="text-xs text-gray-500 mt-1">
                  Como seu domínio dominante ({SCARF_DOMAINS[top1].label}) reage nas 4 principais dinâmicas do dia a dia de trabalho:
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {Object.values(SCARF_DOMAINS[top1].situations).map((sit, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-2xl p-5 space-y-3 bg-white">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <h3 className="font-bold text-sm text-gray-900">{sit.context}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                        Cenário {idx + 1}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-900">
                        <strong className="block text-[10px] uppercase font-bold text-emerald-800">
                          Recompensa Neural (Engajamento)
                        </strong>
                        {sit.reward}
                      </div>

                      <div className="p-2.5 rounded-lg bg-rose-50 text-rose-900">
                        <strong className="block text-[10px] uppercase font-bold text-rose-800">
                          Ameaça Social (Alarme & Estresse)
                        </strong>
                        {sit.threat}
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-50 text-gray-700">
                        <strong className="block text-[10px] uppercase font-bold text-gray-600">
                          Recomendação de Conduta
                        </strong>
                        {sit.recommendation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MANUAL DE LIDERANÇA & CONVIVÊNCIA */}
        {(activeTab === 'manual' || typeof window !== 'undefined') && (
          <div className={activeTab === 'manual' ? 'space-y-6' : 'hidden print:block print:space-y-6'}>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Manual de Liderança e Colaboração</h2>
                <p className="text-xs text-gray-500 mt-1">
                  Guia prático para gestores, liderados e pares saberem como extrair o melhor potencial de {data.name}:
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="border border-emerald-200 bg-emerald-50/40 rounded-2xl p-5 space-y-3">
                  <h3 className="font-bold text-emerald-900 text-sm flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">✓</span>
                    O que fazer (Gera Recompensa)
                  </h3>
                  <ul className="space-y-2 text-xs text-emerald-950">
                    {SCARF_DOMAINS[top1].guideForPeersAndLeaders.do.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-emerald-600">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-rose-200 bg-rose-50/40 rounded-2xl p-5 space-y-3">
                  <h3 className="font-bold text-rose-900 text-sm flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs">✕</span>
                    O que evitar (Gera Ameaça e Retração)
                  </h3>
                  <ul className="space-y-2 text-xs text-rose-950">
                    {SCARF_DOMAINS[top1].guideForPeersAndLeaders.dont.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-rose-600">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2">
                <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">
                  Fundamento Científico: Teoria SCARF (David Rock, NeuroLeadership Institute)
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  O cérebro humano trata as necessidades sociais com a mesma intensidade com que trata necessidades básicas de sobrevivência física. Ambientes que ativam recompensas SCARF elevam os níveis de dopamina e serotonina, facilitando o pensamento lateral, a resolução de problemas complexos e a cooperação. Ambientes que ativam ameaças ativam o cortisol e a amígdala, reduzindo drasticamente a capacidade do córtex pré-frontal de tomar decisões assertivas.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Share Card (Hidden in Print) */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center space-y-3 print:hidden">
          <p className="font-bold text-gray-900 text-sm">Compartilhar Relatório SCARF</p>
          <p className="text-xs text-gray-600">Envie este link direto para o participante ou para a liderança:</p>
          <div className="flex flex-col sm:flex-row items-center gap-2 max-w-xl mx-auto">
            <div className="bg-white border rounded-xl px-4 py-2.5 text-xs text-gray-600 font-mono break-all flex-1 text-left select-all w-full">
              {shareUrl}
            </div>
            <button
              onClick={copyShareLink}
              className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shrink-0"
            >
              {copied ? 'Copiado!' : 'Copiar link'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
