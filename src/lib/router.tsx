'use client'
import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'

// Lightweight hash router. Routes:
//   #/                       → home
//   #/command-center         → command center
//   #/inventory              → inventory
//   #/logistics              → logistics
//   #/risk                   → risk
//   #/copilot                → AI copilot
//   #/ecosystem              → ecosystem
//   #/intelligence           → intelligence (articles)
//   #/intelligence/<slug>    → specific article
//   #/enterprise             → enterprise / pricing
//   #/contact                → contact
//   #/admin                  → owner dashboard (passcode-gated)

type RouterCtx = { path: string; navigate: (to: string) => void; page: string; param: string | null }
const Ctx = createContext<RouterCtx | null>(null)

export function useRouter() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useRouter must be inside RouterProvider')
  return c
}

function parseHash(): { path: string; page: string; param: string | null } {
  if (typeof window === 'undefined') return { path: '/', page: 'home', param: null }
  let h = window.location.hash.replace(/^#/, '')
  if (!h || h === '/') return { path: '/', page: 'home', param: null }
  // strip leading slash
  h = h.replace(/^\//, '')
  const parts = h.split('/')
  const page = parts[0] || 'home'
  const param = parts[1] ? decodeURIComponent(parts.slice(1).join('/')) : null
  return { path: `/${h}`, page, param }
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState({ path: '/', page: 'home', param: null as string | null })

  useEffect(() => {
    const onHash = () => setState(parseHash())
    onHash()
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const navigate = useCallback((to: string) => {
    if (typeof window === 'undefined') return
    const target = to.startsWith('#') ? to : `#${to.startsWith('/') ? to : '/' + to}`
    if (window.location.hash === target) {
      // same hash — still scroll to top of page content
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.location.hash = target
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return <Ctx.Provider value={{ ...state, navigate }}>{children}</Ctx.Provider>
}
