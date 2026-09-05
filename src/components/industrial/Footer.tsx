'use client'
import { useState } from 'react'
import { Hexagon, Phone, Mail, MessageCircle, Send, Loader2, ArrowUpRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'
import { CONTACT } from '@/lib/config'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Footer() {
  const { t, lang } = useI18n()
  const { navigate } = useRouter()
  const f = t.footer
  const fr = t.forms
  const [newsEmail, setNewsEmail] = useState('')
  const [subscribing, setSubscribing] = useState(false)
  const [legal, setLegal] = useState<null | 'privacy' | 'terms'>(null)

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsEmail)) { toast.error(fr.emailReq); return }
    setSubscribing(true)
    try {
      const r = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'newsletter', email: newsEmail }) })
      const d = await r.json()
      if (d.ok) { toast.success(d.duplicate ? t.toasts.newsDup : t.toasts.newsOk); setNewsEmail('') }
      else toast.error(t.toasts.err)
    } catch { toast.error(t.toasts.err) }
    finally { setSubscribing(false) }
  }

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
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">{f.tagline}</p>
            {/* Contact quick row */}
            <div className="mt-4 space-y-1.5 text-xs">
              <a href={`tel:${CONTACT.phoneRaw}`} className="flex items-center gap-2 text-muted-foreground hover:text-emerald-accent transition-colors" dir="ltr" style={{ direction: 'ltr' }}>
                <Phone className="h-3.5 w-3.5" /> <span className="font-mono">{CONTACT.phoneIntl}</span>
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-emerald-accent transition-colors" dir="ltr" style={{ direction: 'ltr' }}>
                <Mail className="h-3.5 w-3.5" /> <span className="font-mono">{CONTACT.email}</span>
              </a>
              <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-emerald-accent transition-colors">
                <MessageCircle className="h-3.5 w-3.5" /> {t.contact.whatsapp}
              </a>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary breathe" />
              {f.operational}
            </div>
          </div>
          {f.cols.map(c => {
            // Map link labels to routes
            const routeFor = (l: string): { hash?: string; ext?: string } => {
              const map: Record<string, string> = {
                // Platform
                'مرکز فرماندهی': 'command-center', 'Command Center': 'command-center',
                'هوشمندی موجودی': 'inventory', 'Inventory Intelligence': 'inventory',
                'برج کنترل لجستیک': 'logistics', 'Logistics Control Tower': 'logistics',
                'ریسک زنجیره تأمین': 'risk', 'Supply Chain Risk': 'risk',
                'دستیار هوش مصنوعی': 'copilot', 'AI Copilot': 'copilot',
                // Company
                'تماس': 'contact', 'Contact': 'contact',
                'قیمت‌گذاری': 'enterprise', 'Pricing': 'enterprise',
                'اکوسیستم': 'ecosystem', 'Ecosystem': 'ecosystem',
                // Articles + category labels all go to articles page
                'مقالات': 'intelligence', 'Articles': 'intelligence',
                'صنعت': 'intelligence', 'لجستیک': 'intelligence', 'زنجیره تأمین': 'intelligence',
                'هوش مصنوعی': 'intelligence', 'تولید': 'intelligence', 'اقتصاد': 'intelligence', 'عملیات': 'intelligence',
                'Industry': 'intelligence', 'Logistics': 'intelligence', 'Supply Chain': 'intelligence',
                'AI': 'intelligence', 'Manufacturing': 'intelligence', 'Economy': 'intelligence', 'Operations': 'intelligence',
                // Company extras
                'شرکای طراحی': 'enterprise', 'Design Partners': 'enterprise',
              }
              return { hash: map[l] }
            }
            const extFor = (l: string): string | null => {
              const m: Record<string, string> = {
                'ScopeOS': 'https://scopeos.ir', 'FinScope': 'https://finscope.ir', 'GoldScope': 'https://goldscope.ir', 'VestaScope': 'https://vestascope.ir', 'HealthScope': 'https://healthscope.ir', 'IndustryScope': '/',
              }
              return m[l] ?? null
            }
            return (
            <div key={c.title}>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-3">{c.title}</div>
              <ul className="space-y-2">
                {c.links.map(l => {
                  const r = routeFor(l)
                  const ext = extFor(l)
                  const handle = () => {
                    if (l === 'Privacy' || l === 'حریم خصوصی') return setLegal('privacy')
                    if (l === 'Terms' || l === 'شرایط استفاده') return setLegal('terms')
                    if (ext) { if (ext === '/') navigate(''); else window.open(ext, '_blank'); return }
                    if (r.hash) navigate(r.hash)
                  }
                  return (
                    <li key={l}>
                      <button onClick={handle} className="text-sm text-foreground/80 hover:text-emerald-accent transition-colors text-left flex items-center gap-1 group">
                        {l}
                        {ext && ext !== '/' && <ArrowUpRight className="h-2.5 w-2.5 opacity-0 group-hover:opacity-60 transition-opacity" />}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
            )
          })}
          {/* Newsletter */}
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-3">{lang === 'fa' ? 'خبرنامه' : 'Newsletter'}</div>
            <form onSubmit={subscribe} className="space-y-2">
              <Input value={newsEmail} onChange={e => setNewsEmail(e.target.value)} type="email" dir="ltr" placeholder={fr.newsletterPlaceholder} className="bg-background/60 text-sm" />
              <Button type="submit" disabled={subscribing} variant="outline" className="w-full h-9 text-sm">
                {subscribing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <>{fr.subscribe} <Send className="ml-1.5 h-3 w-3 rtl-flip" /></>}
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} {f.copy}</span>
          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-accent breathe" /> IndustryScope</span>
        </div>
        {/* Founder signature */}
        <div className="mt-4 pt-3 border-t border-border/20 text-center">
          <span className="text-xs text-emerald-accent font-medium">{f.founder}</span>
        </div>
      </div>

      <Dialog open={!!legal} onOpenChange={(v) => !v && setLegal(null)}>
        <DialogContent className="max-w-lg glass-strong">
          <DialogHeader>
            <DialogTitle>{legal === 'privacy' ? t.legal.privacy : t.legal.terms}</DialogTitle>
            <DialogDescription>IndustryScope</DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground leading-relaxed">{legal === 'privacy' ? t.legal.privacyBody : t.legal.termsBody}</p>
        </DialogContent>
      </Dialog>
    </footer>
  )
}
