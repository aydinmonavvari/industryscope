'use client'
import { useSyncExternalStore, lazy, Suspense } from 'react'
import { ArrowRight, Activity, Boxes, Truck, Brain, Cpu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import IndustrialWorld2D from './IndustrialWorld2D'

const IndustrialWorld3D = lazy(() => import('./IndustrialWorld3D'))

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

export default function Hero({ onEnterDemo }: { onEnterDemo: () => void }) {
  const canWebGL = useCanWebGL()
  return (
    <section className="relative overflow-hidden min-h-[92vh] flex flex-col">
      {/* Background grid + radial glow */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

      <div className="relative max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col">
        {/* Eyebrow */}
        <div className="mt-20 sm:mt-24 flex flex-col items-start gap-3">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-primary breathe" />
            <span className="font-mono text-muted-foreground">SCOPE / INDUSTRYSCOPE v1.0</span>
          </div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-accent font-semibold">AI Operating System for Industry & Supply Chain</p>
        </div>

        {/* Title */}
        <h1 className="mt-4 text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tight leading-[0.95]">
          <span className="block text-foreground">INDUSTRY</span>
          <span className="block bg-gradient-to-r from-emerald-accent via-primary to-emerald-accent/70 bg-clip-text text-transparent">SCOPE</span>
        </h1>

        <p className="mt-5 text-lg sm:text-2xl text-muted-foreground max-w-2xl leading-snug">
          See Your Entire Operation.{' '}
          <span className="text-foreground">Understand Every Signal.</span>{' '}
          <span className="text-foreground">Act Before the Problem.</span>
        </p>

        {/* CTAs */}
        <div className="mt-7 flex flex-wrap gap-3">
          <Button size="lg" onClick={onEnterDemo} className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 rounded-xl text-base">
            Enter Live Command Center <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" onClick={onEnterDemo} className="h-12 px-6 rounded-xl text-base glass">
            See Intelligence in Action
          </Button>
        </div>

        {/* 3D / 2D World */}
        <div className="relative mt-10 sm:mt-14 flex-1 min-h-[280px] sm:min-h-[360px]">
          <div className="absolute inset-0 rounded-2xl overflow-hidden glass">
            {canWebGL ? (
              <Suspense fallback={<div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">Initializing industrial world…</div>}>
                <IndustrialWorld3D className="h-full w-full" />
              </Suspense>
            ) : (
              <div className="h-full w-full flex items-center justify-center p-6">
                <IndustrialWorld2D className="w-full max-w-3xl" />
              </div>
            )}
            {/* Overlay labels */}
            <div className="absolute top-3 left-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary breathe" /> LIVE INDUSTRIAL WORLD
            </div>
            <div className="absolute bottom-3 right-3 font-mono text-[10px] text-muted-foreground">
              {canWebGL ? 'WebGL · spatial' : '2D · fallback'}
            </div>
          </div>
        </div>

        {/* Flow chips */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: <Boxes className="h-4 w-4" />, label: 'See', desc: 'Every signal connected' },
            { icon: <Cpu className="h-4 w-4" />, label: 'Understand', desc: 'Why it is happening' },
            { icon: <Activity className="h-4 w-4" />, label: 'Predict', desc: 'What happens next' },
            { icon: <Brain className="h-4 w-4" />, label: 'Act', desc: 'Before the problem' },
          ].map((c) => (
            <div key={c.label} className="glass rounded-xl p-3">
              <div className="flex items-center gap-2 text-emerald-accent">{c.icon}<span className="text-sm font-semibold text-foreground">{c.label}</span></div>
              <p className="mt-1 text-xs text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
