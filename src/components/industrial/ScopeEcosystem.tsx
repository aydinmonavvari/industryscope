'use client'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Hexagon, Boxes, Coins, HeartPulse, Layers3, ArrowUpRight, Home, Gem } from 'lucide-react'
import { SectionHeading, SectionShell } from './shared'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

// Real product domains (SEO cross-links)
const DOMAINS: Record<string, string> = {
  ScopeOS: 'https://scopeos.ir',
  IndustryScope: '/', // self
  FinScope: 'https://finscope.ir',
  GoldScope: 'https://goldscope.ir',
  VestaScope: 'https://vestascope.ir',
  HealthScope: 'https://healthscope.ir',
}

const ICONS = [
  <Hexagon key="0" className="h-5 w-5" />,
  <Layers3 key="1" className="h-5 w-5" />,
  <Coins key="2" className="h-5 w-5" />,
  <Gem key="3" className="h-5 w-5" />,
  <Home key="4" className="h-5 w-5" />,
  <HeartPulse key="5" className="h-5 w-5" />,
]

export default function ScopeEcosystem() {
  const { t } = useI18n()
  const e = t.ecosystem
  return (
    <SectionShell id="ecosystem">
      <SectionHeading
        align="center"
        eyebrow={e.eyebrow}
        title={<>{e.title}<span className="text-emerald-accent">{e.titleAccent}</span></>}
        description={e.desc}
      />

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {e.products.map((p, i) => {
          const isSelf = p.name === 'IndustryScope'
          const url = DOMAINS[p.name]
          const CardInner = (
            <>
              <div className="flex items-center justify-between">
                <span className={cn('h-10 w-10 rounded-xl flex items-center justify-center',
                  isSelf ? 'bg-primary/15 text-emerald-accent' : 'bg-foreground/5 text-muted-foreground')}>{ICONS[i]}</span>
                {isSelf ? (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/15 text-emerald-accent border border-primary/30">{e.youAreHere}</span>
                ) : (
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-accent transition-colors" />
                )}
              </div>
              <div className="mt-3 font-semibold">{p.name}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{p.tag}</div>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              {!isSelf && url && url !== '/' && (
                <div className="mt-3 pt-2 border-t border-border/30 text-[10px] font-mono text-emerald-accent/70 truncate" dir="ltr">{url.replace('https://', '')}</div>
              )}
            </>
          )
          if (isSelf) {
            return (
              <Card key={p.name} className="rounded-2xl p-5 glass-strong border-primary/40 data-pulse">
                {CardInner}
              </Card>
            )
          }
          return (
            <motion.a
              key={p.name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group glass rounded-2xl p-5 block border border-border/40 hover:border-primary/30 transition-colors"
            >
              {CardInner}
            </motion.a>
          )
        })}
      </div>

      <div className="mt-8 text-center text-xs text-muted-foreground font-mono">
        {e.shared}
      </div>
    </SectionShell>
  )
}
