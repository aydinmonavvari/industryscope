'use client'
import { useEffect, useState, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ShieldAlert, TrendingDown, Activity, Brain } from 'lucide-react'
import { SeverityBadge, SectionHeading, SectionShell } from './shared'
import { useI18n } from '@/lib/i18n'

type Risk = {
  id: string; dimension: string; title: string; severity: string
  probability: number; impact: number; score: number; confidence: number; recommendation: string | null
}
type Supplier = {
  name: string; country: string; rating: number; onTimeRate: number
  avgLeadDays: number; defectRate: number; riskScore: number
}
type Resp = { risks: Risk[]; suppliers: Supplier[] }

export default function SupplyChainRisk() {
  const { t, lang } = useI18n()
  const rk = t.risk
  const [data, setData] = useState<Resp | null>(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const r = await fetch('/api/risks', { cache: 'no-store' })
      const d = await r.json()
      setData(d)
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  return (
    <SectionShell id="risk">
      <SectionHeading
        eyebrow={rk.eyebrow}
        title={<>{rk.title}<span className="text-emerald-accent">{rk.titleAccent}</span></>}
        description={rk.desc}
      />

      {loading ? (
        <div className="py-16 text-center text-sm text-muted-foreground flex items-center justify-center gap-2"><span className="h-2 w-2 rounded-full bg-primary breathe" /> {lang === 'fa' ? 'محاسبهٔ مواجههٔ ریسک…' : 'Computing risk exposure…'}</div>
      ) : data ? (
        <div className="mt-6 grid lg:grid-cols-5 gap-4">
          {/* Risk matrix */}
          <Card className="glass rounded-2xl p-4 sm:p-5 lg:col-span-3">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2"><ShieldAlert className="h-4 w-4 text-sev-high" /> {rk.matrix}</h3>
              <span className="text-xs text-muted-foreground font-mono">{data.risks.length} {lang === 'fa' ? 'ریسک' : 'risks'}</span>
            </div>
            <div className="relative aspect-square max-w-md mx-auto">
              <RiskMatrix risks={data.risks} />
            </div>
            <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-sev-critical" /> {t.commandCenter.critical}</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-sev-high" /> {t.commandCenter.high}</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-sev-medium" /> {t.commandCenter.medium}</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-sev-low" /> {t.commandCenter.low}</span>
            </div>
          </Card>

          {/* Supplier performance */}
          <Card className="glass rounded-2xl p-4 sm:p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2"><TrendingDown className="h-4 w-4 text-sev-high" /> {rk.supplierPerf}</h3>
            </div>
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {data.suppliers.map(s => (
                <div key={s.name} className="rounded-lg border border-border/40 bg-foreground/[0.02] p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{s.name}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{s.country}</span>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-[11px]">
                    <Metric label={rk.onTime} value={`${Math.round(s.onTimeRate * 100)}%`} good={s.onTimeRate >= 0.85} />
                    <Metric label={rk.lead} value={`${s.avgLeadDays}${lang === 'fa' ? '' : 'd'}`} good={s.avgLeadDays <= 20} />
                    <Metric label={rk.defect} value={`${(s.defectRate * 100).toFixed(1)}%`} good={s.defectRate <= 0.02} />
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-foreground/10 overflow-hidden">
                      <div className={cn('h-full rounded-full', s.riskScore > 0.5 ? 'bg-sev-critical' : s.riskScore > 0.2 ? 'bg-sev-high' : 'bg-primary')} style={{ width: `${Math.min(100, s.riskScore * 100)}%` }} />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">{rk.risk} {s.riskScore}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Risk detail list */}
          <Card className="glass rounded-2xl p-4 sm:p-5 lg:col-span-5">
            <h3 className="font-semibold flex items-center gap-2 mb-3"><Activity className="h-4 w-4 text-emerald-accent" /> {rk.activeRisks}</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {data.risks.map(r => (
                <div key={r.id} className="rounded-lg border border-border/40 bg-foreground/[0.02] p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{(rk.dims as Record<string, string>)[r.dimension] ?? r.dimension}</span>
                      <div className="text-sm font-medium">{r.title}</div>
                    </div>
                    <SeverityBadge severity={r.severity} />
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-[11px] font-mono text-muted-foreground">
                    <span>{rk.prob} {Math.round(r.probability * 100)}%</span>
                    <span>{rk.impact} {Math.round(r.impact * 100)}%</span>
                    <span>{rk.score} <span className="text-emerald-accent">{r.score}</span></span>
                    <span>{rk.conf} {Math.round(r.confidence * 100)}%</span>
                  </div>
                  {r.recommendation && (
                    <div className="mt-2 pt-2 border-t border-border/30 text-xs flex items-start gap-1.5">
                      <Brain className="h-3.5 w-3.5 text-emerald-accent mt-0.5 flex-shrink-0" />
                      <span>{r.recommendation}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : null}
    </SectionShell>
  )
}

function Metric({ label, value, good }: { label: string; value: string; good: boolean }) {
  return (
    <div className="rounded bg-foreground/[0.03] px-2 py-1">
      <div className="text-muted-foreground">{label}</div>
      <div className={cn('font-mono font-semibold', good ? 'text-emerald-accent' : 'text-sev-high')}>{value}</div>
    </div>
  )
}

function RiskMatrix({ risks }: { risks: Risk[] }) {
  // axes: x = impact (0..1), y = probability (0..1)
  const color = (sev: string) => sev === 'CRITICAL' ? '#ef4444' : sev === 'HIGH' ? '#f59e0b' : sev === 'MEDIUM' ? '#eab308' : '#22d3ee'
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* quadrant tints */}
      <rect x="0" y="0" width="200" height="200" fill="#0b1220" />
      <rect x="100" y="0" width="100" height="100" fill="#f59e0b" opacity="0.06" />
      <rect x="100" y="100" width="100" height="100" fill="#ef4444" opacity="0.1" />
      <rect x="0" y="100" width="100" height="100" fill="#eab308" opacity="0.05" />
      {/* grid */}
      {[50, 100, 150].map(v => (
        <g key={v}>
          <line x1={v} y1="0" x2={v} y2="200" stroke="#1f2937" strokeWidth="0.5" />
          <line x1="0" y1={v} x2="200" y2={v} stroke="#1f2937" strokeWidth="0.5" />
        </g>
      ))}
      {/* axes labels */}
      <text x="100" y="196" fill="#64748b" fontSize="6" textAnchor="middle" fontFamily="ui-monospace, monospace">IMPACT →</text>
      <text x="4" y="100" fill="#64748b" fontSize="6" transform="rotate(-90 4 100)" fontFamily="ui-monospace, monospace">PROBABILITY →</text>
      {/* risk points */}
      {risks.map(r => {
        const cx = 10 + r.impact * 180
        const cy = 190 - r.probability * 180
        return (
          <g key={r.id}>
            <circle cx={cx} cy={cy} r="6" fill={color(r.severity)} opacity="0.25" className="breathe" />
            <circle cx={cx} cy={cy} r="3.5" fill={color(r.severity)} />
          </g>
        )
      })}
    </svg>
  )
}
