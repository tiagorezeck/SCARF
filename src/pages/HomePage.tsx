import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="flex justify-between items-center px-4 sm:px-8 py-4 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900 tracking-tight text-lg">Método 3C</span>
          <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full">
            Avaliação SCARF
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://www.falandosobrecorridaderua.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors"
          >
            Livro →
          </a>
          <Link
            to="/dashboard"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-16">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Neurociência &amp; Liderança
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Teste SCARF (David Rock)
            </h1>
            <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Descubra quais são os seus principais motivadores e gatilhos sociais no trabalho: Status, Certeza, Autonomia, Relacionamento e Justiça.
            </p>
          </div>

          <div className="grid sm:grid-cols-1 gap-5 max-w-md mx-auto">
            <div className="rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col gap-4 bg-white hover:shadow-md transition-shadow text-left">
              <div className="flex gap-1 text-sm font-black">
                <span style={{ color: '#E11D48' }}>S</span>
                <span style={{ color: '#2563EB' }}>C</span>
                <span style={{ color: '#7C3AED' }}>A</span>
                <span style={{ color: '#059669' }}>R</span>
                <span style={{ color: '#D97706' }}>F</span>
              </div>
              <div className="space-y-1 flex-1">
                <h2 className="text-xl font-bold text-gray-900">Avaliação SCARF (30 Questões)</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Mapeamento completo das dimensões sociais do cérebro com situações práticas e comportamentais.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  to="/scarf"
                  className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm text-sm"
                >
                  Fazer o Teste SCARF
                </Link>
                <Link
                  to="/resultado-scarf/exemplo-scarf"
                  className="flex-1 text-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm text-sm"
                >
                  Ver Relatório de Exemplo
                </Link>
              </div>
            </div>
          </div>

          <a
            href="https://www.falandosobrecorridaderua.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl bg-blue-900 hover:bg-blue-950 text-white p-6 text-left transition-colors shadow-sm"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
              Método 3C · Pilar 1: Consciência
            </span>
            <p className="text-lg font-bold mt-1">
              Desenvolvido por Arnaldo Palma
            </p>
            <p className="text-sm text-blue-100 mt-1 leading-relaxed">
              Conheça o livro &ldquo;Falando Sobre Corrida de Rua&rdquo; — autoconhecimento, congruência e consistência. →
            </p>
          </a>
        </div>
      </main>
    </div>
  )
}
