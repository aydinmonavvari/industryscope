'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Menu, X, Hexagon, ArrowRight, Languages } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

export default function Nav({ onEnterDemo }: { onEnterDemo: () => void }) {
  const { t, toggle, lang } = useI18n()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const LINKS = [
    { id: 'platform', label: t.nav.platform },
    { id: 'command-center', label: t.nav.commandCenter },
    { id: 'inventory', label: t.nav.inventory },
    { id: 'logistics', label: t.nav.logistics },
    { id: 'risk', label: t.nav.risk },
    { id: 'copilot', label: t.nav.copilot },
    { id: 'ecosystem', label: t.nav.ecosystem },
    { id: 'intelligence', label: t.nav.intelligence },
  ]

  return (
    <header className={cn('sticky top-0 z-50 transition-all', scrolled ? 'glass-strong border-b border-border/60' : 'border-b border-transparent')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button onClick={() => scrollTo('top')} className="flex items-center gap-2.5 group" aria-label="IndustryScope home">
          <span className="relative">
            <Hexagon className="h-7 w-7 text-emerald-accent group-hover:rotate-90 transition-transform duration-500" />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-background">IS</span>
          </span>
          <span className="font-semibold tracking-tight text-lg">
            Industry<span className="text-emerald-accent">Scope</span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-md transition-colors">
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          {/* Language switcher: فارسی | EN */}
          <button
            onClick={toggle}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md glass text-sm hover:bg-foreground/5 transition-colors"
            aria-label="Switch language"
          >
            <Languages className="h-4 w-4 text-emerald-accent" />
            <span className="font-semibold">{lang === 'fa' ? 'EN' : 'فارسی'}</span>
          </button>
          <Button variant="ghost" size="sm" onClick={() => scrollTo('enterprise')} className="text-muted-foreground">{t.nav.talkEnterprise}</Button>
          <Button size="sm" onClick={onEnterDemo} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {t.nav.enterDemo} <ArrowRight className="ml-1.5 h-3.5 w-3.5 rtl-flip" />
          </Button>
        </div>

        <div className="lg:hidden flex items-center gap-1">
          <button onClick={toggle} className="p-2 rounded-md glass" aria-label="Switch language">
            <Languages className="h-5 w-5 text-emerald-accent" />
          </button>
          <button className="p-2" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden glass-strong border-b border-border/60">
          <div className="px-4 py-3 space-y-1">
            {LINKS.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-md">
                {l.label}
              </button>
            ))}
            <Button size="sm" onClick={() => { setOpen(false); onEnterDemo() }} className="w-full mt-2 bg-primary text-primary-foreground">
              {t.nav.enterDemo} <ArrowRight className="ml-1.5 h-3.5 w-3.5 rtl-flip" />
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
