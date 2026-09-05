'use client'
import { Card } from '@/components/ui/card'
import { Hexagon, Boxes, Coins, HeartPulse, Layers3 } from 'lucide-react'
import { SectionHeading, SectionShell } from './shared'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

const ICONS = [
  <Hexagon key="0" className="h-5 w-5" />,
  <Layers3 key="1" className="h-5 w-5" />,
  <Coins key="2" className="h-5 w-5" />,
  <Boxes key="3" className="h-5 w-5" />,
  <HeartPulse key="4" className="h-5 w-5" />,
]

export default function ScopeEcosystem() {
  const { t } = useI18n()
  const e = t.ecosystem
  return (
    <SectionShell id="ecosystem">
      <SectionHeading
        align="center"
        eyebrow={e.eyebrow}
        title={<>{e.title}<span className="text-emerald-accent">{e.titleAccent}</span></>}
        description={e.desc}
      />

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {e.products.map((p, i) => (
          <Card key={p.name} className={cn('rounded-2xl p-5 transition-all hover:-translate-y-1',
            p.name === 'IndustryScope' ? 'glass-strong border-primary/40 data-pulse' : 'glass border-border/40')}>
            <div className="flex items-center justify-between">
              <span className={cn('h-10 w-10 rounded-xl flex items-center justify-center',
                p.name === 'IndustryScope' ? 'bg-primary/15 text-emerald-accent' : 'bg-foreground/5 text-muted-foreground')}>{ICONS[i]}</span>
              {p.name === 'IndustryScope' && <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/15 text-emerald-accent border border-primary/30">{e.youAreHere}</span>}
            </div>
            <div className="mt-3 font-semibold">{p.name}</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{p.tag}</div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center text-xs text-muted-foreground font-mono">
        {e.shared}
      </div>
    </SectionShell>
  )
}
