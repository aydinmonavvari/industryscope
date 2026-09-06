'use client'
import { useEffect, useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  AlertTriangle, ShieldCheck, TrendingDown, PackageX, Boxes, Truck, Coins,
  CheckCircle2, Brain, Activity, ArrowRight, Clock,
} from 'lucide-react'
import { SeverityBadge, ConfidenceMeter, DataStateDot, KpiCard } from './shared'
import { useI18n } from '@/lib/i18n'
import { toast } from 'sonner'

type Alert = {
  id: string; severity: string; category: string; title: string; message: string
  impact: string | null; recommendation: string | null; confidence: number; source: string; status: string; createdAt: string
}
type Risk = {
  id: string; dimension: string; title: string; severity: string
  probability: number; impact: number; score: number; confidence: number; recommendation: string | null
}
type Rec = {
  id: string; title: string; summary: string; rationale: string; action: string
  autonomyLevel: number; impact: string | null; confidence: number; status: string
}
type CC = {
  organization: string
  greeting: { headline: string; subhead: string }
  operationalHealth: number
  kpis: Record<string, number>
  alertCounts: Record<string, number>
  alerts: Alert[]
  topRisks: Risk[]
  recommendations: Rec[]
  inventoryHealth: Record<string, number>
  supplierAvgOnTime: number
}

const CAT_ICON: Record<string, React.ReactNode> = {
  inventory: <Boxes className="h-4 w-4" />,
  logistics: <Truck className="h-4 w-4" />,
  supplier: <TrendingDown className="h-4 w-4" />,
  production: <Activity className="h-4 w-4" />,
  system: <ShieldCheck className="h-4 w-4" />,
}

const AUTONOMY = ['Analyze', 'Recommend', 'Prepare', 'Human Approval', 'Autonomous']

export default function CommandCenter() {
  const { t, lang } = useI18n()
  const cc = t.commandCenter
  const [data, setData] = useState<CC | null>(null)
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [acknowledged, setAcknowledged] = useState<Set<string>>(new Set())
  const [resolved, setResolved] = useState<Set<string>>(new Set())
  const [recStates, setRecStates] = useState<Record<string, string>>({})

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const r = await fetch('/api/command-center', { cache: 'no-store' })
      const d = await r.json()
      if (d && d.error) { setData(null) } else { setData(d); setExpanded(d.alerts?.[0]?.id ?? null) }
    } catch { setData(null) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  if (loading) {
    return (
      <div className="py-16 text-center text-muted-foreground text-sm flex items-center justify-center gap-2">
        <span className="h-2 w-2 rounded-full bg-primary breathe" /> {lang === 'fa' ? 'بارگذاری مرکز فرماندهی…' : 'Loading command center…'}
      </div>
    )
  }

  if (!data) {
    return (
      <div className="py-16 text-center text-muted-foreground text-sm space-y-3">
        <div>{lang === 'fa' ? 'مرکز فرماندهی در حال آماده‌سازی است.' : 'Command center is being prepared.'}</div>
        <div className="text-xs text-muted-foreground/70">{lang === 'fa' ? 'دادهٔ عملیاتی نمونه به‌زودی اضافه می‌شود.' : 'Demo operational data will be added soon.'}</div>
        <Button variant="outline" size="sm" onClick={() => load()} className="h-8">{lang === 'fa' ? 'تلاش مجدد' : 'Retry'}</Button>
      </div>
    )
  }

  const ack = async (id: string) => {
    setAcknowledged(s => new Set(s).add(id))
    try { await fetch('/api/ack-alert', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ alertId: id }) }) } catch { /* ignore */ }
  }
  const resolve = async (id: string) => {
    try {
      const r = await fetch('/api/alert/resolve', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
      const d = await r.json()
      if (d.ok) { setResolved(s => new Set(s).add(id)); toast.success(t.toasts ? (t as any).actions?.resolved || cc.acknowledged : cc.acknowledged) }
    } catch { toast.error((t as any).toasts?.err || 'error') }
  }
  const snooze = async (id: string) => {
    try {
      const r = await fetch('/api/alert/snooze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, hours: 24 }) })
      const d = await r.json()
      if (d.ok) { setAcknowledged(s => new Set(s).add(id)); toast.success((t as any).actions?.snoozed || 'snoozed') }
    } catch { toast.error((t as any).toasts?.err || 'error') }
  }
  const approveRec = async (id: string) => {
    try {
      const r = await fetch('/api/recommendation/approve', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
      const d = await r.json()
      if (d.ok) { setRecStates(s => ({ ...s, [id]: 'approved' })); toast.success((t as any).actions?.approved || 'approved') }
      else toast.error(d.error || 'error')
    } catch { toast.error('error') }
  }
  const executeRec = async (id: string) => {
    try {
      const r = await fetch('/api/recommendation/execute', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
      const d = await r.json()
      if (d.ok) { setRecStates(s => ({ ...s, [id]: 'executed' })); toast.success((t as any).actions?.executed || 'executed') }
      else toast.error((t as any).actions?.needApproveFirst || d.error || 'error')
    } catch { toast.error('error') }
  }

  if (loading || !data) {
    return (
      <div className="py-16 text-center text-muted-foreground text-sm flex items-center justify-center gap-2">
        <span className="h-2 w-2 rounded-full bg-primary breathe" /> {lang === 'fa' ? 'بارگذاری مرکز فرماندهی…' : 'Loading command center…'}
      </div>
    )
  }

  const k = data.kpis
  return (
    <div className="space-y-6">
      {/* Greeting / signature */}
      <Card className="glass-strong rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-emerald-accent">
              <DataStateDot state="LIVE" /> {data.organization} · {cc.eyebrow}
            </div>
            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight">{cc.greeting}</h2>
            <p className="mt-2 text-xl sm:text-2xl text-muted-foreground">
              <span className="text-foreground font-medium">{data.alertCounts.total} {cc.attention}</span>
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.alertCounts.critical > 0 && <span className="inline-flex items-center gap-1.5 text-sm"><span className="h-2 w-2 rounded-full bg-sev-critical" /> {data.alertCounts.critical} {cc.critical}</span>}
              {data.alertCounts.high > 0 && <span className="inline-flex items-center gap-1.5 text-sm"><span className="h-2 w-2 rounded-full bg-sev-high" /> {data.alertCounts.high} {cc.high}</span>}
              {data.alertCounts.medium > 0 && <span className="inline-flex items-center gap-1.5 text-sm"><span className="h-2 w-2 rounded-full bg-sev-medium" /> {data.alertCounts.medium} {cc.medium}</span>}
              {data.alertCounts.low > 0 && <span className="inline-flex items-center gap-1.5 text-sm"><span className="h-2 w-2 rounded-full bg-sev-low" /> {data.alertCounts.low} {cc.low}</span>}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{cc.operationalHealth}</div>
              <div className="text-4xl font-semibold tabular-nums text-emerald-accent">{data.operationalHealth}<span className="text-lg text-muted-foreground">/100</span></div>
              <div className="text-[11px] text-muted-foreground">{data.topRisks.length} {cc.activeRisks}</div>
            </div>
            <div className="h-16 w-16 relative data-pulse rounded-full border border-primary/40 flex items-center justify-center">
              <ShieldCheck className="h-7 w-7 text-emerald-accent" />
            </div>
          </div>
        </div>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <KpiCard label={cc.kpis.capital} value={`$${(k.inventoryCapitalLockedUsd / 1000).toFixed(0)}k`} delta={lang === 'fa' ? '-۶.۴٪ vs ۳۰ روز' : '-6.4% vs 30d'} deltaDirection="down" icon={<Coins className="h-4 w-4" />} accent="high" dataState="SYNCED" />
        <KpiCard label={cc.kpis.stockout} value={k.stockoutItems} delta={lang === 'fa' ? `امروز +۳` : '+3 today'} deltaDirection="up" icon={<PackageX className="h-4 w-4" />} accent="critical" dataState="LIVE" />
        <KpiCard label={cc.kpis.delayed} value={k.delayedShipments} delta={lang === 'fa' ? `از ${k.openShipments} باز` : `of ${k.openShipments} open`} deltaDirection="flat" icon={<Truck className="h-4 w-4" />} accent="high" dataState="LIVE" />
        <KpiCard label={cc.kpis.otf} value={`${k.otfPercent}%`} delta={lang === 'fa' ? 'هدف ۹۵٪' : 'target 95%'} deltaDirection="down" icon={<Activity className="h-4 w-4" />} accent="medium" dataState="SYNCED" />
      </div>

      {/* Alerts stream — signature experience */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-sev-high" /> {cc.needsAttention}
          </h3>
          <span className="text-xs text-muted-foreground font-mono">{data.alerts.length} {lang === 'fa' ? 'از' : 'of'} {data.alertCounts.total} {cc.open}</span>
        </div>
        <div className="space-y-2.5">
          {data.alerts.map(a => {
            const isExpanded = expanded === a.id
            const isAck = acknowledged.has(a.id)
            return (
              <Card key={a.id} className={cn('rounded-xl border transition-all overflow-hidden', isAck ? 'opacity-50 border-border' : 'glass',
                isExpanded ? 'border-primary/40' : 'hover:border-border')}>
                <button onClick={() => setExpanded(isExpanded ? null : a.id)} className="w-full text-left p-4 flex items-start gap-3">
                  <span className={cn('mt-0.5 h-2.5 w-2.5 rounded-full flex-shrink-0',
                    a.severity === 'CRITICAL' ? 'bg-sev-critical' : a.severity === 'HIGH' ? 'bg-sev-high' : a.severity === 'MEDIUM' ? 'bg-sev-medium' : 'bg-sev-low')} />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <SeverityBadge severity={a.severity} />
                      <span className="text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                        {CAT_ICON[a.category]} {a.category}
                      </span>
                      {isAck && <span className="text-[11px] text-emerald-accent flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> acknowledged</span>}
                    </div>
                    <h4 className="mt-1.5 font-medium text-foreground">{a.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{a.message}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <ConfidenceMeter value={a.confidence} />
                    <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {timeAgo(a.createdAt, lang, cc.ago)}
                    </span>
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 pt-0 ml-6 space-y-3 border-t border-border/40">
                    {a.impact && (
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">{cc.impact}</div>
                        <p className="text-sm">{a.impact}</p>
                      </div>
                    )}
                    {a.recommendation && (
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-emerald-accent mb-1 flex items-center gap-1"><Brain className="h-3 w-3" /> {cc.recommended}</div>
                        <p className="text-sm">{a.recommendation}</p>
                      </div>
                    )}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <span className="text-[11px] text-muted-foreground font-mono">{cc.source}: {a.source}</span>
                      <div className="flex flex-wrap gap-2">
                        {!acknowledged.has(a.id) && !resolved.has(a.id) && (
                          <Button size="sm" variant="outline" onClick={() => ack(a.id)} className="h-8 text-xs">{cc.acknowledge}</Button>
                        )}
                        {!resolved.has(a.id) && (
                          <>
                            <Button size="sm" variant="outline" onClick={() => snooze(a.id)} disabled={acknowledged.has(a.id)} className="h-8 text-xs">{(t as any).actions?.snooze || 'Snooze'}</Button>
                            <Button size="sm" variant="outline" onClick={() => resolve(a.id)} className="h-8 text-xs">{(t as any).actions?.resolve || 'Resolve'}</Button>
                            <Button size="sm" className="h-8 text-xs bg-primary text-primary-foreground">
                              {a.category === 'inventory' ? cc.preparePO : a.category === 'logistics' ? cc.trackShipment : cc.review} <ArrowRight className="ml-1.5 h-3 w-3 rtl-flip" />
                            </Button>
                          </>
                        )}
                        {resolved.has(a.id) && (
                          <span className="text-[11px] text-emerald-accent flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> {(t as any).actions?.resolved || 'Resolved'}</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </div>

      {/* Risk + Recommendations */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center gap-2"><Activity className="h-4 w-4 text-sev-high" /> {cc.topRisks}</h3>
            <span className="text-xs text-muted-foreground font-mono">{data.topRisks.length} {cc.active}</span>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {data.topRisks.map(r => (
              <div key={r.id} className="rounded-lg border border-border/60 bg-foreground/[0.02] p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium">{r.title}</span>
                  <SeverityBadge severity={r.severity} />
                </div>
                <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground font-mono">
                  <span>P {Math.round(r.probability * 100)}%</span>
                  <span>I {Math.round(r.impact * 100)}%</span>
                  <span className="text-emerald-accent">Score {r.score}</span>
                </div>
                {r.recommendation && <p className="mt-1.5 text-xs text-muted-foreground">{r.recommendation}</p>}
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center gap-2"><Brain className="h-4 w-4 text-emerald-accent" /> {cc.aiRecs}</h3>
            <span className="text-xs text-muted-foreground font-mono">{data.recommendations.length} {cc.pending}</span>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {data.recommendations.map(r => (
              <div key={r.id} className="rounded-lg border border-border/60 bg-foreground/[0.02] p-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-medium leading-snug">{r.title}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/15 text-emerald-accent whitespace-nowrap">L{r.autonomyLevel} · {cc.autonomy[r.autonomyLevel] ?? r.action}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{r.summary}</p>
                {r.impact && <p className="mt-1 text-[11px] text-emerald-accent/90">{r.impact}</p>}
                <div className="mt-2 flex items-center gap-2">
                  {(() => {
                    const st = recStates[r.id] || 'pending'
                    if (st === 'executed') return <span className="text-[11px] text-emerald-accent flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> {(t as any).actions?.executed || 'Executed'}</span>
                    if (st === 'approved') return (
                      <>
                        <span className="text-[11px] text-emerald-accent flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> {(t as any).actions?.approved || 'Approved'}</span>
                        <Button size="sm" onClick={() => executeRec(r.id)} className="h-7 text-xs bg-primary text-primary-foreground">{(t as any).actions?.execute || 'Execute'}</Button>
                      </>
                    )
                    return (
                      <Button size="sm" variant="outline" onClick={() => approveRec(r.id)} className="h-7 text-xs">{(t as any).actions?.approve || 'Approve'}</Button>
                    )
                  })()}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

function timeAgo(iso: string, lang: 'fa' | 'en', ago: { m: string; h: string; d: string }): string {
  const diff = Date.now() - new Date(iso).getTime()
  const h = Math.floor(diff / 3600000)
  const faNum = (n: number) => lang === 'fa' ? n.toLocaleString('fa-IR') : String(n)
  if (h < 1) return `${faNum(Math.max(1, Math.floor(diff / 60000)))}${ago.m}`
  if (h < 24) return `${faNum(h)}${ago.h}`
  return `${faNum(Math.floor(h / 24))}${ago.d}`
}
