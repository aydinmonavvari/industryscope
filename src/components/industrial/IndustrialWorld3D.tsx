'use client'
import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

// Industrial world nodes: Factory → Warehouse → Truck → Distribution → Customer
// Data visibly flows through the system via animated particles along routes.

type Node = { id: string; pos: [number, number, number]; color: string; label: string; scale: number }
const NODES: Node[] = [
  { id: 'factory', pos: [-7, 0.5, 0], color: '#10b981', label: 'Factory', scale: 1.2 },
  { id: 'warehouse', pos: [-2.5, -0.5, 0.8], color: '#22d3ee', label: 'Warehouse', scale: 1.0 },
  { id: 'truck', pos: [1.5, 0, -0.6], color: '#f59e0b', label: 'Logistics', scale: 0.9 },
  { id: 'distribution', pos: [4.5, -0.4, 0.6], color: '#a78bfa', label: 'Distribution', scale: 1.0 },
  { id: 'customer', pos: [7, 0.6, 0], color: '#34d399', label: 'Customer', scale: 1.1 },
]

const ROUTES: [string, string][] = [
  ['factory', 'warehouse'],
  ['warehouse', 'truck'],
  ['truck', 'distribution'],
  ['distribution', 'customer'],
]

function getNode(id: string) { return NODES.find(n => n.id === id)! }

function NodeBlock({ node, active }: { node: Node; active: boolean }) {
  const ref = useRef<THREE.Group>(null)
  const inner = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2
    }
    if (inner.current) {
      const s = node.scale + (active ? Math.sin(state.clock.elapsedTime * 2) * 0.05 : 0)
      inner.current.scale.setScalar(s)
    }
  })
  return (
    <group ref={ref} position={node.pos}>
      {/* glow */}
      <mesh>
        <sphereGeometry args={[0.6 * node.scale, 16, 16]} />
        <meshBasicMaterial color={node.color} transparent opacity={0.08} />
      </mesh>
      {/* core */}
      <mesh ref={inner}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.5} metalness={0.6} roughness={0.3} />
      </mesh>
      {/* ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.85 * node.scale, 0.92 * node.scale, 48]} />
        <meshBasicMaterial color={node.color} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function FlowParticles() {
  // Particles flowing along routes
  const refs = useRef<THREE.Mesh[]>([])
  const PARTICLES_PER_ROUTE = 6
  const total = ROUTES.length * PARTICLES_PER_ROUTE

  const items = useMemo(() => {
    return ROUTES.flatMap((r, ri) =>
      Array.from({ length: PARTICLES_PER_ROUTE }, (_, i) => ({
        ri, offset: i / PARTICLES_PER_ROUTE,
        from: getNode(r[0]).pos,
        to: getNode(r[1]).pos,
      }))
    )
  }, [])

  useFrame((state) => {
    items.forEach((it, idx) => {
      const m = refs.current[idx]
      if (!m) return
      const t = (state.clock.elapsedTime * 0.25 + it.offset) % 1
      const x = it.from[0] + (it.to[0] - it.from[0]) * t
      const y = it.from[1] + (it.to[1] - it.from[1]) * t + Math.sin(t * Math.PI) * 0.4
      const z = it.from[2] + (it.to[2] - it.from[2]) * t
      m.position.set(x, y, z)
      const s = Math.sin(t * Math.PI) // fade in/out
      m.scale.setScalar(s * 0.18)
      ;(m.material as THREE.MeshBasicMaterial).opacity = s
    })
  })

  return (
    <>
      {items.map((it, idx) => (
        <mesh key={idx} ref={(el) => { if (el) refs.current[idx] = el }}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color="#34d399" transparent opacity={0} />
        </mesh>
      ))}
      {/* route lines */}
      {ROUTES.map((r, i) => {
        const a = getNode(r[0]).pos
        const b = getNode(r[1]).pos
        const mid: [number, number, number] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + 0.4, (a[2] + b[2]) / 2]
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(...a), new THREE.Vector3(...mid), new THREE.Vector3(...b),
        ])
        const points = curve.getPoints(40)
        const geo = new THREE.BufferGeometry().setFromPoints(points)
        return (
          <line key={i}>
            {/* @ts-expect-error r3f primitive */}
            <primitive object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color: '#10b981', transparent: true, opacity: 0.25 }))} />
          </line>
        )
      })}
    </>
  )
}

function GridFloor() {
  const ref = useRef<THREE.GridHelper>(null)
  useFrame((s) => {
    if (ref.current) ref.current.position.z = (s.clock.elapsedTime * 0.5) % 4 - 2
  })
  return (
    <gridHelper ref={ref} args={[60, 60, '#10b981', '#1f2937']} position={[0, -2.5, 0]} />
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={0.7} />
      <pointLight position={[-7, 2, 3]} intensity={0.5} color="#10b981" />
      <pointLight position={[7, 2, 3]} intensity={0.5} color="#a78bfa" />
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        {NODES.map((n) => <NodeBlock key={n.id} node={n} active={n.id === 'truck'} />)}
      </Float>
      <FlowParticles />
      <GridFloor />
      <Environment preset="night" />
    </>
  )
}

export default function IndustrialWorld3D({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 2.5, 14], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
