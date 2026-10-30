import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { SCARF_DOMAINS, SCARF_ORDER, SCARF_TOTAL, ScarfDomain } from '@/src/lib/scarf-data'
import { StorageService, ScarfResponse } from '@/src/lib/storage'

const DEFAULT_PASSWORD = 'disc2026'

export default function DashboardPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [scarfResults, setScarfResults] = useState<ScarfResponse[]>([])
  const [scarfFilter, setScarfFilter] = useState('')

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('dashboard_authed')
    if (savedAuth === 'true') {
      setAuthed(true)
      loadAllData()
    }
  }, [])

  function loadAllData() {
    setScarfResults(StorageService.getScarfResults())
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (password === DEFAULT_PASSWORD || password === 'admin' || password === 'metodo3c') {
      setAuthed(true)
      sessionStorage.setItem('dashboard_authed', 'true')
      setError('')
      loadAllData()
    } else {
      setError('Senha incorreta. A senha padrão do sistema é disc2026.')
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('dashboard_authed')
    setAuthed(false)
    setPassword('')
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-sm space-y-6">
          <div className="text-center space-y-1">
            <Link to="/" className="text-xs text-blue-600 hover:underline">
              ← Voltar ao Início
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mt-2">Painel do Facilitador</h1>
            <p className="text-gray-500 text-xs">
              Acesso restrito para instrutores e líderes de equipe.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Senha de acesso
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha (padrão: disc2026)"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>

            {error && <p className="text-red-500 text-xs font-medium">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer text-sm shadow-sm"
            >
              Entrar no Dashboard
            </button>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
              <span className="text-xs text-gray-500">
                Dica: senha padrão do projeto: <code className="font-bold text-gray-800">disc2026</code>
              </span>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const filtered = scarfResults.filter(
    (r) =>
      r.name.toLowerCase().includes(scarfFilter.toLowerCase()) ||
      r.email.toLowerCase().includes(scarfFilter.toLowerCase())
  )

  const avg = SCARF_ORDER.map((d) => ({
    key: d,
    label: SCARF_DOMAINS[d].label,
    color: SCARF_DOMAINS[d].color,
    pct: scarfResults.length
      ? Math.round(
          (scarfResults.reduce((s, r) => s + ((r.scores?.[d] ?? 0) / SCARF_TOTAL) * 100, 0) /
            scarfResults.length)
        )
      : 0,
  }))

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard SCARF</h1>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                Método 3C
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Visão consolidada dos domínios neurossociais SCARF da equipe.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/resultado-scarf/exemplo-scarf"
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
            >
              Ver Exemplo de Relatório
            </Link>
            <Link
              to="/"
              className="text-xs font-semibold px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700"
            >
              Página Inicial
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-semibold px-3 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
            >
              Sair
            </button>
          </div>
        </div>

        {/* SCARF View Content */}
        <div className="space-y-6">
          <p className="text-gray-500 text-sm">{scarfResults.length} respostas registradas</p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {avg.map((d) => (
              <div
                key={d.key}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-4"
                style={{ borderLeftColor: d.color, borderLeftWidth: 4 }}
              >
                <div className="text-2xl font-black" style={{ color: d.color }}>
                  {d.pct}%
                </div>
                <div className="text-sm font-semibold text-gray-800 mt-1">{d.label}</div>
                <div className="text-xs text-gray-400">peso médio no grupo</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <input
              type="text"
              placeholder="Filtrar por nome ou e-mail..."
              value={scarfFilter}
              onChange={(e) => setScarfFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Nome
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      E-mail
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Domínios (maior → menor)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Data
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Ver
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((r) => {
                    const ranking =
                      r.ranking ??
                      [...SCARF_ORDER].sort((a, b) => (r.scores?.[b] ?? 0) - (r.scores?.[a] ?? 0))
                    return (
                      <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-semibold text-gray-900">{r.name}</td>
                        <td className="px-4 py-3 text-gray-500">{r.email}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1.5 flex-wrap">
                            {ranking.map((d) => {
                              const m = SCARF_DOMAINS[d]
                              return (
                                <span
                                  key={d}
                                  className="text-xs font-bold px-2 py-0.5 rounded-md"
                                  style={{ backgroundColor: m.color + '22', color: m.color }}
                                >
                                  {m.label} {r.scores?.[d] ?? 0}
                                </span>
                              )
                            })}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                          {new Date(r.created_at).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-4 py-3">
                          <Link
                            to={`/resultado-scarf/${r.id}`}
                            className="text-blue-600 hover:underline text-xs font-bold"
                          >
                            Ver →
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="text-center py-12 text-gray-400 text-sm">
                  Nenhum resultado encontrado.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
