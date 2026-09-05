'use client'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Factory, Warehouse, Truck, Building2, Activity, Database, Zap, Cpu, Boxes } from 'lucide-react'
import { SectionHeading, SectionShell } from './shared'
import { useI18n } from '@/lib/i18n'

const NODES_LIVE = [
  { icon: <Factory className="h-5 w-5" />, nameKey: 'tehran', detailKey: 'factory' },
  { icon: <Warehouse className="h-5 w-5" />, nameKey: 'qom', detailKey: 'warehouse' },
  { icon: <Building2 className="h-5 w-5" />, nameKey: 'bandar', detailKey: 'distribution' },
  { icon: <Truck className="h-5 w-5" />, nameKey: 'fleet', detailKey: 'fleet' },
]

export default function LiveWorld() {
  const { t, lang } = useI18n()
  const w = t.liveWorld
  const nodes = [
    { ...NODES_LIVE[0], name: lang === 'fa' ? 'کارخانهٔ تهران' : 'Tehran Factory', status: 'LIVE', detail: lang === 'fa' ? '۲ خط تولید · ۳۸ سنسور' : '2 production lines · 38 sensors' },
    { ...NODES_LIVE[1], name: lang === 'fa' ? 'انبار قم' : 'Qom Warehouse', status: 'SYNCED', detail: lang === 'fa' ? '۴ زون · ۱۲٬۴۰۰ SKU' : '4 zones · 12,400 SKUs' },
    { ...NODES_LIVE[2], name: lang === 'fa' ? 'مرکز توزیع بندرعباس' : 'Bandar Abbas DC', status: 'LIVE', detail: lang === 'fa' ? 'هاب ورودی/خروجی' : 'Inbound/outbound hub' },
    { ...NODES_LIVE[3], name: lang === 'fa' ? 'ناوگان (۱۴ فعال)' : 'Fleet (14 active)', status: 'LIVE', detail: lang === 'fa' ? '۲ تأخیر · ۹ در ترانزیت' : '2 delayed · 9 in transit' },
  ]
  const signals = [
    { label: w.signals.invReceived, tone: 'emerald' },
    { label: w.signals.shipDispatched, tone: 'emerald' },
    { label: w.signals.invLow, tone: 'amber' },
    { label: w.signals.shipDelayed, tone: 'red' },
    { label: w.signals.prodCompleted, tone: 'emerald' },
    { label: w.signals.supplierDrop, tone: 'amber' },
    { label: w.signals.machineWarn, tone: 'amber' },
    { label: w.signals.invAdjusted, tone: 'emerald' },
  ]
  const pillars = [
    { icon: <Database className="h-5 w-5" />, ...w.pillars[0] },
    { icon: <Cpu className="h-5 w-5" />, ...w.pillars[1] },
    { icon: <Zap className="h-5 w-5" />, ...w.pillars[2] },
    { icon: <Boxes className="h-5 w-5" />, ...w.pillars[3] },
  ]
  return (
    <SectionShell id="platform">
      <SectionHeading
        eyebrow={w.eyebrow}
        title={<>{w.title}<span className="text-emerald-accent">{w.titleAccent}</span></>}
        description={w.desc}
      />

      <div className="mt-6 grid lg:grid-cols-3 gap-4">
        <Card className="glass rounded-2xl p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2"><Factory className="h-4 w-4 text-emerald-accent" /> {w.sites}</h3>
            <span className="text-xs font-mono text-muted-foreground">{w.org}</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {nodes.map((n, i) => (
              <div key={i} className="rounded-xl border border-border/40 bg-foreground/[0.02] p-3 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-emerald-accent">{n.icon}</span>
                  <span className={cn('text-[10px] font-mono px-1.5 py-0.5 rounded border',
                    n.status === 'LIVE' ? 'border-sev-low/30 text-sev-low' : 'border-primary/30 text-emerald-accent')}>
                    <span className="inline-flex items-center gap-1"><span className={cn('h-1.5 w-1.5 rounded-full', n.status === 'LIVE' ? 'bg-sev-low breathe' : 'bg-primary breathe')} />{n.status === 'LIVE' ? w.live : w.synced}</span>
                  </span>
                </div>
                <div className="mt-2 font-medium text-sm">{n.name}</div>
                <div className="text-xs text-muted-foreground">{n.detail}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2"><Activity className="h-4 w-4 text-emerald-accent" /> {w.events}</h3>
            <span className="text-xs font-mono text-muted-foreground flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-primary breathe" /> ●</span>
          </div>
          <div className="space-y-1.5 max-h-72 overflow-hidden">
            {signals.concat(signals).concat(signals).map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-mono">
                <span className={cn('h-1.5 w-1.5 rounded-full',
                  s.tone === 'emerald' ? 'bg-sev-low' : s.tone === 'amber' ? 'bg-sev-medium' : 'bg-sev-critical')} />
                <span className={cn('flex-1 truncate',
                  s.tone === 'emerald' ? 'text-muted-foreground' : s.tone === 'amber' ? 'text-sev-medium' : 'text-sev-critical')}>{s.label}</span>
                <span className="text-muted-foreground">{new Date(Date.now() - i * 11000).toLocaleTimeString(lang === 'fa' ? 'fa-IR' : 'en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass rounded-2xl p-5 lg:col-span-3">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map(p => (
              <div key={p.t} className="rounded-xl border border-border/40 p-3">
                <span className="text-emerald-accent">{p.icon}</span>
                <div className="mt-2 text-sm font-medium">{p.t}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{p.d}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </SectionShell>
  )
}
