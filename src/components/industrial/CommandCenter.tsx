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
  const [data, setData] = useState<CC | null>(null)
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [acknowledged, setAcknowledged] = useState<Set<string>>(new Set())

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const r = await fetch('/api/command-center', { cache: 'no-store' })
      const d = await r.json()
      setData(d)
      setExpanded(d.alerts?.[0]?.id ?? null)
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const ack = async (id: string) => {
    setAcknowledged(s => new Set(s).add(id))
    try { await fetch('/api/ack-alert', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ alertId: id }) }) } catch { /* ignore */ }
  }

  if (loading || !data) {
    return (
      <div className="py-16 text-center text-muted-foreground text-sm flex items-center justify-center gap-2">
        <span className="h-2 w-2 rounded-full bg-primary breathe" /> Loading command center…
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
              <DataStateDot state="LIVE" /> {data.organization} · Command Center
            </div>
            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight">{data.greeting.headline}</h2>
            <p className="mt-2 text-xl sm:text-2xl text-muted-foreground">
              <span className="text-foreground font-medium">{data.greeting.subhead}</span>
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.alertCounts.critical > 0 && <SeverityBadge severity="CRITICAL" /> && <span className="inline-flex items-center gap-1.5 text-sm"><span className="h-2 w-2 rounded-full bg-sev-critical" /> {data.alertCounts.critical} Critical</span>}
              {data.alertCounts.high > 0 && <span className="inline-flex items-center gap-1.5 text-sm"><span className="h-2 w-2 rounded-full bg-sev-high" /> {data.alertCounts.high} High</span>}
              {data.alertCounts.medium > 0 && <span className="inline-flex items-center gap-1.5 text-sm"><span className="h-2 w-2 rounded-full bg-sev-medium" /> {data.alertCounts.medium} Medium</span>}
              {data.alertCounts.low > 0 && <span className="inline-flex items-center gap-1.5 text-sm"><span className="h-2 w-2 rounded-full bg-sev-low" /> {data.alertCounts.low} Low</span>}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Operational Health</div>
              <div className="text-4xl font-semibold tabular-nums text-emerald-accent">{data.operationalHealth}<span className="text-lg text-muted-foreground">/100</span></div>
              <div className="text-[11px] text-muted-foreground">based on {data.topRisks.length} active risks</div>
            </div>
            <div className="h-16 w-16 relative data-pulse rounded-full border border-primary/40 flex items-center justify-center">
              <ShieldCheck className="h-7 w-7 text-emerald-accent" />
            </div>
          </div>
        </div>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <KpiCard label="Capital Locked (Inventory)" value={`$${(k.inventoryCapitalLockedUsd / 1000).toFixed(0)}k`} delta="-6.4% vs 30d" deltaDirection="down" icon={<Coins className="h-4 w-4" />} accent="high" dataState="SYNCED" />
        <KpiCard label="Stockout Items" value={k.stockoutItems} delta="+3 today" deltaDirection="up" icon={<PackageX className="h-4 w-4" />} accent="critical" dataState="LIVE" />
        <KpiCard label="Delayed Shipments" value={k.delayedShipments} delta={`of ${k.openShipments} open`} deltaDirection="flat" icon={<Truck className="h-4 w-4" />} accent="high" dataState="LIVE" />
        <KpiCard label="On-Time in-Full (OTIF)" value={`${k.otfPercent}%`} delta="target 95%" deltaDirection="down" icon={<Activity className="h-4 w-4" />} accent="medium" dataState="SYNCED" />
      </div>

      {/* Alerts stream — signature experience */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-sev-high" /> What needs your attention
          </h3>
          <span className="text-xs text-muted-foreground font-mono">{data.alerts.length} of {data.alertCounts.total} open</span>
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
                      <Clock className="h-3 w-3" /> {timeAgo(a.createdAt)}
                    </span>
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 pt-0 ml-6 space-y-3 border-t border-border/40">
                    {a.impact && (
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Impact</div>
                        <p className="text-sm">{a.impact}</p>
                      </div>
                    )}
                    {a.recommendation && (
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-emerald-accent mb-1 flex items-center gap-1"><Brain className="h-3 w-3" /> Recommended Action</div>
                        <p className="text-sm">{a.recommendation}</p>
                      </div>
                    )}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <span className="text-[11px] text-muted-foreground font-mono">source: {a.source}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => ack(a.id)} disabled={isAck} className="h-8 text-xs">
                          {isAck ? 'Acknowledged' : 'Acknowledge'}
                        </Button>
                        <Button size="sm" className="h-8 text-xs bg-primary text-primary-foreground">
                          {a.category === 'inventory' ? 'Prepare Purchase Order' : a.category === 'logistics' ? 'Track Shipment' : 'Review'} <ArrowRight className="ml-1.5 h-3 w-3" />
                        </Button>
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
            <h3 className="font-semibold flex items-center gap-2"><Activity className="h-4 w-4 text-sev-high" /> Top Supply Chain Risks</h3>
            <span className="text-xs text-muted-foreground font-mono">{data.topRisks.length} active</span>
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
            <h3 className="font-semibold flex items-center gap-2"><Brain className="h-4 w-4 text-emerald-accent" /> AI Recommendations</h3>
            <span className="text-xs text-muted-foreground font-mono">{data.recommendations.length} pending</span>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {data.recommendations.map(r => (
              <div key={r.id} className="rounded-lg border border-border/60 bg-foreground/[0.02] p-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-medium leading-snug">{r.title}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/15 text-emerald-accent whitespace-nowrap">L{r.autonomyLevel} · {AUTONOMY[r.autonomyLevel]}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{r.summary}</p>
                {r.impact && <p className="mt-1 text-[11px] text-emerald-accent/90">{r.impact}</p>}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 1) return `${Math.max(1, Math.floor(diff / 60000))}m ago`
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}
