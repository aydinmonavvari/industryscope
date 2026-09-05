'use client'
import { useEffect, useState, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Boxes, Search, Filter, AlertTriangle, TrendingDown, PackageCheck, Layers } from 'lucide-react'
import { KpiCard, SectionHeading, SectionShell } from './shared'
import { useI18n } from '@/lib/i18n'

type Item = {
  id: string; sku: string; name: string; category: string; abcClass: string; unit: string
  warehouse: string; onHand: number; reserved: number; available: number
  safetyStock: number; reorderPoint: number; unitCost: string; capitalLockedUsd: number
  coverageDays: number; leadTimeDays: number; health: string
}
type Summary = { total: number; healthy: number; lowStock: number; stockout: number; overstock: number; totalCapitalLockedUsd: number }
type Resp = { summary: Summary; items: Item[] }

const HEALTH_CLS: Record<string, string> = {
  stockout: 'bg-sev-critical/15 text-sev-critical border-sev-critical/30',
  low_stock: 'bg-sev-high/15 text-sev-high border-sev-high/30',
  overstock: 'bg-sev-medium/15 text-sev-medium border-sev-medium/30',
  healthy: 'bg-sev-low/15 text-sev-low border-sev-low/30',
}

export default function InventoryIntelligence() {
  const { t, lang } = useI18n()
  const inv = t.inventory
  const [tab, setTab] = useState<string>('all')
  const [q, setQ] = useState('')
  const [data, setData] = useState<Resp | null>(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const r = await fetch(`/api/inventory?health=${tab}`, { cache: 'no-store' })
      const d = await r.json()
      setData(d)
    } finally { setLoading(false) }
  }, [tab])

  useEffect(() => { load() }, [load])

  const items = data?.items.filter(i => !q || i.name.toLowerCase().includes(q.toLowerCase()) || i.sku.toLowerCase().includes(q.toLowerCase())) ?? []
  const s = data?.summary
  const TABS = [
    { id: 'all', label: inv.tabs.all, icon: <Layers className="h-3.5 w-3.5" /> },
    { id: 'stockout', label: inv.tabs.stockout, icon: <AlertTriangle className="h-3.5 w-3.5" /> },
    { id: 'low_stock', label: inv.tabs.low, icon: <TrendingDown className="h-3.5 w-3.5" /> },
    { id: 'overstock', label: inv.tabs.overstock, icon: <PackageCheck className="h-3.5 w-3.5" /> },
    { id: 'healthy', label: inv.tabs.healthy, icon: <PackageCheck className="h-3.5 w-3.5" /> },
  ] as const

  return (
    <SectionShell id="inventory">
      <SectionHeading
        eyebrow={inv.eyebrow}
        title={<>{inv.title}<span className="text-emerald-accent">{inv.titleAccent}</span></>}
        description={inv.desc}
      />

      {s && (
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <KpiCard label={inv.kpis.total} value={s.total} icon={<Boxes className="h-4 w-4" />} dataState="SYNCED" />
          <KpiCard label={inv.kpis.stockout} value={s.stockout} accent="critical" icon={<AlertTriangle className="h-4 w-4" />} dataState="LIVE" />
          <KpiCard label={inv.kpis.low} value={s.lowStock} accent="high" icon={<TrendingDown className="h-4 w-4" />} dataState="LIVE" />
          <KpiCard label={inv.kpis.capital} value={`$${(s.totalCapitalLockedUsd / 1000).toFixed(0)}k`} accent="high" icon={<Layers className="h-4 w-4" />} dataState="SYNCED" />
        </div>
      )}

      <Card className="glass mt-6 rounded-2xl p-4 sm:p-5">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <div className="flex items-center gap-1 p-1 rounded-lg bg-foreground/[0.03] border border-border/40 overflow-x-auto">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={cn('inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors',
                  tab === t.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground')}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
          <div className="relative flex-1 sm:max-w-xs sm:ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={e => setQ(e.target.value)} placeholder={inv.search} className="pl-9 bg-background/60" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto -mx-2">
          {loading ? (
            <div className="py-12 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary breathe" /> {lang === 'fa' ? 'خواندن دفتر جابجایی…' : 'Reading inventory ledger…'}
            </div>
          ) : items.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">{lang === 'fa' ? 'موردی منطبق با فیلتر فعلی وجود ندارد.' : 'No items match the current filter.'}</div>
          ) : (
            <table className="w-full text-sm min-w-[820px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border/40">
                  <th className="font-medium px-2 py-2">{inv.cols.sku}</th>
                  <th className="font-medium px-2 py-2">{inv.cols.wh}</th>
                  <th className="font-medium px-2 py-2 text-right">{inv.cols.onHand}</th>
                  <th className="font-medium px-2 py-2 text-right">{inv.cols.reorder}</th>
                  <th className="font-medium px-2 py-2 text-right">{inv.cols.safety}</th>
                  <th className="font-medium px-2 py-2 text-right">{inv.cols.coverage}</th>
                  <th className="font-medium px-2 py-2 text-right">{inv.cols.capital}</th>
                  <th className="font-medium px-2 py-2 text-right">{inv.cols.health}</th>
                </tr>
              </thead>
              <tbody>
                {items.map(i => {
                  const coverageCritical = i.coverageDays < 7
                  return (
                    <tr key={i.id} className="border-b border-border/20 hover:bg-foreground/[0.02] transition-colors">
                      <td className="px-2 py-2.5">
                        <div className="font-mono text-xs text-muted-foreground">{i.sku}</div>
                        <div className="font-medium">{i.name}</div>
                        <div className="text-[10px] text-muted-foreground">{i.category} · Class {i.abcClass}</div>
                      </td>
                      <td className="px-2 py-2.5 text-xs">{i.warehouse}</td>
                      <td className="px-2 py-2.5 text-right tabular-nums">{i.onHand.toLocaleString()} <span className="text-[10px] text-muted-foreground">{i.unit}</span></td>
                      <td className="px-2 py-2.5 text-right tabular-nums text-muted-foreground">{i.reorderPoint.toLocaleString()}</td>
                      <td className="px-2 py-2.5 text-right tabular-nums text-muted-foreground">{i.safetyStock.toLocaleString()}</td>
                      <td className={cn('px-2 py-2.5 text-right tabular-nums font-mono text-xs', coverageCritical ? 'text-sev-critical' : '')}>{i.coverageDays}{lang === 'fa' ? '' : 'd'}</td>
                      <td className="px-2 py-2.5 text-right tabular-nums">${i.capitalLockedUsd.toLocaleString(lang === 'fa' ? 'fa-IR' : 'en-US')}</td>
                      <td className="px-2 py-2.5 text-right">
                        <span className={cn('inline-block px-2 py-0.5 rounded border text-[10px] font-semibold uppercase', HEALTH_CLS[i.health])}>
                          {i.health === 'stockout' ? inv.tabs.stockout : i.health === 'low_stock' ? inv.tabs.low : i.health === 'overstock' ? inv.tabs.overstock : inv.tabs.healthy}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
        {data && (
          <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
            <span className="flex items-center gap-1"><Filter className="h-3 w-3" /> {items.length} {inv.items} {data.summary.total}</span>
            <span>{inv.movement}</span>
          </div>
        )}
      </Card>
    </SectionShell>
  )
}
