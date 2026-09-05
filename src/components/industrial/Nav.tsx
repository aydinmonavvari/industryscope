'use client'
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Menu, X, Hexagon, ArrowRight, Languages, Phone, ShieldCheck, ChevronDown } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { useRouter } from '@/lib/router'
import { CONTACT } from '@/lib/config'

export default function Nav() {
  const { t, toggle, lang } = useI18n()
  const { navigate, page } = useRouter()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenu(null)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const go = (to: string) => { setOpen(false); setOpenMenu(null); navigate(to) }

  // Dropdown groups
  const PLATFORM_ITEMS = [
    { to: 'command-center', label: t.nav.commandCenter },
    { to: 'inventory', label: t.nav.inventory },
    { to: 'logistics', label: t.nav.logistics },
    { to: 'risk', label: t.nav.risk },
    { to: 'copilot', label: t.nav.copilot },
  ]
  const RESOURCES_ITEMS = [
    { to: 'intelligence', label: t.nav.intelligence },
    { to: 'ecosystem', label: t.nav.ecosystem },
    { to: 'enterprise', label: t.nav.talkEnterprise },
  ]

  const isActive = (to: string) => page === to
  const isGroupActive = (items: { to: string }[]) => items.some(i => isActive(i.to))

  return (
    <header className={cn('sticky top-0 z-50 transition-all', scrolled ? 'glass-strong border-b border-border/60' : 'border-b border-transparent')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button onClick={() => go('')} className="flex items-center gap-2.5 group flex-shrink-0" aria-label="IndustryScope home">
          <span className="relative">
            <Hexagon className="h-7 w-7 text-emerald-accent group-hover:rotate-90 transition-transform duration-500" />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-background">IS</span>
          </span>
          <span className="font-semibold tracking-tight text-lg">Industry<span className="text-emerald-accent">Scope</span></span>
        </button>

        {/* Desktop dropdown nav */}
        <nav ref={menuRef} className="hidden lg:flex items-center gap-1">
          {/* Platform dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenMenu(openMenu === 'platform' ? null : 'platform')}
              onMouseEnter={() => setOpenMenu('platform')}
              className={cn('inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-md transition-colors',
                isGroupActive(PLATFORM_ITEMS) ? 'text-emerald-accent bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5')}
            >
              {t.nav.platform} <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', openMenu === 'platform' && 'rotate-180')} />
            </button>
            {openMenu === 'platform' && (
              <div onMouseLeave={() => setOpenMenu(null)} className="absolute top-full left-0 mt-1 w-56 glass-strong rounded-xl border border-border/40 shadow-xl p-1.5 z-50">
                {PLATFORM_ITEMS.map(it => (
                  <button key={it.to} onClick={() => go(it.to)} className={cn('w-full text-right px-3 py-2 text-sm rounded-lg transition-colors flex items-center justify-between group',
                    isActive(it.to) ? 'bg-primary/10 text-emerald-accent' : 'hover:bg-foreground/5 text-muted-foreground hover:text-foreground')}>
                    {it.label} <ArrowRight className={cn('h-3.5 w-3.5 opacity-0 group-hover:opacity-60 transition-opacity rtl-flip', lang === 'fa' && 'rotate-180')} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Resources dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenMenu(openMenu === 'resources' ? null : 'resources')}
              onMouseEnter={() => setOpenMenu('resources')}
              className={cn('inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-md transition-colors',
                isGroupActive(RESOURCES_ITEMS) ? 'text-emerald-accent bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5')}
            >
              {lang === 'fa' ? 'منابع' : 'Resources'} <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', openMenu === 'resources' && 'rotate-180')} />
            </button>
            {openMenu === 'resources' && (
              <div onMouseLeave={() => setOpenMenu(null)} className="absolute top-full left-0 mt-1 w-56 glass-strong rounded-xl border border-border/40 shadow-xl p-1.5 z-50">
                {RESOURCES_ITEMS.map(it => (
                  <button key={it.to} onClick={() => go(it.to)} className={cn('w-full text-right px-3 py-2 text-sm rounded-lg transition-colors flex items-center justify-between group',
                    isActive(it.to) ? 'bg-primary/10 text-emerald-accent' : 'hover:bg-foreground/5 text-muted-foreground hover:text-foreground')}>
                    {it.label} <ArrowRight className={cn('h-3.5 w-3.5 opacity-0 group-hover:opacity-60 transition-opacity rtl-flip', lang === 'fa' && 'rotate-180')} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Direct contact link */}
          <button onClick={() => go('contact')}
            className={cn('px-3 py-1.5 text-sm rounded-md transition-colors',
              isActive('contact') ? 'text-emerald-accent bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5')}>
            {t.nav.contact}
          </button>
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
          <button onClick={() => go('admin')} className={cn('p-2 rounded-md glass hover:bg-foreground/5 transition-colors', isActive('admin') && 'border-primary/40')} aria-label={t.owner.navLabel}>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </button>
          <Button size="sm" onClick={() => go('command-center')} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {t.nav.enterDemo} <ArrowRight className="ml-1.5 h-3.5 w-3.5 rtl-flip" />
          </Button>
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-1">
          <a href={`tel:${CONTACT.phoneRaw}`} className="p-2 rounded-md glass" aria-label="Call"><Phone className="h-5 w-5 text-emerald-accent" /></a>
          <button onClick={toggle} className="p-2 rounded-md glass" aria-label="Switch language"><Languages className="h-5 w-5 text-emerald-accent" /></button>
          <button className="p-2" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden glass-strong border-b border-border/60 max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold pt-2 pb-1">{t.nav.platform}</div>
            {PLATFORM_ITEMS.map(it => (
              <button key={it.to} onClick={() => go(it.to)} className={cn('block w-full text-right px-3 py-2 text-sm rounded-md', isActive(it.to) ? 'text-emerald-accent bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5')}>{it.label}</button>
            ))}
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold pt-3 pb-1">{lang === 'fa' ? 'منابع' : 'Resources'}</div>
            {RESOURCES_ITEMS.map(it => (
              <button key={it.to} onClick={() => go(it.to)} className={cn('block w-full text-right px-3 py-2 text-sm rounded-md', isActive(it.to) ? 'text-emerald-accent bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5')}>{it.label}</button>
            ))}
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold pt-3 pb-1">{lang === 'fa' ? 'شرکت' : 'Company'}</div>
            <button onClick={() => go('contact')} className={cn('block w-full text-right px-3 py-2 text-sm rounded-md', isActive('contact') ? 'text-emerald-accent bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5')}>{t.nav.contact}</button>
            <button onClick={() => go('admin')} className="block w-full text-right px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-md flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> {t.owner.navLabel}</button>
            <Button size="sm" onClick={() => go('command-center')} className="w-full mt-3 bg-primary text-primary-foreground">{t.nav.enterDemo} <ArrowRight className="ml-1.5 h-3.5 w-3.5 rtl-flip" /></Button>
          </div>
        </div>
      )}
    </header>
  )
}
