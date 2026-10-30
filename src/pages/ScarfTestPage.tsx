import React, { useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  SCARF_QUESTIONS,
  calculateScarfScores,
  rankScarf,
  ScarfDomain,
  ScarfOption,
} from '@/src/lib/scarf-data'
import { StorageService } from '@/src/lib/storage'

type Step = 'identify' | 'testing' | 'submitting'

function shuffled<T>(arr: T[], seed: number): T[] {
  const out = [...arr]
  let s = seed + 1
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280
    const j = Math.floor((s / 233280) * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export default function ScarfTestPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('identify')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, ScarfDomain>>({})
  const [error, setError] = useState('')

  const total = SCARF_QUESTIONS.length

  const optionOrders = useMemo<ScarfOption[][]>(
    () => SCARF_QUESTIONS.map((q, i) => shuffled(q.options, i * 7 + 3)),
    []
  )

  function handleIdentifySubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Preencha todos os campos.')
      return
    }
    setError('')
    setStep('testing')
  }

  async function submit(finalAnswers: Record<string, ScarfDomain>) {
    setStep('submitting')
    try {
      const scores = calculateScarfScores(finalAnswers)
      const ranking = rankScarf(scores)

      const saved = StorageService.saveScarf({
        name,
        email,
        phone: phone || undefined,
        answers: finalAnswers,
        scores,
        ranking,
      })

      setTimeout(() => {
        navigate(`/resultado-scarf/${saved.id}`)
      }, 500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao processar respostas. Tente novamente.')
      setStep('testing')
    }
  }

  function choose(chosenDomain: ScarfDomain) {
    const next = { ...answers, [String(index)]: chosenDomain }
    setAnswers(next)
    if (index + 1 >= total) {
      submit(next)
    } else {
      setIndex(index + 1)
    }
  }

  function goBack() {
    if (index === 0) return
    setIndex(index - 1)
  }

  if (step === 'identify') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-md space-y-6">
          <div>
            <Link to="/" className="text-sm text-blue-600 hover:underline">
              ← Início
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mt-2">Teste SCARF</h1>
            <p className="text-gray-500 mt-1 text-sm leading-relaxed">
              O modelo SCARF (David Rock) mapeia 5 domínios sociais do cérebro humano: Status,
              Certeza, Autonomia, Relacionamento e Justiça. Descubra os gatilhos que mais influenciam
              suas reações e engajamento.
            </p>
          </div>

          <form onSubmit={handleIdentifySubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seu nome</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome completo"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seu e-mail</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seu telefone</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 99999-9999"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>

            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer shadow-sm"
            >
              Começar o teste
            </button>
            <p className="text-center text-xs text-gray-400">
              30 situações profissionais · cerca de 5 minutos
            </p>
          </form>
        </div>
      </div>
    )
  }

  if (step === 'submitting') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4 bg-white p-8 rounded-2xl border shadow-sm max-w-sm w-full mx-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <h3 className="text-lg font-bold text-gray-900">Apurando seu perfil SCARF...</h3>
          <p className="text-gray-500 text-sm">
            Mapeando seus domínios cerebrais de recompensa e ameaça social.
          </p>
        </div>
      </div>
    )
  }

  const q = SCARF_QUESTIONS[index]
  const currentOptions = optionOrders[index]
  const progress = Math.round((index / total) * 100)

  return (
    <div className="min-h-screen px-4 py-8 bg-slate-50">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex justify-between text-xs text-gray-500 font-medium mb-1">
            <span>
              Situação {index + 1} de {total}
            </span>
            <span>{progress}% concluído</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-3 text-center">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
            Cenário profissional #{index + 1}
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-relaxed pt-2">
            {q.text}
          </h3>
        </div>

        <div className="grid gap-3">
          {currentOptions.map((opt, i) => (
            <button
              key={i}
              onClick={() => choose(opt.domain)}
              className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 shadow-sm p-5 text-left transition-all cursor-pointer"
            >
              <span className="text-sm sm:text-base text-gray-800 group-hover:text-blue-900 font-semibold block leading-relaxed">
                {opt.text}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={goBack}
            disabled={index === 0}
            className="text-sm font-medium text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            ← Voltar anterior
          </button>
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          <span className="text-xs text-gray-400">Selecione uma opção para continuar</span>
        </div>
      </div>
    </div>
  )
}
