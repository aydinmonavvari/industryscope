'use client'
import { useEffect, useState, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Boxes, Search, Filter, AlertTriangle, TrendingDown, PackageCheck, Layers } from 'lucide-react'
import { KpiCard, SectionHeading, SectionShell } from './shared'

type Item = {
  id: string; sku: string; name: string; category: string; abcClass: string; unit: string
  warehouse: string; onHand: number; reserved: number; available: number
  safetyStock: number; reorderPoint: number; unitCost: string; capitalLockedUsd: number
  coverageDays: number; leadTimeDays: number; health: string
}
type Summary = { total: number; healthy: number; lowStock: number; stockout: number; overstock: number; totalCapitalLockedUsd: number }
type Resp = { summary: Summary; items: Item[] }

const TABS = [
  { id: 'all', label: 'All', icon: <Layers className="h-3.5 w-3.5" /> },
  { id: 'stockout', label: 'Stockout', icon: <AlertTriangle className="h-3.5 w-3.5" /> },
  { id: 'low_stock', label: 'Low Stock', icon: <TrendingDown className="h-3.5 w-3.5" /> },
  { id: 'overstock', label: 'Overstock', icon: <PackageCheck className="h-3.5 w-3.5" /> },
  { id: 'healthy', label: 'Healthy', icon: <PackageCheck className="h-3.5 w-3.5" /> },
] as const

const HEALTH_CLS: Record<string, string> = {
  stockout: 'bg-sev-critical/15 text-sev-critical border-sev-critical/30',
  low_stock: 'bg-sev-high/15 text-sev-high border-sev-high/30',
  overstock: 'bg-sev-medium/15 text-sev-medium border-sev-medium/30',
  healthy: 'bg-sev-low/15 text-sev-low border-sev-low/30',
}

export default function InventoryIntelligence() {
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

  return (
    <SectionShell id="inventory">
      <SectionHeading
        eyebrow="Inventory Intelligence"
        title={<>See what is <span className="text-emerald-accent">at risk</span> across every warehouse</>}
        description="Real-time stock health, stockout prediction, overstock capital lock, dead-stock detection. Movement ledger backed. Every change auditable."
      />

      {s && (
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <KpiCard label="Total SKUs Tracked" value={s.total} icon={<Boxes className="h-4 w-4" />} dataState="SYNCED" />
          <KpiCard label="Stockout (immediate)" value={s.stockout} accent="critical" icon={<AlertTriangle className="h-4 w-4" />} dataState="LIVE" />
          <KpiCard label="Low Stock (approaching)" value={s.lowStock} accent="high" icon={<TrendingDown className="h-4 w-4" />} dataState="LIVE" />
          <KpiCard label="Capital Locked" value={`$${(s.totalCapitalLockedUsd / 1000).toFixed(0)}k`} accent="high" icon={<Layers className="h-4 w-4" />} dataState="SYNCED" />
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
            <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search SKU or product…" className="pl-9 bg-background/60" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto -mx-2">
          {loading ? (
            <div className="py-12 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary breathe" /> Reading inventory ledger…
            </div>
          ) : items.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">No items match the current filter.</div>
          ) : (
            <table className="w-full text-sm min-w-[820px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border/40">
                  <th className="font-medium px-2 py-2">SKU / Product</th>
                  <th className="font-medium px-2 py-2">Warehouse</th>
                  <th className="font-medium px-2 py-2 text-right">On Hand</th>
                  <th className="font-medium px-2 py-2 text-right">Reorder Pt</th>
                  <th className="font-medium px-2 py-2 text-right">Safety</th>
                  <th className="font-medium px-2 py-2 text-right">Coverage</th>
                  <th className="font-medium px-2 py-2 text-right">Capital</th>
                  <th className="font-medium px-2 py-2 text-right">Health</th>
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
                      <td className={cn('px-2 py-2.5 text-right tabular-nums font-mono text-xs', coverageCritical ? 'text-sev-critical' : '')}>{i.coverageDays}d</td>
                      <td className="px-2 py-2.5 text-right tabular-nums">${i.capitalLockedUsd.toLocaleString()}</td>
                      <td className="px-2 py-2.5 text-right">
                        <span className={cn('inline-block px-2 py-0.5 rounded border text-[10px] font-semibold uppercase', HEALTH_CLS[i.health])}>
                          {i.health.replace('_', ' ')}
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
            <span className="flex items-center gap-1"><Filter className="h-3 w-3" /> {items.length} of {data.summary.total} items</span>
            <span>movement ledger · immutable · audited</span>
          </div>
        )}
      </Card>
    </SectionShell>
  )
}
