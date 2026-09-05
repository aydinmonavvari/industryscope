'use client'
import { Hexagon, ArrowUpRight } from 'lucide-react'

const COLS = [
  { title: 'Platform', links: ['Command Center', 'Inventory Intelligence', 'Logistics Control Tower', 'Supply Chain Risk', 'AI Copilot'] },
  { title: 'Ecosystem', links: ['ScopeOS', 'FinScope', 'GoldScope', 'HealthScope', 'IndustryScope'] },
  { title: 'Intelligence', links: ['Industry', 'Logistics', 'Supply Chain', 'AI', 'Manufacturing'] },
  { title: 'Company', links: ['About', 'Design Partners', 'Security', 'Careers', 'Contact'] },
]

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40 bg-foreground/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-6 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="relative">
                <Hexagon className="h-7 w-7 text-emerald-accent" />
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-background">IS</span>
              </span>
              <span className="font-semibold tracking-tight text-lg">Industry<span className="text-emerald-accent">Scope</span></span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              The Digital Brain of Industrial Operations. SEE → UNDERSTAND → PREDICT → ACT.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary breathe" />
              All systems operational
            </div>
          </div>
          {COLS.map(c => (
            <div key={c.title}>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-3">{c.title}</div>
              <ul className="space-y-2">
                {c.links.map(l => (
                  <li key={l}>
                    <a href="#" className="text-sm text-foreground/80 hover:text-emerald-accent transition-colors inline-flex items-center gap-1">
                      {l} <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Scope — IndustryScope vertical. Prototype build for demonstration.</span>
          <div className="flex items-center gap-4 font-mono">
            <span>v1.0 · prototype</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-primary breathe" /> data: seeded demo</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
