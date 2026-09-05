'use client'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Factory, Warehouse, Truck, Building2, Activity, Database, Zap, Cpu, Boxes } from 'lucide-react'
import { SectionHeading, SectionShell } from './shared'

const NODES = [
  { icon: <Factory className="h-5 w-5" />, name: 'Tehran Factory', type: 'factory', status: 'LIVE', detail: '2 production lines · 38 sensors' },
  { icon: <Warehouse className="h-5 w-5" />, name: 'Qom Warehouse', type: 'warehouse', status: 'SYNCED', detail: '4 zones · 12,400 SKUs' },
  { icon: <Building2 className="h-5 w-5" />, name: 'Bandar Abbas DC', type: 'distribution', status: 'LIVE', detail: 'Inbound/outbound hub' },
  { icon: <Truck className="h-5 w-5" />, name: 'Fleet (14 active)', type: 'logistics', status: 'LIVE', detail: '2 delayed · 9 in transit' },
]

const SIGNALS = [
  { label: 'inventory.received', tone: 'emerald' },
  { label: 'shipment.dispatched', tone: 'emerald' },
  { label: 'inventory.low_stock', tone: 'amber' },
  { label: 'shipment.delayed', tone: 'red' },
  { label: 'production.completed', tone: 'emerald' },
  { label: 'supplier.on_time_drop', tone: 'amber' },
  { label: 'machine.warning', tone: 'amber' },
  { label: 'inventory.adjusted', tone: 'emerald' },
]

export default function LiveWorld() {
  return (
    <SectionShell id="platform">
      <SectionHeading
        eyebrow="The Live Industrial World"
        title={<>A living system, not a <span className="text-emerald-accent">collection of screens.</span></>}
        description="Sites, facilities, warehouses, fleets, suppliers — connected as one operational graph. Every signal flows into intelligence, alerts, recommendations, and audit."
      />

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        {/* Connected world */}
        <Card className="glass rounded-2xl p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2"><Factory className="h-4 w-4 text-emerald-accent" /> Connected Sites</h3>
            <span className="text-xs font-mono text-muted-foreground">org: pars_industrial_group</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {NODES.map((n, i) => (
              <div key={i} className="rounded-xl border border-border/40 bg-foreground/[0.02] p-3 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-emerald-accent">{n.icon}</span>
                  <span className={cn('text-[10px] font-mono px-1.5 py-0.5 rounded border',
                    n.status === 'LIVE' ? 'border-sev-low/30 text-sev-low' : 'border-primary/30 text-emerald-accent')}>
                    <span className="inline-flex items-center gap-1"><span className={cn('h-1.5 w-1.5 rounded-full', n.status === 'LIVE' ? 'bg-sev-low breathe' : 'bg-primary breathe')} />{n.status}</span>
                  </span>
                </div>
                <div className="mt-2 font-medium text-sm">{n.name}</div>
                <div className="text-xs text-muted-foreground">{n.detail}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Event stream */}
        <Card className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2"><Activity className="h-4 w-4 text-emerald-accent" /> Event Stream</h3>
            <span className="text-xs font-mono text-muted-foreground flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-primary breathe" /> real-time</span>
          </div>
          <div className="space-y-1.5 max-h-72 overflow-hidden">
            {SIGNALS.concat(SIGNALS).concat(SIGNALS).map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-mono">
                <span className={cn('h-1.5 w-1.5 rounded-full',
                  s.tone === 'emerald' ? 'bg-sev-low' : s.tone === 'amber' ? 'bg-sev-medium' : 'bg-sev-critical')} />
                <span className={cn('flex-1 truncate',
                  s.tone === 'emerald' ? 'text-muted-foreground' : s.tone === 'amber' ? 'text-sev-medium' : 'text-sev-critical')}>{s.label}</span>
                <span className="text-muted-foreground">{new Date(Date.now() - i * 11000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Architecture pillars */}
        <Card className="glass rounded-2xl p-5 lg:col-span-3">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Database className="h-5 w-5" />, title: 'Normalized domain model', desc: 'Tenant-bound, FK-constrained, immutable movement ledger.' },
              { icon: <Cpu className="h-5 w-5" />, title: 'Tool-registry AI', desc: '9 audited tools. Model never touches the database.' },
              { icon: <Zap className="h-5 w-5" />, title: 'Explicit state transitions', desc: 'Shipments, approvals, inventory — no arbitrary mutation.' },
              { icon: <Boxes className="h-5 w-5" />, title: 'Audit by default', desc: 'Every sensitive action recorded, append-only.' },
            ].map(p => (
              <div key={p.title} className="rounded-xl border border-border/40 p-3">
                <span className="text-emerald-accent">{p.icon}</span>
                <div className="mt-2 text-sm font-medium">{p.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{p.desc}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </SectionShell>
  )
}
