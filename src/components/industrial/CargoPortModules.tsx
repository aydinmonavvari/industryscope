'use client'
import { useRef, useMemo, Suspense, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { useI18n } from '@/lib/i18n'
import { useRouter } from '@/lib/router'
import { motion, AnimatePresence } from 'framer-motion'

type Hotspot = {
  id: string
  label: string
  desc: string
  target: string
  pos: [number, number, number]
  color: string
  shape: 'box' | 'truck' | 'shield' | 'brain' | 'globe' | 'chart'
}

// ---- Cargo port scene ----
function Sea() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, -20]} receiveShadow>
      <planeGeometry args={[160, 60]} />
      <meshStandardMaterial color="#062028" roughness={0.3} metalness={0.2} />
    </mesh>
  )
}

function Dock() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[80, 24]} />
      <meshStandardMaterial color="#0e131a" roughness={0.85} />
    </mesh>
  )
}

function CargoShip({ time }: { time: number }) {
  const grp = useRef<THREE.Group>(null)
  useFrame((s) => {
    if (grp.current) {
      grp.current.position.y = Math.sin(s.clock.elapsedTime * 0.5 + time) * 0.15
      grp.current.rotation.z = Math.sin(s.clock.elapsedTime * 0.3 + time) * 0.02
    }
  })
  const stacks = useMemo(() => {
    const arr: { x: number; z: number; h: number; c: string }[] = []
    const containerColors = ['#1a3d5c', '#2a5e3e', '#8a5e2a', '#5e2a2a', '#2a3d5e']
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 6; col++) {
        const h = 1 + Math.floor(Math.random() * 3)
        for (let y = 0; y < h; y++) {
          arr.push({ x: -8 + col * 2.2, z: -2 + row * 2, h: y, c: containerColors[(row + col + y) % 5] })
        }
      }
    }
    return arr
  }, [])
  return (
    <group ref={grp} position={[-28, 0, -14]}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[20, 1.6, 10]} />
        <meshStandardMaterial color="#0c1a26" roughness={0.5} metalness={0.6} />
      </mesh>
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[19.5, 0.2, 9.5]} />
        <meshStandardMaterial color="#14222e" roughness={0.6} />
      </mesh>
      <mesh position={[8, 3, 0]} castShadow>
        <boxGeometry args={[2.5, 3.5, 4]} />
        <meshStandardMaterial color="#e6eef5" roughness={0.3} metalness={0.4} />
      </mesh>
      {stacks.map((c, i) => (
        <mesh key={i} position={[c.x, 1.7 + c.h * 1.0, c.z]} castShadow>
          <boxGeometry args={[2, 1, 1.8]} />
          <meshStandardMaterial color={c.c} roughness={0.75} metalness={0.15} />
        </mesh>
      ))}
    </group>
  )
}

function Crane({ x, z }: { x: number; z: number }) {
  const grp = useRef<THREE.Group>(null)
  const trolley = useRef<THREE.Group>(null)
  const load = useRef<THREE.Group>(null)
  useFrame((s) => {
    const t = s.clock.elapsedTime
    if (grp.current) grp.current.position.x = x + Math.sin(t * 0.3) * 6
    if (trolley.current) trolley.current.position.z = Math.sin(t * 0.5) * 2
    if (load.current) load.current.position.y = 1.2 - Math.max(0, Math.sin(t * 0.7)) * 1.5
  })
  return (
    <group ref={grp} position={[x, 0, z]}>
      <mesh position={[-5, 0.05, 0]}><boxGeometry args={[0.3, 0.1, 8]} /><meshStandardMaterial color="#1a2028" /></mesh>
      <mesh position={[5, 0.05, 0]}><boxGeometry args={[0.3, 0.1, 8]} /><meshStandardMaterial color="#1a2028" /></mesh>
      <mesh position={[-5, 4, 0]} castShadow><boxGeometry args={[0.4, 8, 0.4]} /><meshStandardMaterial color="#e6a23c" roughness={0.4} metalness={0.7} /></mesh>
      <mesh position={[5, 4, 0]} castShadow><boxGeometry args={[0.4, 8, 0.4]} /><meshStandardMaterial color="#e6a23c" roughness={0.4} metalness={0.7} /></mesh>
      <mesh position={[0, 8, 0]} castShadow><boxGeometry args={[10.5, 0.6, 0.6]} /><meshStandardMaterial color="#f0b850" roughness={0.35} metalness={0.7} /></mesh>
      <group ref={trolley} position={[0, 8, 0]}>
        <mesh><boxGeometry args={[0.6, 0.5, 0.6]} /><meshStandardMaterial color="#3a4150" /></mesh>
        <group ref={load} position={[0, -1.2, 0]}>
          <mesh castShadow><boxGeometry args={[2, 1, 1.8]} /><meshStandardMaterial color="#2a5e3e" roughness={0.7} /></mesh>
        </group>
      </group>
    </group>
  )
}

function ContainerStack({ x, z, color, count = 3 }: { x: number; z: number; color: string; count?: number }) {
  return (
    <group position={[x, 0, z]}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} position={[0, 0.5 + i * 1.0, 0]} castShadow>
          <boxGeometry args={[2, 1, 1.8]} />
          <meshStandardMaterial color={color} roughness={0.75} metalness={0.15} />
        </mesh>
      ))}
    </group>
  )
}

// ---- Domain-specific shape renderers ----
function ShapeIcon({ shape, color }: { shape: Hotspot['shape']; color: string }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((s) => {
    if (ref.current) {
      const t = s.clock.elapsedTime
      // blink: emissive pulsing
      ref.current.traverse((o) => {
        const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined
        if (m) m.emissiveIntensity = 0.4 + Math.sin(t * 3 + (ref.current?.position.x || 0)) * 0.4
      })
      // float
      ref.current.position.y = 0.3 + Math.sin(t * 2) * 0.08
    }
  })
  if (shape === 'box') {
    return (
      <group ref={ref}>
        <mesh castShadow><boxGeometry args={[0.6, 0.6, 0.6]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.4} /></mesh>
        <mesh position={[0, 0.32, 0]}><boxGeometry args={[0.62, 0.04, 0.62]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} /></mesh>
      </group>
    )
  }
  if (shape === 'truck') {
    return (
      <group ref={ref}>
        {/* container */}
        <mesh position={[0, 0.25, 0]} castShadow><boxGeometry args={[0.7, 0.35, 0.3]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.4} /></mesh>
        {/* cab */}
        <mesh position={[0.42, 0.2, 0]} castShadow><boxGeometry args={[0.18, 0.25, 0.3]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} /></mesh>
        {/* wheels */}
        <mesh position={[-0.25, 0.05, 0.16]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.08, 0.08, 0.04, 12]} /><meshStandardMaterial color="#222" /></mesh>
        <mesh position={[0.3, 0.05, 0.16]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.08, 0.08, 0.04, 12]} /><meshStandardMaterial color="#222" /></mesh>
      </group>
    )
  }
  if (shape === 'shield') {
    return (
      <group ref={ref}>
        <mesh castShadow><cylinderGeometry args={[0.4, 0.45, 0.12, 6]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.4} metalness={0.6} /></mesh>
        <mesh position={[0, 0.08, 0]}><cylinderGeometry args={[0.42, 0.47, 0.04, 6]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} /></mesh>
      </group>
    )
  }
  if (shape === 'brain') {
    return (
      <group ref={ref}>
        <mesh castShadow><sphereGeometry args={[0.3, 20, 20]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.3} /></mesh>
        {/* nodes */}
        {[0, 1, 2, 3, 4].map((i) => {
          const a = (i / 5) * Math.PI * 2
          return <mesh key={i} position={[Math.cos(a) * 0.35, Math.sin(a) * 0.2, 0]}><sphereGeometry args={[0.05, 8, 8]} /><meshStandardMaterial color="#fff" emissive={color} emissiveIntensity={1} /></mesh>
        })}
      </group>
    )
  }
  if (shape === 'globe') {
    return (
      <group ref={ref}>
        <mesh castShadow><sphereGeometry args={[0.32, 24, 24]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.5} wireframe /></mesh>
        <mesh><sphereGeometry args={[0.3, 16, 16]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.5} /></mesh>
      </group>
    )
  }
  if (shape === 'chart') {
    return (
      <group ref={ref}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[-0.22 + i * 0.16, i * 0.08, 0]} castShadow>
            <boxGeometry args={[0.1, 0.15 + i * 0.12, 0.1]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
          </mesh>
        ))}
      </group>
    )
  }
  return null
}

function Hotspot({ hot, active, onClick }: { hot: Hotspot; active: boolean; onClick: () => void }) {
  const ringRef = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    const t = s.clock.elapsedTime
    if (ringRef.current) {
      const sc = 1 + Math.sin(t * 2) * 0.15
      ringRef.current.scale.set(sc, sc, sc)
    }
  })
  return (
    <group position={hot.pos}>
      <group rotation={[0, 0, 0]}>
        <ShapeIcon shape={hot.shape} color={hot.color} />
      </group>
      {/* pulsing ring under */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.25, 0]}>
        <ringGeometry args={[0.5, 0.62, 32]} />
        <meshBasicMaterial color={hot.color} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      {/* click zone */}
      <mesh onClick={onClick}>
        <sphereGeometry args={[0.8, 8, 8]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      {/* label when active */}
      {active && (
        <Html position={[0, 1.1, 0]} center distanceFactor={12} style={{ pointerEvents: 'auto' }}>
          <div className="glass-strong rounded-xl border border-emerald-500/50 px-3 py-2 text-center min-w-[170px] shadow-lg shadow-emerald-500/20">
            <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">{hot.label}</div>
            <div className="text-[11px] text-slate-200 mt-1 leading-tight">{hot.desc}</div>
            <div className="text-[9px] text-emerald-400 mt-1.5 flex items-center justify-center gap-1">↵ ورود</div>
          </div>
        </Html>
      )}
    </group>
  )
}

function Scene({ hotspots, active, setActive, navigate }: any) {
  return (
    <>
      <ambientLight intensity={0.6} color="#0a1422" />
      <hemisphereLight args={['#0a1422', '#05080d', 0.65]} />
      <directionalLight position={[10, 18, 8]} intensity={1.1} color="#cfe0ff" />
      <pointLight position={[-28, 6, -14]} intensity={0.5} color="#3a8aa0" distance={30} />
      <pointLight position={[0, 8, 0]} intensity={0.4} color="#e6a23c" distance={25} />

      <Sea />
      <Dock />
      <CargoShip time={0} />
      <Crane x={-2} z={0} />
      <Crane x={6} z={0} />
      <ContainerStack x={-6} z={6} color="#1a3d5c" count={3} />
      <ContainerStack x={-3} z={6.5} color="#8a5e2a" count={2} />
      <ContainerStack x={0} z={6} color="#5e2a2a" count={3} />
      <ContainerStack x={3} z={6.5} color="#2a3d5e" count={2} />
      <ContainerStack x={9} z={6} color="#2a5e3e" count={3} />

      {hotspots.map((h: Hotspot) => (
        <Hotspot key={h.id} hot={h} active={active === h.id} onClick={() => { setActive(active === h.id ? null : h.id); setTimeout(() => { if (active !== h.id) navigate(h.target) }, 2400) }} />
      ))}
      <Environment preset="night" />
    </>
  )
}

export default function CargoPortModules() {
  const { t } = useI18n()
  const { navigate } = useRouter()
  const [active, setActive] = useState<string | null>(null)

  const hotspots: Hotspot[] = [
    { id: 'inv', label: t.inventory.eyebrow, desc: t.inventory.title + t.inventory.titleAccent, target: 'inventory', pos: [-6, 4.5, 6], color: '#10b981', shape: 'box' },
    { id: 'log', label: t.logistics.eyebrow, desc: t.logistics.title + t.logistics.titleAccent, target: 'logistics', pos: [-22, 3, -14], color: '#22d3ee', shape: 'truck' },
    { id: 'risk', label: t.risk.eyebrow, desc: t.risk.title + t.risk.titleAccent, target: 'risk', pos: [0, 9, 0], color: '#f59e0b', shape: 'shield' },
    { id: 'ai', label: t.copilot.eyebrow, desc: t.copilot.title + t.copilot.titleAccent, target: 'copilot', pos: [6, 8, 0], color: '#a78bfa', shape: 'brain' },
    { id: 'eco', label: t.ecosystem.eyebrow, desc: t.ecosystem.title + t.ecosystem.titleAccent, target: 'ecosystem', pos: [12, 3, 6], color: '#34d399', shape: 'globe' },
    { id: 'art', label: t.intelligence.eyebrow, desc: t.intelligence.title, target: 'intelligence', pos: [-3, 4, 6.5], color: '#e879f9', shape: 'chart' },
  ]

  return (
    <section id="modules" className="relative py-16 px-4">
      <div className="text-center mb-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="h-px w-6 bg-emerald-500/60" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-emerald-400 font-semibold">{t.liveWorld.eyebrow}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
          {t.liveWorld.title} <span className="text-emerald-400">{t.liveWorld.titleAccent}</span>
        </h2>
      </div>
      <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto mb-8">{t.liveWorld.desc}</p>

      {/* Full-width 3D cargo port */}
      <div className="relative h-[500px] sm:h-[620px] w-full overflow-hidden glass-strong">
        <Canvas camera={{ position: [0, 7, 22], fov: 58, near: 0.1, far: 200 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <Scene hotspots={hotspots} active={active} setActive={setActive} navigate={navigate} />
          </Suspense>
        </Canvas>

        {/* Overlay hint */}
        <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-background/60 rounded-full px-3 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> روی ابزارهای چشمک‌زن کلیک کنید
        </div>

        {/* Active hotspot card */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm glass-strong rounded-xl border border-emerald-500/40 p-4 shadow-lg shadow-emerald-500/20"
            >
              {(() => {
                const h = hotspots.find(x => x.id === active)!
                return (
                  <>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold mb-1">{h.label}</div>
                    <div className="text-sm text-foreground leading-snug mb-3">{h.desc}</div>
                    <button onClick={() => navigate(h.target)} className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400 transition-colors">
                      ورود ←
                    </button>
                  </>
                )
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
