'use client'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ArrowRight, TrendingUp, TrendingDown, Brain, BarChart3, Clock } from 'lucide-react'
import { SectionHeading, SectionShell } from './shared'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

type Article = {
  id: string; slug: string; category: string; title: string; insight: string; body: string
  stat?: string | null; statLabel?: string | null; delta?: string | null; readMins: number
}

export default function ScopeIntelligence() {
  const { t, lang } = useI18n()
  const itl = t.intelligence
  const [articles, setArticles] = useState<Article[]>([])
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<Article | null>(null)
  const [loadingBody, setLoadingBody] = useState(false)

  useEffect(() => {
    fetch('/api/articles').then(r => r.json()).then(d => setArticles(d.articles ?? [])).catch(() => {})
  }, [])

  const openArticle = async (slug: string) => {
    setLoadingBody(true); setOpen(true)
    try {
      const r = await fetch('/api/articles', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slug }) })
      const d = await r.json()
      setActive(d.article)
    } finally { setLoadingBody(false) }
  }

  return (
    <SectionShell id="intelligence">
      <SectionHeading eyebrow={itl.eyebrow} title={<>{itl.title.split('+').map((s, i) => i === 0 ? <span key={i}>{s}</span> : <span key={i}><span className="text-emerald-accent">+</span>{s}</span>)}</>} description={itl.desc} />

      <div className="mt-6 flex flex-wrap gap-2">
        {itl.cats.map((c, i) => (
          <span key={c} className={cn('text-xs px-3 py-1 rounded-full border', i === 2 ? 'bg-primary/15 text-emerald-accent border-primary/30' : 'border-border/40 text-muted-foreground')}>{c}</span>
        ))}
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        {articles.map((a, i) => (
          <Card key={a.slug} className="glass rounded-2xl overflow-hidden group hover:-translate-y-1 transition-transform cursor-pointer" onClick={() => openArticle(a.slug)}>
            <div className="h-32 relative bg-gradient-to-br from-primary/10 via-foreground/[0.02] to-transparent border-b border-border/40 flex items-center justify-center">
              <BarChart3 className={cn('h-10 w-10', i === 0 ? 'text-sev-high' : i === 1 ? 'text-sev-medium' : 'text-emerald-accent')} />
              <div className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-mono text-muted-foreground bg-background/60 px-2 py-0.5 rounded">{a.category}</div>
              <div className="absolute top-3 right-3 text-[10px] font-mono text-muted-foreground flex items-center gap-1"><Clock className="h-2.5 w-2.5" />{a.readMins}{lang === 'fa' ? '' : 'm'}</div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold leading-snug group-hover:text-emerald-accent transition-colors">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.insight}</p>
              {a.delta && a.stat && (
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className={cn('inline-flex items-center gap-1', a.delta.includes('+') ? 'text-sev-low' : 'text-sev-critical')}>
                      {a.delta.includes('+') ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {a.delta}
                    </span>
                    <span className="text-emerald-accent">{a.stat} {a.statLabel}</span>
                  </div>
                  <ArrowRight className={cn('h-4 w-4 text-muted-foreground group-hover:text-emerald-accent transition-all', lang === 'fa' ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5')} />
                </div>
              )}
              <div className="mt-3 pt-3 border-t border-border/30 flex items-start gap-1.5 text-xs text-muted-foreground">
                <Brain className="h-3.5 w-3.5 text-emerald-accent mt-0.5 flex-shrink-0" />
                <span><span className="text-emerald-accent font-medium">{itl.aiInsight}:</span> {lang === 'fa' ? 'برای خواندن تحلیل کامل کلیک کنید.' : 'Click to read the full analysis.'}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto glass-strong">
          <DialogHeader>
            <DialogTitle className="text-xl leading-tight pr-8">{active?.title}</DialogTitle>
          </DialogHeader>
          {loadingBody || !active ? (
            <div className="py-12 text-center text-sm text-muted-foreground">Loading…</div>
          ) : (
            <article className="prose-sm text-sm leading-relaxed space-y-3">
              <p className="text-emerald-accent font-medium text-base">{active.insight}</p>
              {active.body.split('\n').map((line, i) => {
                if (/^#{1,3}\s/.test(line)) return <h3 key={i} className="text-base font-semibold text-foreground mt-3 mb-1">{line.replace(/^#{1,3}\s/, '')}</h3>
                if (line.trim() === '') return <div key={i} className="h-1" />
                return <p key={i} className="text-muted-foreground">{line.replace(/^[-*]\s/, '• ')}</p>
              })}
            </article>
          )}
        </DialogContent>
      </Dialog>
    </SectionShell>
  )
}
