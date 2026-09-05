'use client'
import { Hexagon, ArrowUpRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export default function Footer() {
  const { t, lang } = useI18n()
  const f = t.footer
  return (
    <footer className="mt-auto border-t border-border/40 bg-foreground/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-6 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="relative">
                <Hexagon className="h-7 w-7 text-emerald-accent" />
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-background">IS</span>
              </span>
              <span className="font-semibold tracking-tight text-lg">Industry<span className="text-emerald-accent">Scope</span></span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              {f.tagline}
            </p>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary breathe" />
              {f.operational}
            </div>
          </div>
          {f.cols.map(c => (
            <div key={c.title}>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-3">{c.title}</div>
              <ul className="space-y-2">
                {c.links.map(l => (
                  <li key={l}>
                    <a href="#" className="text-sm text-foreground/80 hover:text-emerald-accent transition-colors inline-flex items-center gap-1">
                      {l} <ArrowUpRight className={cn('h-3 w-3 opacity-0 group-hover:opacity-100', lang === 'fa' ? '' : '')} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>{f.copy}</span>
          <div className="flex items-center gap-4 font-mono">
            <span>{f.version}</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-primary breathe" /> {f.dataSeeded}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
