'use client'
import { Card } from '@/components/ui/card'
import { ArrowRight, TrendingUp, TrendingDown, Brain, BarChart3 } from 'lucide-react'
import { SectionHeading, SectionShell } from './shared'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

export default function ScopeIntelligence() {
  const { t, lang } = useI18n()
  const itl = t.intelligence
  return (
    <SectionShell id="intelligence">
      <SectionHeading
        eyebrow={itl.eyebrow}
        title={<>{itl.title.split('+').map((s, i) => i === 0 ? <span key={i}>{s}</span> : <span key={i}><span className="text-emerald-accent">+</span>{s}</span>)}</>}
        description={itl.desc}
      />

      <div className="mt-6 flex flex-wrap gap-2">
        {itl.cats.map((c, i) => (
          <span key={c} className={cn('text-xs px-3 py-1 rounded-full border',
            i === 2 ? 'bg-primary/15 text-emerald-accent border-primary/30' : 'border-border/40 text-muted-foreground')}>{c}</span>
        ))}
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        {itl.articles.map((a, i) => (
          <Card key={i} className="glass rounded-2xl overflow-hidden group hover:-translate-y-1 transition-transform cursor-pointer">
            <div className="h-32 relative bg-gradient-to-br from-primary/10 via-foreground/[0.02] to-transparent border-b border-border/40 flex items-center justify-center">
              <BarChart3 className={cn('h-10 w-10',
                i === 0 ? 'text-sev-high' : i === 1 ? 'text-sev-medium' : 'text-emerald-accent')} />
              <div className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-mono text-muted-foreground bg-background/60 px-2 py-0.5 rounded">{a.cat}</div>
              <div className="absolute top-3 right-3 text-[10px] font-mono text-muted-foreground">{a.read} {itl.read}</div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold leading-snug group-hover:text-emerald-accent transition-colors">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.insight}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className={cn('inline-flex items-center gap-1',
                    a.delta.includes('+') ? 'text-sev-low' : 'text-sev-critical')}>
                    {a.delta.includes('+') ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {a.delta}
                  </span>
                  <span className="text-emerald-accent">{a.stat} {a.statLabel}</span>
                </div>
                <ArrowRight className={cn('h-4 w-4 text-muted-foreground group-hover:text-emerald-accent transition-all', lang === 'fa' ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5')} />
              </div>
              <div className="mt-3 pt-3 border-t border-border/30 flex items-start gap-1.5 text-xs text-muted-foreground">
                <Brain className="h-3.5 w-3.5 text-emerald-accent mt-0.5 flex-shrink-0" />
                <span><span className="text-emerald-accent font-medium">{itl.aiInsight}:</span> {lang === 'fa' ? 'این تحلیل را روی داده‌های زندهٔ خود در مرکز فرماندهی اجرایی اجرا کنید.' : 'Re-run this analysis on your live data inside the Command Center.'}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </SectionShell>
  )
}
