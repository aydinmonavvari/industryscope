'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { ArrowRight, TrendingUp, TrendingDown, Brain, BarChart3, Clock, ArrowUpRight } from 'lucide-react'
import { SectionHeading, SectionShell } from './shared'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'
import { useRouter } from '@/lib/router'

type ExtLink = { label: string; url: string }
type Article = {
  id: string; slug: string; category: string; title: string; insight: string; body: string
  stat?: string | null; statLabel?: string | null; delta?: string | null; readMins: number
  metaDescription?: string | null; keywords?: string | null; externalLinks?: string | null
}

export default function ScopeIntelligence({ slug }: { slug?: string | null }) {
  const { t, lang } = useI18n()
  const itl = t.intelligence
  const { navigate } = useRouter()
  const [articles, setArticles] = useState<Article[]>([])
  const [active, setActive] = useState<Article | null>(null)
  const [bodyLoadingSlug, setBodyLoadingSlug] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/articles').then(r => r.json()).then(d => setArticles(d.articles ?? [])).catch(() => {})
  }, [])

  // Open article if slug in route (async, no synchronous setState)
  useEffect(() => {
    let cancelled = false
    if (!slug) { return }
    // defer the loading flag to a microtask to avoid synchronous setState in effect
    Promise.resolve().then(() => { if (!cancelled) setBodyLoadingSlug(slug) })
    fetch('/api/articles', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slug }) })
      .then(r => r.json())
      .then(d => { if (!cancelled) setActive(d.article) })
      .finally(() => { if (!cancelled) setBodyLoadingSlug(null) })
    return () => { cancelled = true }
  }, [slug])

  const loadingBody = !!slug && bodyLoadingSlug === slug && !active

  const openArticle = (s: string) => navigate(`/intelligence/${s}`)
  const closeArticle = () => navigate('/intelligence')

  const extLinks = (a: Article): ExtLink[] => {
    try { return a.externalLinks ? JSON.parse(a.externalLinks) : [] } catch { return [] }
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
          <motion.div key={a.slug} whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
            <Card className="glass rounded-2xl overflow-hidden group cursor-pointer h-full" onClick={() => openArticle(a.slug)}>
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
                {a.keywords && <div className="mt-2 text-[10px] text-emerald-accent/50 font-mono line-clamp-1">سئو: {a.keywords}</div>}
                {extLinks(a).length > 0 && (
                  <div className="mt-2 pt-2 border-t border-border/30 flex flex-wrap gap-1.5">
                    {extLinks(a).map((l) => (
                      <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-emerald-accent transition-colors">
                        {l.label} <ArrowUpRight className="h-2.5 w-2.5" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!slug} onOpenChange={(v) => !v && closeArticle()}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto glass-strong">
          <DialogHeader>
            <DialogTitle className="text-xl leading-tight pr-8">{active?.title}</DialogTitle>
            {active?.metaDescription && <DialogDescription>{active.metaDescription}</DialogDescription>}
          </DialogHeader>
          {loadingBody || !active ? (
            <div className="py-12 text-center text-sm text-muted-foreground">در حال بارگذاری…</div>
          ) : (
            <article className="text-sm leading-relaxed space-y-3">
              <p className="text-emerald-accent font-medium text-base">{active.insight}</p>
              {active.body.split('\n').map((line, i) => {
                if (/^#{1,3}\s/.test(line)) return <h3 key={i} className="text-base font-semibold text-foreground mt-3 mb-1">{line.replace(/^#{1,3}\s/, '')}</h3>
                if (line.trim() === '') return <div key={i} className="h-1" />
                // render markdown links [text](url)
                const parts = line.split(/(\[[^\]]+\]\([^)]+\))/g)
                return <p key={i} className="text-muted-foreground">{parts.map((p2, j) => {
                  const m = p2.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
                  if (m) return <a key={j} href={m[2]} target="_blank" rel="noopener noreferrer" className="text-emerald-accent hover:underline inline-flex items-center gap-0.5">{m[1]}<ArrowUpRight className="h-2.5 w-2.5" /></a>
                  return <span key={j}>{p2}</span>
                })}</p>
              })}
              {/* external links footer */}
              {extLinks(active).length > 0 && (
                <div className="mt-4 pt-3 border-t border-border/30">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">مطالعهٔ بیشتر</div>
                  <div className="flex flex-wrap gap-2">
                    {extLinks(active).map((l) => (
                      <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg glass hover:border-primary/40 border border-transparent transition-colors">
                        {l.label} <ArrowUpRight className="h-3 w-3 text-emerald-accent" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </article>
          )}
        </DialogContent>
      </Dialog>
    </SectionShell>
  )
}
