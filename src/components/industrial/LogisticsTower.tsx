'use client'
import { useEffect, useState, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Truck, MapPin, Clock, AlertTriangle, Package, Navigation } from 'lucide-react'
import { KpiCard, SectionHeading, SectionShell } from './shared'
import { useI18n } from '@/lib/i18n'

type Shipment = {
  id: string; reference: string; status: string; carrier: string; supplier: string | null
  originName: string; originLat: number | null; originLng: number | null
  destName: string; destLat: number | null; destLng: number | null
  distanceKm: number | null; progress: number; delayMinutes: number
  eta: string | null; dispatchedAt: string | null; deliveredAt: string | null
  items: { sku: string; name: string; quantity: number }[]
  lastTracking: { status: string; lat: number | null; lng: number | null; note: string | null; at: string } | null
}
type Resp = { counts: Record<string, number>; shipments: Shipment[] }

const STATUS_CLS: Record<string, string> = {
  PLANNED: 'bg-foreground/10 text-muted-foreground border-border',
  DISPATCHED: 'bg-sev-info/15 text-sev-info border-sev-info/30',
  IN_TRANSIT: 'bg-sev-low/15 text-sev-low border-sev-low/30',
  DELAYED: 'bg-sev-critical/15 text-sev-critical border-sev-critical/30',
  DELIVERED: 'bg-primary/15 text-emerald-accent border-primary/30',
  CANCELLED: 'bg-foreground/10 text-muted-foreground border-border',
}

const PIPELINE = ['PLANNED', 'DISPATCHED', 'IN_TRANSIT', 'DELIVERED'] as const

export default function LogisticsTower() {
  const { t, lang } = useI18n()
  const lg = t.logistics
  const [data, setData] = useState<Resp | null>(null)
  const [loading, setLoading] = useState(true)
  const [sel, setSel] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const r = await fetch('/api/logistics', { cache: 'no-store' })
      const d = await r.json()
      setData(d)
      setSel(d.shipments?.[0]?.id ?? null)
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const selected = data?.shipments.find(s => s.id === sel) ?? null
  const statusLabel = (s: string) => (lg.pipeline as Record<string, string>)[s] ?? s

  return (
    <SectionShell id="logistics">
      <SectionHeading
        eyebrow={lg.eyebrow}
        title={<>{lg.title}<span className="text-emerald-accent">{lg.titleAccent}</span></>}
        description={lg.desc}
      />

      {data && (
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <KpiCard label={lg.kpis.open} value={data.counts.planned + data.counts.dispatched + data.counts.inTransit + data.counts.delayed} icon={<Truck className="h-4 w-4" />} dataState="LIVE" />
          <KpiCard label={lg.kpis.transit} value={data.counts.inTransit} accent="low" icon={<Navigation className="h-4 w-4" />} dataState="LIVE" />
          <KpiCard label={lg.kpis.delayed} value={data.counts.delayed} accent="critical" icon={<AlertTriangle className="h-4 w-4" />} dataState="LIVE" />
          <KpiCard label={lg.kpis.delivered} value={data.counts.delivered} accent="primary" icon={<Package className="h-4 w-4" />} dataState="SYNCED" />
        </div>
      )}

      {/* Pipeline */}
      {data && (
        <Card className="glass mt-6 rounded-2xl p-4 sm:p-5">
          <div className="grid grid-cols-4 gap-2">
            {PIPELINE.map((p, idx) => {
              const count = data.counts[p] ?? 0
              return (
                <div key={p} className="relative">
                  <div className={cn('rounded-lg border p-3 text-center', STATUS_CLS[p])}>
                    <div className="text-2xl font-semibold tabular-nums">{count}</div>
                    <div className="text-[10px] uppercase tracking-wider mt-1">{statusLabel(p)}</div>
                  </div>
                  {idx < PIPELINE.length - 1 && <div className="hidden sm:block absolute top-1/2 -right-1 h-px w-2 bg-border" />}
                </div>
              )
            })}
          </div>
        </Card>
      )}

      <div className="mt-6 grid lg:grid-cols-5 gap-4">
        {/* List */}
        <Card className="glass rounded-2xl p-3 lg:col-span-2 max-h-[560px] overflow-hidden flex flex-col">
          <div className="px-2 py-2 flex items-center justify-between">
            <span className="text-sm font-semibold">{lg.active}</span>
            <span className="text-[11px] text-muted-foreground font-mono">{data?.shipments.length ?? 0} {lang === 'fa' ? 'مجموع' : 'total'}</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
            {loading ? (
              <div className="py-10 text-center text-sm text-muted-foreground flex items-center justify-center gap-2"><span className="h-2 w-2 rounded-full bg-primary breathe" /> {lang === 'fa' ? 'بارگذاری محموله‌ها…' : 'Loading shipments…'}</div>
            ) : data?.shipments.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted-foreground">{lang === 'fa' ? 'محموله‌ای نیست.' : 'No shipments.'}</div>
            ) : (
              data?.shipments.map(s => (
                <button key={s.id} onClick={() => setSel(s.id)}
                  className={cn('w-full text-left rounded-lg border p-3 transition-all',
                    sel === s.id ? 'border-primary/50 bg-primary/5' : 'border-border/40 hover:border-border/80 hover:bg-foreground/[0.02]')}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{s.reference}</span>
                    <span className={cn('text-[10px] px-1.5 py-0.5 rounded border font-semibold uppercase', STATUS_CLS[s.status])}>{statusLabel(s.status)}</span>
                  </div>
                  <div className="mt-1.5 text-sm font-medium truncate">{s.originName} {lang === 'fa' ? '←' : '→'} {s.destName}</div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{s.carrier}</span>
                    {s.delayMinutes > 0 && <span className="text-sev-critical font-mono">+{s.delayMinutes}m delay</span>}
                  </div>
                  {/* progress */}
                  <div className="mt-2 h-1 rounded-full bg-foreground/10 overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${Math.round(s.progress * 100)}%` }} />
                  </div>
                </button>
              ))
            )}
          </div>
        </Card>

        {/* Detail / map */}
        <Card className="glass rounded-2xl p-4 sm:p-5 lg:col-span-3">
          {selected ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-mono text-xs text-muted-foreground">{selected.reference}</div>
                  <h3 className="text-lg font-semibold">{selected.originName} {lang === 'fa' ? '←' : '→'} {selected.destName}</h3>
                  <div className="mt-1 text-xs text-muted-foreground">{selected.carrier}{selected.supplier ? ` · ${selected.supplier}` : ''} · {selected.distanceKm ?? '—'} km</div>
                </div>
                <span className={cn('text-xs px-2 py-1 rounded border font-semibold uppercase', STATUS_CLS[selected.status])}>{statusLabel(selected.status)}</span>
              </div>

              {/* Route viz (SVG) */}
              <div className="relative h-44 rounded-xl border border-border/40 bg-foreground/[0.02] overflow-hidden">
                <RouteSvg progress={selected.progress} delayed={selected.status === 'DELAYED'} delivered={selected.status === 'DELIVERED'} lang={lang} />
              </div>

              {/* Progress + ETA */}
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-lg border border-border/40 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{lg.progress}</div>
                  <div className="text-xl font-semibold tabular-nums">{Math.round(selected.progress * 100)}%</div>
                </div>
                <div className="rounded-lg border border-border/40 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {lg.eta}</div>
                  <div className="text-sm font-mono">{selected.eta ? new Date(selected.eta).toLocaleString(lang === 'fa' ? 'fa-IR' : 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}</div>
                </div>
                <div className="rounded-lg border border-border/40 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{lg.delay}</div>
                  <div className={cn('text-xl font-semibold tabular-nums', selected.delayMinutes > 0 ? 'text-sev-critical' : 'text-emerald-accent')}>{selected.delayMinutes > 0 ? `+${selected.delayMinutes}${lang === 'fa' ? '' : 'm'}` : lg.onTime}</div>
                </div>
              </div>

              {/* Items */}
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1"><Package className="h-3 w-3" /> {lg.contents}</div>
                <div className="flex flex-wrap gap-2">
                  {selected.items.map((it, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 rounded-md border border-border/40 px-2.5 py-1 text-xs bg-foreground/[0.02]">
                      <span className="font-mono text-muted-foreground">{it.sku}</span>
                      {it.name}
                      <span className="font-semibold tabular-nums">×{it.quantity}</span>
                    </span>
                  ))}
                </div>
              </div>

              {selected.lastTracking && (
                <div className="rounded-lg border border-border/40 p-3 bg-foreground/[0.02]">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> {lg.lastTracking}</div>
                  <div className="mt-1 text-sm">{selected.lastTracking.status} — {selected.lastTracking.note}</div>
                  <div className="text-[11px] text-muted-foreground font-mono">{new Date(selected.lastTracking.at).toLocaleString(lang === 'fa' ? 'fa-IR' : 'en-US')}</div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-16 text-center text-sm text-muted-foreground">{lg.select}</div>
          )}
        </Card>
      </div>
    </SectionShell>
  )
}

function RouteSvg({ progress, delayed, delivered, lang }: { progress: number; delayed: boolean; delivered: boolean; lang: 'fa' | 'en' }) {
  const x = 40 + (880 - 40) * Math.max(0.02, Math.min(0.98, progress))
  const color = delayed ? '#ef4444' : delivered ? '#34d399' : '#10b981'
  return (
    <svg viewBox="0 0 960 180" className="w-full h-full">
      <defs>
        <pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#1f2937" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="960" height="180" fill="url(#dots)" opacity="0.3" />
      <line x1="40" y1="90" x2="880" y2="90" stroke="#1f2937" strokeWidth="2" />
      <line x1="40" y1="90" x2={x} y2="90" stroke={color} strokeWidth="3" className="flow-line" />
      <circle cx="40" cy="90" r="9" fill={color} />
      <text x="40" y="120" fill="#94a3b8" fontSize="11" fontFamily="ui-monospace, monospace" textAnchor="middle">{lang === 'fa' ? 'مبدأ' : 'Origin'}</text>
      <circle cx="880" cy="90" r="9" fill={delivered ? color : '#1f2937'} stroke={color} strokeWidth="2" />
      <text x="880" y="120" fill="#94a3b8" fontSize="11" fontFamily="ui-monospace, monospace" textAnchor="middle">{lang === 'fa' ? 'مقصد' : 'Destination'}</text>
      <g>
        <circle cx={x} cy="90" r="8" fill={color} />
        <circle cx={x} cy="90" r="14" fill={color} opacity="0.25" className="breathe" />
        <TruckIcon x={x - 18} y={60} color={color} />
      </g>
    </svg>
  )
}
function TruckIcon({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="0" y="0" width="28" height="14" rx="2" fill={color} opacity="0.9" />
      <rect x="28" y="3" width="8" height="11" rx="1" fill={color} opacity="0.7" />
      <circle cx="8" cy="16" r="3" fill="#0f172a" />
      <circle cx="30" cy="16" r="3" fill="#0f172a" />
    </g>
  )
}
