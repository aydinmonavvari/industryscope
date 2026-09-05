'use client'
import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useI18n } from '@/lib/i18n'

// Classic train station scene for the quote/demo request form.
// The form appears as a "ticket booth" at a transit city station.

function StationPlatform() {
  return (
    <group>
      {/* ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 24]} />
        <meshStandardMaterial color="#0a0f16" roughness={0.9} />
      </mesh>
      {/* platform */}
      <mesh position={[0, 0.05, 4]}><boxGeometry args={[60, 0.3, 4]} /><meshStandardMaterial color="#10161e" roughness={0.85} /></mesh>
      {/* rails */}
      <mesh position={[0, 0.1, -3]}><boxGeometry args={[60, 0.04, 0.08]} /><meshStandardMaterial color="#3a4150" metalness={0.7} /></mesh>
      <mesh position={[0, 0.1, -2.4]}><boxGeometry args={[60, 0.04, 0.08]} /><meshStandardMaterial color="#3a4150" metalness={0.7} /></mesh>
      {/* sleepers */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh key={i} position={[-30 + i * 2, 0.05, -2.7]}><boxGeometry args={[0.3, 0.08, 1.2]} /><meshStandardMaterial color="#1a2028" /></mesh>
      ))}
    </group>
  )
}

// Station building — classic transit city vibe (columns + roof + clock)
function StationBuilding() {
  return (
    <group position={[0, 0, -10]}>
      {/* main hall */}
      <mesh position={[0, 3, 0]} castShadow><boxGeometry args={[24, 6, 2]} /><meshStandardMaterial color="#0e131a" roughness={0.85} /></mesh>
      {/* roof */}
      <mesh position={[0, 6.5, 0]} castShadow><boxGeometry args={[25, 0.4, 3]} /><meshStandardMaterial color="#1a2028" /></mesh>
      {/* columns */}
      {[-10, -5, 0, 5, 10].map((x) => (
        <mesh key={x} position={[x, 3.5, 1.2]} castShadow><cylinderGeometry args={[0.25, 0.25, 7, 12]} /><meshStandardMaterial color="#1a2028" roughness={0.5} metalness={0.5} /></mesh>
      ))}
      {/* clock */}
      <mesh position={[0, 5.5, 1.05]}><cylinderGeometry args={[0.5, 0.5, 0.1, 24]} /><meshStandardMaterial color="#e6eef5" emissive="#e6eef5" emissiveIntensity={0.3} /></mesh>
      <mesh position={[0, 5.5, 1.12]}><cylinderGeometry args={[0.4, 0.4, 0.02, 24]} /><meshStandardMaterial color="#0c1218" /></mesh>
      {/* clock hands */}
      <mesh position={[0.1, 5.6, 1.14]}><boxGeometry args={[0.02, 0.3, 0.02]} /><meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.8} /></mesh>
      <mesh position={[0.05, 5.45, 1.14]}><boxGeometry args={[0.25, 0.02, 0.02]} /><meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.8} /></mesh>
      {/* station sign */}
      <Html position={[0, 4.5, 1.1]} center distanceFactor={14} style={{ pointerEvents: 'none' }}>
        <div className="font-mono text-[10px] text-emerald-400 tracking-[0.3em] uppercase whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">IndustryScope · Transit Hub</div>
      </Html>
    </group>
  )
}

// A waiting train at the platform
function WaitingTrain() {
  return (
    <group position={[-6, 0, -2.7]}>
      {/* wheels */}
      {[-2, -0.8, 0.8, 2].map((wx) => (
        <mesh key={wx} position={[wx, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.2, 0.2, 0.12, 16]} /><meshStandardMaterial color="#15181d" metalness={0.7} /></mesh>
      ))}
      {/* body */}
      <mesh position={[0, 1, 0]} castShadow><boxGeometry args={[5, 1.5, 1.8]} /><meshStandardMaterial color="#0c1a26" roughness={0.5} metalness={0.6} /></mesh>
      {/* windows */}
      {[-1.8, -0.9, 0, 0.9, 1.8].map((wx) => (
        <mesh key={wx} position={[wx, 1.2, 0.92]}><boxGeometry args={[0.6, 0.5, 0.05]} /><meshStandardMaterial color="#cfe8ff" emissive="#cfe8ff" emissiveIntensity={0.4} /></mesh>
      ))}
      {/* door */}
      <mesh position={[-2.3, 0.95, 0.92]}><boxGeometry args={[0.5, 1.2, 0.05]} /><meshStandardMaterial color="#1a2028" /></mesh>
    </group>
  )
}

// Lamp posts
function Lamp({ x }: { x: number }) {
  return (
    <group position={[x, 0, 4]}>
      <mesh position={[0, 2, 0]} castShadow><cylinderGeometry args={[0.08, 0.1, 4, 8]} /><meshStandardMaterial color="#1a2028" /></mesh>
      <mesh position={[0, 4, 0]}><sphereGeometry args={[0.18, 12, 12]} /><meshStandardMaterial color="#fff7cc" emissive="#fff7cc" emissiveIntensity={1.5} /></mesh>
      <pointLight position={[0, 4, 0]} intensity={0.4} color="#fff7cc" distance={6} />
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.55} color="#0a1422" />
      <hemisphereLight args={['#0a1422', '#05080d', 0.6]} />
      <directionalLight position={[8, 16, 6]} intensity={1.0} color="#cfe0ff" />
      <pointLight position={[0, 6, 2]} intensity={0.5} color="#fff7cc" distance={20} />

      <StationPlatform />
      <StationBuilding />
      <WaitingTrain />
      <Lamp x={-8} />
      <Lamp x={-2} />
      <Lamp x={4} />
      <Lamp x={10} />
    </>
  )
}

export default function StationForm({ children }: { children: React.ReactNode }) {
  return (
    <section id="station" className="relative w-full">
      {/* 3D station scene as backdrop */}
      <div className="relative h-[400px] sm:h-[460px] w-full overflow-hidden">
        <Canvas camera={{ position: [0, 5, 16], fov: 58, near: 0.1, far: 200 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
        {/* darkening overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
      </div>
      {/* The form (ticket booth) — overlaid below the scene */}
      <div className="relative -mt-32 px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <div className="text-[11px] uppercase tracking-[0.2em] text-emerald-400 font-semibold mb-2">ایستگاه تجاری</div>
            <h2 className="text-2xl sm:text-3xl font-semibold">رزرو جلسهٔ شریک طراحی</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">درخواست خود را ثبت کنید؛ تیم ما در یک روز کاری تماس می‌گیرد.</p>
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}
