'use client'
import { Card } from '@/components/ui/card'
import { ArrowRight, TrendingUp, TrendingDown, Brain, BarChart3 } from 'lucide-react'
import { SectionHeading, SectionShell } from './shared'
import { cn } from '@/lib/utils'

const ARTICLES = [
  {
    category: 'Supply Chain',
    title: 'Why lead-time volatility is the hidden tax on working capital',
    insight: 'A 14% lead-time swing can lock 9–12% more capital in inventory without raising stockout protection.',
    tone: 'high',
    delta: '+14% lead time',
    deltaDir: 'up',
    stat: '9.2%',
    statLabel: 'extra capital locked',
    read: '8 min',
  },
  {
    category: 'Inventory',
    title: 'Dead stock is not a number — it is a decision you kept postponing',
    insight: '67% of overstock at mid-size distributors traces back to 3 untouched reorder policies.',
    tone: 'medium',
    delta: '-22% turnover',
    deltaDir: 'down',
    stat: '67%',
    statLabel: 'policy-driven overstock',
    read: '6 min',
  },
  {
    category: 'Logistics',
    title: 'OTIF is a system property, not a carrier scorecard',
    insight: 'Carriers explain only ~30% of OTIF variance; upstream planning explains the rest.',
    tone: 'low',
    delta: '+8 pts OTIF',
    deltaDir: 'up',
    stat: '70%',
    statLabel: 'planning-driven',
    read: '7 min',
  },
]

const CATS = ['Industry', 'Logistics', 'Supply Chain', 'AI', 'Manufacturing', 'Economy', 'Operations']

export default function ScopeIntelligence() {
  return (
    <SectionShell id="intelligence">
      <SectionHeading
        eyebrow="Scope Intelligence"
        title={<>Data <span className="text-emerald-accent">+</span> Analysis <span className="text-emerald-accent">+</span> Visualization <span className="text-emerald-accent">+</span> AI Insight</>}
        description="Industrial knowledge — not generic SEO filler. Every article is built on a real operational question and ends with an AI insight you can act on."
      />

      <div className="mt-6 flex flex-wrap gap-2">
        {CATS.map((c, i) => (
          <span key={c} className={cn('text-xs px-3 py-1 rounded-full border',
            i === 2 ? 'bg-primary/15 text-emerald-accent border-primary/30' : 'border-border/40 text-muted-foreground')}>{c}</span>
        ))}
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        {ARTICLES.map((a, i) => (
          <Card key={i} className="glass rounded-2xl overflow-hidden group hover:-translate-y-1 transition-transform cursor-pointer">
            <div className="h-32 relative bg-gradient-to-br from-primary/10 via-foreground/[0.02] to-transparent border-b border-border/40 flex items-center justify-center">
              <BarChart3 className={cn('h-10 w-10',
                a.tone === 'high' ? 'text-sev-high' : a.tone === 'medium' ? 'text-sev-medium' : 'text-emerald-accent')} />
              <div className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-mono text-muted-foreground bg-background/60 px-2 py-0.5 rounded">{a.category}</div>
              <div className="absolute top-3 right-3 text-[10px] font-mono text-muted-foreground">{a.read} read</div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold leading-snug group-hover:text-emerald-accent transition-colors">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.insight}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className={cn('inline-flex items-center gap-1',
                    a.deltaDir === 'up' ? 'text-sev-low' : 'text-sev-critical')}>
                    {a.deltaDir === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {a.delta}
                  </span>
                  <span className="text-emerald-accent">{a.stat} {a.statLabel}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-accent group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="mt-3 pt-3 border-t border-border/30 flex items-start gap-1.5 text-xs text-muted-foreground">
                <Brain className="h-3.5 w-3.5 text-emerald-accent mt-0.5 flex-shrink-0" />
                <span><span className="text-emerald-accent font-medium">AI Insight:</span> Re-run this analysis on your live data inside the Command Center.</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </SectionShell>
  )
}
