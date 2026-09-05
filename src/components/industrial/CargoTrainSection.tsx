'use client'
import { useRef, useMemo, Suspense, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useI18n } from '@/lib/i18n'
import { useRouter } from '@/lib/router'
import { motion, AnimatePresence } from 'framer-motion'

type Wagon =
  | { kind: 'testimonial'; name: string; role: string; company: string; quote: string }
  | { kind: 'tier'; name: string; desc: string; features: string[]; cta: string; highlight: boolean; target: string }

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[400, 24]} />
      <meshStandardMaterial color="#0a0f16" roughness={0.9} />
    </mesh>
  )
}

function Rails() {
  return (
    <group>
      <mesh position={[0, 0.2, -1.4]}><boxGeometry args={[400, 0.1, 0.1]} /><meshStandardMaterial color="#3a4150" metalness={0.7} roughness={0.4} /></mesh>
      <mesh position={[0, 0.2, 1.4]}><boxGeometry args={[400, 0.1, 0.1]} /><meshStandardMaterial color="#3a4150" metalness={0.7} roughness={0.4} /></mesh>
      {Array.from({ length: 100 }).map((_, i) => (
        <mesh key={i} position={[-150 + i * 3, 0.05, 0]}><boxGeometry args={[0.4, 0.1, 4]} /><meshStandardMaterial color="#1a2028" roughness={0.85} /></mesh>
      ))}
    </group>
  )
}

function WagonCar({ x, color, label, onClick, active }: { x: number; color: string; label?: string; onClick?: () => void; active?: boolean }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((s) => {
    if (ref.current) ref.current.position.y = 0.05 + Math.sin(s.clock.elapsedTime * 4 + x) * 0.008
  })
  return (
    <group ref={ref} position={[x, 0, 0]}>
      {[-1.1, 1.1].map((wx) => (
        <mesh key={wx} position={[wx, 0.18, -1.1]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.18, 0.18, 0.12, 16]} /><meshStandardMaterial color="#15181d" metalness={0.7} roughness={0.4} /></mesh>
      ))}
      {[-1.1, 1.1].map((wx) => (
        <mesh key={`r${wx}`} position={[wx, 0.18, 1.1]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.18, 0.18, 0.12, 16]} /><meshStandardMaterial color="#15181d" metalness={0.7} roughness={0.4} /></mesh>
      ))}
      <mesh position={[0, 0.3, 0]}><boxGeometry args={[3.6, 0.1, 2.4]} /><meshStandardMaterial color="#1a2028" /></mesh>
      <mesh position={[0, 0.95, 0]} castShadow onClick={onClick}>
        <boxGeometry args={[3.2, 1.1, 2.1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 0.45 : 0.08} roughness={0.55} metalness={0.3} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-1 + i, 1.5, 0]}><boxGeometry args={[0.04, 1.1, 2.12]} /><meshStandardMaterial color="#000" transparent opacity={0.2} /></mesh>
      ))}
      {label && (
        <Html position={[0, 1.0, 1.07]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
          <div className="font-mono text-[9px] text-white/80 tracking-widest whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">{label}</div>
        </Html>
      )}
    </group>
  )
}

function Locomotive({ x }: { x: number }) {
  return (
    <group position={[x, 0, 0]}>
      {[-1.3, -0.5, 0.5, 1.3].map((wx) => (
        <mesh key={wx} position={[wx, 0.18, -1.1]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.2, 0.2, 0.12, 16]} /><meshStandardMaterial color="#15181d" metalness={0.7} /></mesh>
      ))}
      {[-1.3, -0.5, 0.5, 1.3].map((wx) => (
        <mesh key={`r${wx}`} position={[wx, 0.18, 1.1]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.2, 0.2, 0.12, 16]} /><meshStandardMaterial color="#15181d" metalness={0.7} /></mesh>
      ))}
      <mesh position={[0, 0.3, 0]}><boxGeometry args={[4.2, 0.12, 2.4]} /><meshStandardMaterial color="#1a2028" /></mesh>
      <mesh position={[0, 0.95, 0]} castShadow><boxGeometry args={[3.8, 1.2, 2.1]} /><meshStandardMaterial color="#0c1a26" roughness={0.5} metalness={0.6} /></mesh>
      <mesh position={[-1.2, 1.6, 0]} castShadow><boxGeometry args={[1.4, 1.2, 2.0]} /><meshStandardMaterial color="#e6eef5" roughness={0.3} /></mesh>
      <mesh position={[2, 0.6, 0.7]}><sphereGeometry args={[0.12, 12, 12]} /><meshStandardMaterial color="#fff7cc" emissive="#fff7cc" emissiveIntensity={1.2} /></mesh>
      <mesh position={[2, 0.6, -0.7]}><sphereGeometry args={[0.12, 12, 12]} /><meshStandardMaterial color="#fff7cc" emissive="#fff7cc" emissiveIntensity={1.2} /></mesh>
      <mesh position={[1.3, 1.9, 0]}><cylinderGeometry args={[0.18, 0.22, 0.5, 12]} /><meshStandardMaterial color="#0c1218" /></mesh>
      <Html position={[0, 0.95, 1.07]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
        <div className="font-mono text-[10px] text-emerald-400 font-bold tracking-widest whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">INDUSTRYSCOPE</div>
      </Html>
    </group>
  )
}

function Scene({ wagons, offset, activeWagon, setActiveWagon, navigate }: any) {
  const grpRef = useRef<THREE.Group>(null)
  useFrame(() => {
    if (grpRef.current) grpRef.current.position.x = -offset
  })
  const colors = ['#1a3d5c', '#2a5e3e', '#8a5e2a', '#5e2a2a', '#2a3d5e', '#3d2a5e']
  return (
    <>
      <ambientLight intensity={0.6} color="#0a1422" />
      <hemisphereLight args={['#0a1422', '#05080d', 0.65]} />
      <directionalLight position={[10, 18, 8]} intensity={1.1} color="#cfe0ff" />
      <pointLight position={[0, 6, 0]} intensity={0.5} color="#e6a23c" distance={20} />

      <Ground />
      <Rails />
      <group ref={grpRef}>
        <Locomotive x={0} />
        {wagons.map((w: Wagon, i: number) => {
          const x = 4.8 + i * 4.2
          const color = w.kind === 'tier' && (w as any).highlight ? '#0e7c5a' : colors[i % colors.length]
          const label = w.kind === 'tier' ? (w as any).name : (w as any).company
          return (
            <WagonCar
              key={i}
              x={x}
              color={color}
              label={label}
              active={activeWagon === i}
              onClick={() => { setActiveWagon(activeWagon === i ? null : i); if (w.kind === 'tier') setTimeout(() => navigate((w as any).target), 2400) }}
            />
          )
        })}
      </group>
    </>
  )
}

export default function CargoTrainSection() {
  const { t } = useI18n()
  const { navigate } = useRouter()
  const [activeWagon, setActiveWagon] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const total = el.offsetHeight + vh
      const p = (vh - rect.top) / total
      setProgress(Math.max(0, Math.min(1, p)))
    }
    const onScroll = () => update()
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [])

  const wagons: Wagon[] = useMemo(() => {
    const arr: Wagon[] = []
    const testis = [
      { name: 'Mohammad Reza Karimi', role: 'Operations Director', company: 'Pars Industrial', quote: 'IndustryScope در دو هفته به Briefing روزانهٔ عملیات ما تبدیل شد.' },
      { name: 'Sara Mohseni', role: 'Supply Chain Manager', company: 'Gulf Distribution', quote: 'ماتریس ریسک بالاخره به هیئت‌مدیره با عدد نشان داد.' },
      { name: 'Arman Tehrani', role: 'Warehouse Manager', company: 'Qom Logistics', quote: 'تشخیص راکد، هزینهٔ پایلوت را در فصل اول جبران کرد.' },
    ]
    testis.forEach((tt) => arr.push({ kind: 'testimonial', ...tt }))
    t.enterprise.tiers.forEach((tier: any) => arr.push({ kind: 'tier', name: tier.name, desc: tier.desc, features: tier.features, cta: tier.cta, highlight: tier.name === 'رشد' || tier.name === 'Growth', target: 'enterprise' }))
    return arr
  }, [t])

  // Train moves right as you scroll through the section (repeating loop)
  const offset = progress * (wagons.length * 4.2 * 1.5)

  return (
    <section id="train" ref={sectionRef} className="relative h-[460px] sm:h-[520px] w-full overflow-hidden">
      <Canvas camera={{ position: [0, 4.5, 12], fov: 58, near: 0.1, far: 300 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <Scene wagons={wagons} offset={offset} activeWagon={activeWagon} setActiveWagon={setActiveWagon} navigate={navigate} />
        </Suspense>
      </Canvas>

      {/* Section heading overlay */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center px-4 pointer-events-none">
        <div className="text-[11px] uppercase tracking-[0.2em] text-emerald-400 font-semibold mb-1">{t.testimonials.eyebrow}</div>
        <h3 className="text-xl sm:text-2xl font-semibold">{t.testimonials.title}</h3>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-2 bg-background/50 rounded-full px-3 py-1.5 backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> اسکرول کنید ← قطار حرکت می‌کند
      </div>

      {/* Active wagon card */}
      <AnimatePresence>
        {activeWagon !== null && wagons[activeWagon] && (
          <motion.div
            key={activeWagon}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="absolute bottom-16 left-4 right-4 sm:right-auto sm:max-w-md glass-strong rounded-xl border border-emerald-500/40 p-4 shadow-lg shadow-emerald-500/20"
          >
            {(() => {
              const w = wagons[activeWagon]
              if (w.kind === 'testimonial') {
                const wt = w as any
                return (
                  <>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold mb-1">مشتری</div>
                    <p className="text-sm text-foreground leading-snug mb-2">"{wt.quote}"</p>
                    <div className="text-xs text-muted-foreground">{wt.name} · {wt.role} · {wt.company}</div>
                  </>
                )
              }
              const wt = w as any
              return (
                <>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold mb-1">{wt.name}</div>
                  <div className="text-sm text-foreground leading-snug mb-2">{wt.desc}</div>
                  <ul className="text-[11px] text-muted-foreground space-y-1 mb-3">
                    {wt.features.slice(0, 3).map((f: string) => <li key={f}>• {f}</li>)}
                  </ul>
                  <button onClick={() => navigate(wt.target)} className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400 transition-colors">{wt.cta} ←</button>
                </>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
