import { cn } from '@/lib/utils'
import { AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react'

export function SeverityBadge({ severity, className }: { severity: string; className?: string }) {
  const map: Record<string, { cls: string; label: string }> = {
    CRITICAL: { cls: 'bg-sev-critical/15 text-sev-critical border-sev-critical/30', label: 'Critical' },
    HIGH: { cls: 'bg-sev-high/15 text-sev-high border-sev-high/30', label: 'High' },
    MEDIUM: { cls: 'bg-sev-medium/15 text-sev-medium border-sev-medium/30', label: 'Medium' },
    LOW: { cls: 'bg-sev-low/15 text-sev-low border-sev-low/30', label: 'Low' },
    INFO: { cls: 'bg-sev-info/15 text-sev-info border-sev-info/30', label: 'Info' },
  }
  const s = map[severity] ?? map.INFO
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider', s.cls, className)}>
      {severity === 'CRITICAL' && <AlertTriangle className="h-2.5 w-2.5" />}
      {s.label}
    </span>
  )
}

export function ConfidenceMeter({ value, className }: { value: number; className?: string }) {
  const pct = Math.round(value * 100)
  const color = pct >= 80 ? 'var(--primary)' : pct >= 60 ? 'var(--sev-medium)' : 'var(--sev-low)'
  return (
    <div className={cn('flex items-center gap-2', className)} title={`Confidence ${pct}%`}>
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-foreground/10">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="font-mono text-[10px] text-muted-foreground">{pct}%</span>
    </div>
  )
}

export function DataStateDot({ state, className }: { state: 'LIVE' | 'SYNCED' | 'DELAYED' | 'SIMULATED' | 'OFFLINE'; className?: string }) {
  const map: Record<string, string> = {
    LIVE: 'bg-sev-low breathe',
    SYNCED: 'bg-primary breathe',
    DELAYED: 'bg-sev-medium',
    SIMULATED: 'bg-sev-info',
    OFFLINE: 'bg-sev-critical',
  }
  return (
    <span className={cn('inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider', className)}>
      <span className={cn('h-1.5 w-1.5 rounded-full', map[state])} />
      {state}
    </span>
  )
}

export function KpiCard({
  label, value, unit, delta, deltaDirection, icon, accent, dataState = 'SYNCED',
}: {
  label: string
  value: string | number
  unit?: string
  delta?: string
  deltaDirection?: 'up' | 'down' | 'flat'
  icon?: React.ReactNode
  accent?: 'primary' | 'critical' | 'high' | 'medium' | 'low'
  dataState?: 'LIVE' | 'SYNCED' | 'DELAYED' | 'SIMULATED' | 'OFFLINE'
}) {
  const accentCls = {
    primary: 'text-emerald-accent',
    critical: 'text-sev-critical',
    high: 'text-sev-high',
    medium: 'text-sev-medium',
    low: 'text-sev-low',
  }
  return (
    <div className="glass rounded-xl p-4 sm:p-5 relative overflow-hidden group">
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-start justify-between gap-2">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{label}</span>
        {icon && <span className={cn('opacity-70', accent ? accentCls[accent] : '')}>{icon}</span>}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className={cn('text-2xl sm:text-3xl font-semibold tracking-tight tabular-nums', accent ? accentCls[accent] : '')}>{value}</span>
        {unit && <span className="text-xs text-muted-foreground font-mono">{unit}</span>}
      </div>
      <div className="mt-2 flex items-center justify-between">
        {delta ? (
          <span className={cn('inline-flex items-center gap-1 text-[11px] font-mono',
            deltaDirection === 'up' ? 'text-sev-low' : deltaDirection === 'down' ? 'text-sev-critical' : 'text-muted-foreground')}>
            {deltaDirection === 'up' ? <ArrowUpRight className="h-3 w-3" /> : deltaDirection === 'down' ? <ArrowDownRight className="h-3 w-3" /> : null}
            {delta}
          </span>
        ) : <span />}
        <DataStateDot state={dataState} />
      </div>
    </div>
  )
}

export function SectionHeading({
  eyebrow, title, description, align = 'left', className,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: string
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div className={cn(align === 'center' ? 'text-center mx-auto max-w-3xl' : '', className)}>
      {eyebrow && (
        <div className={cn('flex items-center gap-2 mb-3', align === 'center' && 'justify-center')}>
          <span className="h-px w-6 bg-primary/60" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-emerald-accent font-semibold">{eyebrow}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">{title}</h2>
      {description && <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">{description}</p>}
    </div>
  )
}

export function SectionShell({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={cn('relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-7xl mx-auto', className)}>
      {children}
    </section>
  )
}
