/**
 * Storage and Database layer for SCARF Assessment.
 * Persists data in localStorage with initial seed data.
 */

import { ScarfDomain } from './scarf-data'

export interface ScarfResponse {
  id: string
  name: string
  email: string
  phone?: string
  created_at: string
  answers: Record<string, ScarfDomain> | Record<string, number>
  scores: Record<ScarfDomain, number>
  ranking: ScarfDomain[]
}

const STORAGE_KEYS = {
  scarf: 'scarf_responses_v2',
}

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    try {
      return crypto.randomUUID()
    } catch {
      // fallback
    }
  }
  return 'id-' + Math.random().toString(36).substring(2, 11) + '-' + Date.now().toString(36)
}

const SEED_SCARF: ScarfResponse[] = [
  {
    id: 'exemplo-scarf',
    name: 'Arnaldo Palma (Exemplo Demonstrativo)',
    email: 'arnaldo@metodo3c.com.br',
    phone: '(11) 98765-4321',
    created_at: new Date().toISOString(),
    answers: {},
    scores: {
      autonomia: 26,
      status: 22,
      justica: 19,
      certeza: 14,
      relacionamento: 11,
    },
    ranking: ['autonomia', 'status', 'justica', 'certeza', 'relacionamento'],
  },
  {
    id: 'seed-scarf-2',
    name: 'Carolina Mendes',
    email: 'carolina.mendes@exemplo.com.br',
    phone: '(11) 97123-4567',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    answers: {},
    scores: {
      relacionamento: 27,
      justica: 23,
      certeza: 18,
      autonomia: 12,
      status: 10,
    },
    ranking: ['relacionamento', 'justica', 'certeza', 'autonomia', 'status'],
  },
  {
    id: 'seed-scarf-3',
    name: 'Rodrigo Silveira',
    email: 'rodrigo.silveira@techcorp.com',
    phone: '(21) 99876-1234',
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    answers: {},
    scores: {
      certeza: 28,
      justica: 22,
      autonomia: 16,
      status: 12,
      relacionamento: 12,
    },
    ranking: ['certeza', 'justica', 'autonomia', 'status', 'relacionamento'],
  },
]

function getStored<T>(key: string, seed: T[]): T[] {
  if (typeof window === 'undefined') return seed
  try {
    const raw = localStorage.getItem(key)
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(seed))
      return seed
    }
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : seed
  } catch (err) {
    console.error('Storage read error:', err)
    return seed
  }
}

function setStored<T>(key: string, data: T[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (err) {
    console.error('Storage write error:', err)
  }
}

export const StorageService = {
  getScarfResults(): ScarfResponse[] {
    return getStored<ScarfResponse>(STORAGE_KEYS.scarf, SEED_SCARF)
  },

  getScarfById(id: string): ScarfResponse | null {
    const all = this.getScarfResults()
    return all.find((r) => r.id === id) ?? null
  },

  saveScarf(item: Omit<ScarfResponse, 'id' | 'created_at'>): ScarfResponse {
    const all = this.getScarfResults()
    const newEntry: ScarfResponse = {
      ...item,
      id: generateId(),
      created_at: new Date().toISOString(),
    }
    setStored(STORAGE_KEYS.scarf, [newEntry, ...all])
    return newEntry
  },
}
