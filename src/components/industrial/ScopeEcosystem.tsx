'use client'
import { Card } from '@/components/ui/card'
import { Hexagon, Boxes, Coins, HeartPulse, Layers3 } from 'lucide-react'
import { SectionHeading, SectionShell } from './shared'
import { cn } from '@/lib/utils'

const ECOSYSTEM = [
  { name: 'ScopeOS', tag: 'Foundation OS', desc: 'Identity, organizations, permissions, design DNA across the Scope family.', icon: <Hexagon className="h-5 w-5" />, active: false },
  { name: 'IndustryScope', tag: 'Industrial Intelligence', desc: 'AI operating system for industry & supply chain.', icon: <Layers3 className="h-5 w-5" />, active: true },
  { name: 'FinScope', tag: 'Financial Intelligence', desc: 'Market, risk, and capital intelligence for finance teams.', icon: <Coins className="h-5 w-5" />, active: false },
  { name: 'GoldScope', tag: 'Commodity Intelligence', desc: 'Precious metals and commodity intelligence, live.', icon: <Boxes className="h-5 w-5" />, active: false },
  { name: 'HealthScope', tag: 'Health Intelligence', desc: 'Clinical and operational intelligence for healthcare.', icon: <HeartPulse className="h-5 w-5" />, active: false },
]

export default function ScopeEcosystem() {
  return (
    <SectionShell id="ecosystem">
      <SectionHeading
        align="center"
        eyebrow="The Scope Ecosystem"
        title={<>One ecosystem. <span className="text-emerald-accent">Multiple worlds.</span></>}
        description="IndustryScope is part of a larger operating system. Shared design DNA, authentication, organization model, and AI infrastructure — each vertical keeps its own personality."
      />

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {ECOSYSTEM.map(e => (
          <Card key={e.name} className={cn('rounded-2xl p-5 transition-all hover:-translate-y-1',
            e.active ? 'glass-strong border-primary/40 data-pulse' : 'glass border-border/40')}>
            <div className="flex items-center justify-between">
              <span className={cn('h-10 w-10 rounded-xl flex items-center justify-center',
                e.active ? 'bg-primary/15 text-emerald-accent' : 'bg-foreground/5 text-muted-foreground')}>{e.icon}</span>
              {e.active && <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/15 text-emerald-accent border border-primary/30">YOU ARE HERE</span>}
            </div>
            <div className="mt-3 font-semibold">{e.name}</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{e.tag}</div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{e.desc}</p>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center text-xs text-muted-foreground font-mono">
        shared: design tokens · auth · organizations · permissions · AI infrastructure · audit
      </div>
    </SectionShell>
  )
}
