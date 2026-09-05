'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Menu, X, Hexagon, ArrowRight } from 'lucide-react'

const LINKS = [
  { id: 'platform', label: 'Platform' },
  { id: 'command-center', label: 'Command Center' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'logistics', label: 'Logistics' },
  { id: 'risk', label: 'Risk' },
  { id: 'copilot', label: 'AI Copilot' },
  { id: 'ecosystem', label: 'Ecosystem' },
  { id: 'intelligence', label: 'Intelligence' },
]

export default function Nav({ onEnterDemo }: { onEnterDemo: () => void }) {
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
          <Button variant="ghost" size="sm" onClick={() => scrollTo('enterprise')} className="text-muted-foreground">Talk to Enterprise</Button>
          <Button size="sm" onClick={onEnterDemo} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Enter Live Demo <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </div>

        <button className="lg:hidden p-2" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
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
              Enter Live Demo <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
