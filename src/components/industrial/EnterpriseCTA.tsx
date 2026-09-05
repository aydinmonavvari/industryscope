'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check, ArrowRight, Building2, Sparkles, Rocket } from 'lucide-react'
import { SectionHeading, SectionShell } from './shared'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

const ICONS = [
  <Sparkles key="0" className="h-5 w-5" />,
  <Rocket key="1" className="h-5 w-5" />,
  <Building2 key="2" className="h-5 w-5" />,
]

export default function EnterpriseCTA() {
  const { t } = useI18n()
  const en = t.enterprise
  return (
    <SectionShell id="enterprise">
      <SectionHeading
        align="center"
        eyebrow={en.eyebrow}
        title={<>{en.title}<span className="text-emerald-accent">{en.titleAccent}</span></>}
        description={en.desc}
      />

      <div className="mt-10 grid lg:grid-cols-3 gap-4">
        {en.tiers.map((tier, i) => (
          <Card key={tier.name} className={cn('rounded-2xl p-6 relative overflow-hidden',
            tier.name === 'Growth' || tier.name === 'رشد' ? 'glass-strong border-primary/50' : 'glass border-border/40')}>
            {(i === 1) && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-mono px-3 py-1 rounded-bl-lg">{en.mostChosen}</div>
            )}
            <div className="flex items-center gap-2">
              <span className={cn('h-9 w-9 rounded-lg flex items-center justify-center',
                i === 1 ? 'bg-primary/15 text-emerald-accent' : 'bg-foreground/5 text-muted-foreground')}>{ICONS[i]}</span>
              <h3 className="text-lg font-semibold">{tier.name}</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{tier.desc}</p>
            <ul className="mt-4 space-y-2">
              {tier.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className={cn('h-4 w-4 mt-0.5 flex-shrink-0', i === 1 ? 'text-emerald-accent' : 'text-muted-foreground')} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button className={cn('mt-6 w-full h-11',
              i === 1 ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'glass')} variant={i === 1 ? 'default' : 'outline'}>
              {tier.cta} <ArrowRight className="ml-1.5 h-4 w-4 rtl-flip" />
            </Button>
          </Card>
        ))}
      </div>

      <Card className="glass-strong mt-10 rounded-2xl p-6 sm:p-8 text-center">
        <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          {en.ctaTitle}<span className="text-emerald-accent">{en.ctaTitleAccent}</span>{en.ctaTitle2}
        </h3>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          {en.ctaDesc}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6">
            {en.bookBtn} <ArrowRight className="ml-2 h-4 w-4 rtl-flip" />
          </Button>
          <Button size="lg" variant="outline" className="glass h-12 px-6">{en.readArch}</Button>
        </div>
      </Card>
    </SectionShell>
  )
}
