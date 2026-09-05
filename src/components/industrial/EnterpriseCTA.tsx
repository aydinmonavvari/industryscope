'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Check, ArrowRight, Building2, Sparkles, Rocket, Loader2, Send } from 'lucide-react'
import { SectionHeading, SectionShell } from './shared'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'
import { toast } from 'sonner'

const ICONS = [
  <Sparkles key="0" className="h-5 w-5" />,
  <Rocket key="1" className="h-5 w-5" />,
  <Building2 key="2" className="h-5 w-5" />,
]

export default function EnterpriseCTA() {
  const { t } = useI18n()
  const en = t.enterprise
  const fr = t.forms
  const [selectedTier, setSelectedTier] = useState<string>('growth')
  const [submitting, setSubmitting] = useState(false)

  const requestQuote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') || '').trim()
    const email = String(fd.get('email') || '').trim()
    if (name.length < 2) { toast.error(fr.nameReq); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast.error(fr.emailReq); return }
    const sites = parseInt(String(fd.get('sites') || '0'), 10)
    setSubmitting(true)
    try {
      const r = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'quote', name, email, phone: fd.get('phone'), company: fd.get('company'), tier: selectedTier, sites: sites || undefined }) })
      const d = await r.json()
      if (d.ok) { toast.success(t.toasts.leadOk); (e.target as HTMLFormElement).reset() }
      else toast.error(t.toasts.err)
    } catch { toast.error(t.toasts.err) }
    finally { setSubmitting(false) }
  }

  return (
    <SectionShell id="enterprise">
      <SectionHeading align="center" eyebrow={en.eyebrow} title={<>{en.title}<span className="text-emerald-accent">{en.titleAccent}</span></>} description={en.desc} />

      <div className="mt-10 grid lg:grid-cols-3 gap-4">
        {en.tiers.map((tier, i) => (
          <Card key={tier.name} className={cn('rounded-2xl p-6 relative overflow-hidden',
            (tier.name === 'Growth' || tier.name === 'رشد') ? 'glass-strong border-primary/50' : 'glass border-border/40')}>
            {(i === 1) && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-mono px-3 py-1 rounded-bl-lg">{en.mostChosen}</div>
            )}
            <div className="flex items-center gap-2">
              <span className={cn('h-9 w-9 rounded-lg flex items-center justify-center', i === 1 ? 'bg-primary/15 text-emerald-accent' : 'bg-foreground/5 text-muted-foreground')}>{ICONS[i]}</span>
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
            <button onClick={() => { setSelectedTier(['starter', 'growth', 'enterprise'][i]); document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }} className={cn('mt-6 w-full h-11 rounded-xl text-sm font-medium transition-colors', i === 1 ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'glass hover:bg-foreground/5 border border-border/40')}>
              {tier.cta}
            </button>
          </Card>
        ))}
      </div>

      {/* Quote request form */}
      <Card id="quote-form" className="glass-strong mt-10 rounded-2xl p-6 sm:p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              {en.ctaTitle}<span className="text-emerald-accent">{en.ctaTitleAccent}</span>{en.ctaTitle2}
            </h3>
            <p className="mt-3 text-muted-foreground">{en.ctaDesc}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6" type="button" onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}>
                {en.bookBtn} <ArrowRight className="ml-2 h-4 w-4 rtl-flip" />
              </Button>
            </div>
          </div>
          <form onSubmit={requestQuote} className="space-y-3">
            <div className="text-sm font-semibold">{fr.quoteTitle}</div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">{fr.name} *</Label>
                <Input name="name" className="mt-1 bg-background/60" required />
              </div>
              <div>
                <Label className="text-xs">{fr.email} *</Label>
                <Input name="email" type="email" dir="ltr" className="mt-1 bg-background/60" required />
              </div>
              <div>
                <Label className="text-xs">{fr.phone}</Label>
                <Input name="phone" dir="ltr" className="mt-1 bg-background/60" />
              </div>
              <div>
                <Label className="text-xs">{fr.company}</Label>
                <Input name="company" className="mt-1 bg-background/60" />
              </div>
              <div>
                <Label className="text-xs">{fr.tier}</Label>
                <select value={selectedTier} onChange={e => setSelectedTier(e.target.value)} className="mt-1 w-full h-10 rounded-md border border-input bg-background/60 px-3 text-sm">
                  <option value="starter">Starter · استارتر</option>
                  <option value="growth">Growth · رشد</option>
                  <option value="enterprise">Enterprise · سازمانی</option>
                </select>
              </div>
              <div>
                <Label className="text-xs">{fr.sites}</Label>
                <Input name="sites" type="number" min={1} dir="ltr" placeholder={fr.sitesHint} className="mt-1 bg-background/60" />
              </div>
            </div>
            <Button type="submit" disabled={submitting} className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <>{fr.submit} <Send className="ml-2 h-4 w-4 rtl-flip" /></>}
            </Button>
          </form>
        </div>
      </Card>
    </SectionShell>
  )
}
