'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Menu, X, Hexagon, ArrowRight, Languages, Phone, ShieldCheck } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { useRouter } from '@/lib/router'
import { CONTACT } from '@/lib/config'

export default function Nav() {
  const { t, toggle, lang } = useI18n()
  const { navigate, page } = useRouter()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (to: string) => { setOpen(false); navigate(to) }

  const LINKS = [
    { to: 'command-center', label: t.nav.commandCenter },
    { to: 'inventory', label: t.nav.inventory },
    { to: 'logistics', label: t.nav.logistics },
    { to: 'risk', label: t.nav.risk },
    { to: 'copilot', label: t.nav.copilot },
    { to: 'ecosystem', label: t.nav.ecosystem },
    { to: 'intelligence', label: t.nav.intelligence },
    { to: 'enterprise', label: t.nav.talkEnterprise },
    { to: 'contact', label: t.nav.contact || 'Contact' },
  ]

  return (
    <header className={cn('sticky top-0 z-50 transition-all', scrolled ? 'glass-strong border-b border-border/60' : 'border-b border-transparent')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button onClick={() => go('')} className="flex items-center gap-2.5 group" aria-label="IndustryScope home">
          <span className="relative">
            <Hexagon className="h-7 w-7 text-emerald-accent group-hover:rotate-90 transition-transform duration-500" />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-background">IS</span>
          </span>
          <span className="font-semibold tracking-tight text-lg">Industry<span className="text-emerald-accent">Scope</span></span>
        </button>

        <nav className="hidden lg:flex items-center gap-0.5">
          {LINKS.map(l => (
            <button key={l.to} onClick={() => go(l.to)}
              className={cn('px-2.5 py-1.5 text-sm rounded-md transition-colors',
                page === l.to ? 'text-emerald-accent bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5')}>
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <button onClick={toggle} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md glass text-sm hover:bg-foreground/5 transition-colors" aria-label="Switch language">
            <Languages className="h-4 w-4 text-emerald-accent" />
            <span className="font-semibold">{lang === 'fa' ? 'EN' : 'فارسی'}</span>
          </button>
          <a href={`tel:${CONTACT.phoneRaw}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md glass text-sm hover:bg-foreground/5 transition-colors" dir="ltr" style={{ direction: 'ltr' }}>
            <Phone className="h-4 w-4 text-emerald-accent" />
            <span className="font-mono font-semibold tabular-nums">{CONTACT.phoneRaw}</span>
          </a>
          <button onClick={() => go('admin')} className={cn('p-2 rounded-md glass hover:bg-foreground/5 transition-colors', page === 'admin' && 'border-primary/40')} aria-label={t.owner.navLabel}>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </button>
          <Button size="sm" onClick={() => go('command-center')} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {t.nav.enterDemo} <ArrowRight className="ml-1.5 h-3.5 w-3.5 rtl-flip" />
          </Button>
        </div>

        <div className="lg:hidden flex items-center gap-1">
          <a href={`tel:${CONTACT.phoneRaw}`} className="p-2 rounded-md glass" aria-label="Call">
            <Phone className="h-5 w-5 text-emerald-accent" />
          </a>
          <button onClick={toggle} className="p-2 rounded-md glass" aria-label="Switch language">
            <Languages className="h-5 w-5 text-emerald-accent" />
          </button>
          <button className="p-2" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden glass-strong border-b border-border/60">
          <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
            {LINKS.map(l => (
              <button key={l.to} onClick={() => go(l.to)}
                className={cn('block w-full text-left px-3 py-2 text-sm rounded-md',
                  page === l.to ? 'text-emerald-accent bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5')}>
                {l.label}
              </button>
            ))}
            <button onClick={() => go('admin')} className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-md flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> {t.owner.navLabel}
            </button>
            <Button size="sm" onClick={() => go('command-center')} className="w-full mt-2 bg-primary text-primary-foreground">
              {t.nav.enterDemo} <ArrowRight className="ml-1.5 h-3.5 w-3.5 rtl-flip" />
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
