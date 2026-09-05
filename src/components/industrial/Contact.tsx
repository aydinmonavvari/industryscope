'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'
import { toast } from 'sonner'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Loader2 } from 'lucide-react'
import { CONTACT } from '@/lib/config'
import { SectionHeading, SectionShell } from './shared'

type LeadType = 'contact' | 'demo' | 'quote' | 'partnership'

export default function Contact() {
  const { t, lang } = useI18n()
  const f = t.forms
  const c = t.contact
  const [submitting, setSubmitting] = useState(false)

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = String(fd.get('name') || '').trim()
    const email = String(fd.get('email') || '').trim()
    const message = String(fd.get('message') || '').trim()
    if (name.length < 2) { toast.error(f.nameReq); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast.error(f.emailReq); return }
    if (message.length < 3) { toast.error(f.messageReq); return }
    setSubmitting(true)
    try {
      const r = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'contact', name, email, phone: fd.get('phone'), company: fd.get('company'), role: fd.get('role'), message }) })
      const d = await r.json()
      if (d.ok) { toast.success(t.toasts.leadOk); form.reset() }
      else toast.error(t.toasts.err)
    } catch { toast.error(t.toasts.err) }
    finally { setSubmitting(false) }
  }

  return (
    <SectionShell id="contact">
      <SectionHeading eyebrow={c.eyebrow} title={<>{c.title} <span className="text-emerald-accent">{c.titleAccent}</span></>} description={c.desc} />

      <div className="mt-8 grid lg:grid-cols-5 gap-6">
        {/* Contact info + phone */}
        <div className="lg:col-span-2 space-y-3">
          <a href={`tel:${CONTACT.phoneRaw}`} className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-primary/40 border border-transparent transition-colors group">
            <span className="h-12 w-12 rounded-xl bg-primary/15 text-emerald-accent flex items-center justify-center flex-shrink-0"><Phone className="h-6 w-6" /></span>
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{c.phoneLabel}</div>
              <div dir="ltr" className="text-lg font-semibold tabular-nums truncate" style={{ direction: 'ltr' }}>{CONTACT.phoneIntl}</div>
              <div className="text-[11px] text-emerald-accent mt-0.5">{c.callNow} →</div>
            </div>
          </a>

          <a href={`mailto:${CONTACT.email}`} className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-primary/40 border border-transparent transition-colors">
            <span className="h-12 w-12 rounded-xl bg-primary/15 text-emerald-accent flex items-center justify-center flex-shrink-0"><Mail className="h-6 w-6" /></span>
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{c.emailLabel}</div>
              <div dir="ltr" className="font-medium truncate" style={{ direction: 'ltr' }}>{CONTACT.email}</div>
            </div>
          </a>

          <div className="glass rounded-2xl p-5 flex items-center gap-4">
            <span className="h-12 w-12 rounded-xl bg-foreground/5 text-muted-foreground flex items-center justify-center flex-shrink-0"><MapPin className="h-6 w-6" /></span>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{c.addressLabel}</div>
              <div className="font-medium">{lang === 'fa' ? CONTACT.addressFa : CONTACT.addressEn}</div>
            </div>
          </div>

          <div className="glass rounded-2xl p-5 flex items-center gap-4">
            <span className="h-12 w-12 rounded-xl bg-foreground/5 text-muted-foreground flex items-center justify-center flex-shrink-0"><Clock className="h-6 w-6" /></span>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{c.hoursLabel}</div>
              <div className="font-medium">{lang === 'fa' ? CONTACT.hoursFa : CONTACT.hoursEn}</div>
            </div>
          </div>

          <div className="flex gap-3">
            <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="glass rounded-xl p-4 flex-1 flex items-center justify-center gap-2 hover:border-primary/40 border border-transparent transition-colors text-sm font-medium">
              <MessageCircle className="h-4 w-4 text-emerald-accent" /> {c.whatsapp}
            </a>
            <a href={`https://t.me/${CONTACT.telegram}`} target="_blank" rel="noopener noreferrer" className="glass rounded-xl p-4 flex-1 flex items-center justify-center gap-2 hover:border-primary/40 border border-transparent transition-colors text-sm font-medium">
              <Send className="h-4 w-4 text-emerald-accent" /> {c.telegram}
            </a>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="lg:col-span-3 glass-strong rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-xs">{f.name} *</Label>
              <Input id="name" name="name" className="mt-1 bg-background/60" required />
            </div>
            <div>
              <Label htmlFor="email" className="text-xs">{f.email} *</Label>
              <Input id="email" name="email" type="email" dir="ltr" className="mt-1 bg-background/60" required />
            </div>
            <div>
              <Label htmlFor="phone" className="text-xs">{f.phone}</Label>
              <Input id="phone" name="phone" dir="ltr" className="mt-1 bg-background/60" />
            </div>
            <div>
              <Label htmlFor="company" className="text-xs">{f.company}</Label>
              <Input id="company" name="company" className="mt-1 bg-background/60" />
            </div>
            <div>
              <Label htmlFor="role" className="text-xs">{f.role}</Label>
              <Input id="role" name="role" className="mt-1 bg-background/60" />
            </div>
            <div>
              <Label htmlFor="country" className="text-xs">{f.country}</Label>
              <Input id="country" name="country" className="mt-1 bg-background/60" />
            </div>
          </div>
          <div>
            <Label htmlFor="message" className="text-xs">{f.message} *</Label>
            <Textarea id="message" name="message" rows={4} className="mt-1 bg-background/60" required />
          </div>
          <Button type="submit" disabled={submitting} className="w-full sm:w-auto h-11 px-6 bg-primary text-primary-foreground hover:bg-primary/90">
            {submitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> {f.submitting}</> : <>{f.submit} <Send className="ml-2 h-4 w-4 rtl-flip" /></>}
          </Button>
        </form>
      </div>
    </SectionShell>
  )
}
