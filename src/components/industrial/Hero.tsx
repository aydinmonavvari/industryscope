'use client'
import { useEffect, useRef, useState, useSyncExternalStore, lazy, Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowDown, Boxes, Cpu, Activity, Brain } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import CinematicHero2D from './CinematicHero2D'
import Cinematic3DErrorBoundary from './Cinematic3DErrorBoundary'

const CinematicHero3D = lazy(() => import('./CinematicHero3D'))

// ---- WebGL + reduced-motion detection (SSR-safe) ---------------------------
function detectWebGL(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    const c = document.createElement('canvas')
    const gl = c.getContext('webgl') || c.getContext('experimental-webgl')
    return !!gl
  } catch { return false }
}
const emptySubscribe = () => () => {}
function useCanWebGL(): boolean {
  return useSyncExternalStore(emptySubscribe, detectWebGL, () => false)
}

// ---- Scroll progress hook (module-level ref, no re-render) -----------------
function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useRef(0)
  useEffect(() => {
    let raf = 0
    const update = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const p = total > 0 ? -rect.top / total : 0
      progress.current = Math.max(0, Math.min(1, p))
    }
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [])
  return { ref, progress }
}

// ---- Copy overlay (progressive reveal, DOM-direct, no React re-renders) ----
function CopyOverlay({ progress, onEnterDemo }: { progress: React.MutableRefObject<number>; onEnterDemo: () => void }) {
  const { t } = useI18n()
  const h = t.hero
  // elements
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const wordRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const suppRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const fadeRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const tick = () => {
      const p = progress.current
      // Eyebrow + wordmark appear at the very start (p<0.05) and persist until truck exits
      set(eyebrowRef, p > 0.0 && p < 0.42 ? 1 : p >= 0.42 ? 0 : 1)
      set(wordRef, p > 0.0 && p < 0.46 ? 1 : 0)
      // After warehouse reveal (p>0.62): brand headlines appear progressively
      set(headRef, smoothstep(0.64, 0.74, p))
      set(subRef, smoothstep(0.70, 0.80, p))
      set(suppRef, smoothstep(0.76, 0.86, p))
      set(ctaRef, smoothstep(0.80, 0.90, p))
      // scroll hint fades out quickly
      set(hintRef, smoothstepInv(0.0, 0.04, p))
      // seamless handoff fade near end → page background color
      if (fadeRef.current) fadeRef.current.style.opacity = String(smoothstep(0.95, 1.0, p))
      // scene-state label bottom-left
      const state = p < 0.18 ? h.scene.road : p < 0.46 ? h.scene.truck : p < 0.62 ? h.scene.truck : p < 0.86 ? h.scene.warehouse : h.scene.warehouse
      if (stateRef.current) {
        stateRef.current.style.opacity = String(p < 0.95 ? 1 : 0)
        stateRef.current.textContent = state
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [progress, h.scene.road, h.scene.truck, h.scene.warehouse])

  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {/* top eyebrow (during road + truck) */}
      <div ref={eyebrowRef} className="absolute top-20 sm:top-24 inset-x-0 px-6 flex justify-center" style={{ opacity: 0, transition: 'opacity .6s ease' }}>
        <div className="glass rounded-full px-3 py-1 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary breathe" />
          <span className="font-mono text-[10px] sm:text-xs text-muted-foreground">{h.tagline}</span>
        </div>
      </div>

      {/* wordmark — large, appears over the road/truck phase */}
      <div ref={wordRef} className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center px-6 text-center" style={{ opacity: 0, transition: 'opacity .8s ease, transform .8s ease' }}>
        <div className="text-[18vw] sm:text-[14vw] md:text-[12vw] lg:text-[10rem] font-semibold tracking-tight leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
          <span className="text-foreground">INDUSTRY</span>
          <span className="bg-gradient-to-r from-emerald-accent via-primary to-emerald-accent/70 bg-clip-text text-transparent">SCOPE</span>
        </div>
      </div>

      {/* brand copy (inside warehouse phase) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ direction: t.dir }}>
        <h2 ref={headRef} className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight max-w-3xl leading-tight" style={{ opacity: 0, transition: 'opacity .9s ease, transform .9s ease', transform: 'translateY(12px)' }}>
          {h.headline}
        </h2>
        <p ref={subRef} className="mt-4 text-base sm:text-xl md:text-2xl text-muted-foreground max-w-2xl" style={{ opacity: 0, transition: 'opacity .9s ease .1s, transform .9s ease .1s', transform: 'translateY(12px)' }}>
          {h.subhead}
        </p>
        <p ref={suppRef} className="mt-5 text-xs sm:text-sm text-muted-foreground/80 max-w-xl leading-relaxed" style={{ opacity: 0, transition: 'opacity .9s ease .2s, transform .9s ease .2s', transform: 'translateY(12px)' }}>
          {h.supporting}
        </p>
        <div ref={ctaRef} className="mt-7 flex flex-wrap items-center justify-center gap-3 pointer-events-auto" style={{ opacity: 0, transition: 'opacity .9s ease .3s, transform .9s ease .3s', transform: 'translateY(12px)' }}>
          <Button size="lg" onClick={onEnterDemo} className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 rounded-xl text-base">
            {h.ctaEnter} <ArrowRight className="ml-2 h-4 w-4 rtl-flip" />
          </Button>
          <Button size="lg" variant="outline" onClick={onEnterDemo} className="glass h-12 px-6 rounded-xl text-base">
            {h.ctaSee}
          </Button>
        </div>
      </div>

      {/* scene state label */}
      <div className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-2" style={{ opacity: 0 }}>
        <span className="h-1.5 w-1.5 rounded-full bg-primary breathe" />
        <span ref={stateRef} />
      </div>

      {/* scroll hint */}
      <div ref={hintRef} className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-2 text-muted-foreground" style={{ opacity: 1, transition: 'opacity .5s ease' }}>
        <span className="font-mono text-[10px] uppercase tracking-widest">{h.scroll}</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </div>

      {/* progress bar (top, subtle) */}
      <ProgressBar progress={progress} />

      {/* seamless handoff fade → page background */}
      <div ref={fadeRef} className="absolute inset-0 bg-background" style={{ opacity: 0, pointerEvents: 'none' }} />
    </div>
  )
}

function ProgressBar({ progress }: { progress: React.MutableRefObject<number> }) {
  const barRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let raf = 0
    const tick = () => {
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress.current})`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [progress])
  return (
    <div className="absolute top-0 inset-x-0 h-0.5 bg-foreground/5 origin-left">
      <div ref={barRef} className="h-full bg-primary/60 origin-left scale-x-0" style={{ transformOrigin: 'left' }} />
    </div>
  )
}

// ---- helpers ----------------------------------------------------------------
function set(ref: React.RefObject<HTMLElement | null>, opacity: number) {
  if (ref.current) {
    ref.current.style.opacity = String(opacity)
    ref.current.style.transform = `translateY(${(1 - opacity) * 12}px)`
  }
}
function smoothstep(a: number, b: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}
function smoothstepInv(a: number, b: number, x: number) {
  return 1 - smoothstep(a, b, x)
}

// ---- Flow chips (static, below cinematic) ----------------------------------
function FlowChips() {
  const { t } = useI18n()
  const c = t.hero.chips
  const items = [
    { icon: <Boxes className="h-4 w-4" />, label: c.see, desc: c.seeD },
    { icon: <Cpu className="h-4 w-4" />, label: c.understand, desc: c.understandD },
    { icon: <Activity className="h-4 w-4" />, label: c.predict, desc: c.predictD },
    { icon: <Brain className="h-4 w-4" />, label: c.act, desc: c.actD },
  ]
  return (
    <div className="absolute bottom-6 inset-x-0 px-6 hidden sm:grid grid-cols-4 gap-3 max-w-3xl mx-auto">
      {items.map((it) => (
        <div key={it.label} className="glass rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-2 text-emerald-accent">{it.icon}<span className="text-sm font-semibold text-foreground">{it.label}</span></div>
          <p className="mt-1 text-[11px] text-muted-foreground">{it.desc}</p>
        </div>
      ))}
    </div>
  )
}

// ---- Hero wrapper -----------------------------------------------------------
function useHeroVisibility(ref: React.RefObject<HTMLDivElement | null>): { inView: boolean; downgraded: boolean } {
  const [inView, setInView] = useState(true)
  const [downgraded, setDowngraded] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      const v = entries[0]?.isIntersecting ?? true
      setInView(v)
      if (!v) setDowngraded(true)
    }, { rootMargin: '200px' })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return { inView, downgraded }
}

export default function Hero({ onEnterDemo }: { onEnterDemo: () => void }) {
  const canWebGL = useCanWebGL()
  const { ref, progress } = useScrollProgress()
  const { downgraded } = useHeroVisibility(ref)
  // One-way downgrade: render the full 3D scene only while in view the FIRST time.
  // Once the hero scrolls out of view, switch to the lightweight 2D placeholder
  // and never remount 3D again (avoids WebGL context churn / context-lost crashes).
  const show3D = canWebGL && !downgraded
  return (
    <>
      <div ref={ref} className="relative" style={{ height: '760vh' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {show3D ? (
            <Cinematic3DErrorBoundary fallback={<div className="h-full w-full"><CinematicHero2D className="h-full w-full" /></div>}>
              <Suspense fallback={<div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">Initializing industrial world…</div>}>
                <CinematicHero3D progress={progress} />
              </Suspense>
            </Cinematic3DErrorBoundary>
          ) : (
            <div className="h-full w-full"><CinematicHero2D className="h-full w-full" /></div>
          )}
          <CopyOverlay progress={progress} onEnterDemo={onEnterDemo} />
        </div>
      </div>
      {/* Static flow chips below the cinematic, always visible after the experience */}
      <FlowChips />
    </>
  )
}
