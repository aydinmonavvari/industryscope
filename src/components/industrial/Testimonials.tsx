'use client'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'
import { SectionHeading, SectionShell } from './shared'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type Testimonial = { id: string; name: string; role: string; company: string; quote: string; rating: number }

export default function Testimonials() {
  const { t } = useI18n()
  const [items, setItems] = useState<Testimonial[]>([])
  useEffect(() => {
    fetch('/api/testimonials').then(r => r.json()).then(d => setItems(d.testimonials ?? [])).catch(() => {})
  }, [])
  return (
    <SectionShell id="testimonials">
      <SectionHeading align="center" eyebrow={t.testimonials.eyebrow} title={<>{t.testimonials.title}</>} />
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {items.map((it) => (
          <Card key={it.id} className="glass rounded-2xl p-5 relative">
            <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/15 rtl-flip" />
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={cn('h-3.5 w-3.5', i < it.rating ? 'fill-sev-medium text-sev-medium' : 'text-muted-foreground/30')} />
              ))}
            </div>
            <p className="text-sm leading-relaxed text-foreground/90">"{it.quote}"</p>
            <div className="mt-4 pt-3 border-t border-border/30 flex items-center gap-3">
              <span className="h-9 w-9 rounded-full bg-primary/15 text-emerald-accent flex items-center justify-center font-semibold text-sm">
                {it.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
              </span>
              <div>
                <div className="text-sm font-medium">{it.name}</div>
                <div className="text-[11px] text-muted-foreground">{it.role} · {it.company}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </SectionShell>
  )
}
