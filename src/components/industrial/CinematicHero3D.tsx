'use client'
// IndustryScope — Cinematic Industrial Entrance (scroll-driven R3F)
// Scenes: Road → Truck → Journey → Exit → Follow → Warehouse → Intelligence → Brand → Network → Command Center
import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, Html, RoundedBox, Environment } from '@react-three/drei'
import * as THREE from 'three'

// ---- Scroll progress ref type ----------------------------------------------
type ProgressRef = { current: number }

// ---- Keyframe interpolation -------------------------------------------------
type VKey = { p: number; v: [number, number, number] }
function lerpV(a: VKey, b: VKey, p: number, out: THREE.Vector3) {
  const t = (p - a.p) / (b.p - a.p)
  out.set(
    a.v[0] + (b.v[0] - a.v[0]) * t,
    a.v[1] + (b.v[1] - a.v[1]) * t,
    a.v[2] + (b.v[2] - a.v[2]) * t,
  )
}
function samplePath(path: VKey[], p: number, out: THREE.Vector3) {
  const cp = Math.max(0, Math.min(1, p))
  if (cp <= path[0].p) { out.set(...path[0].v); return }
  if (cp >= path[path.length - 1].p) { out.set(...path[path.length - 1].v); return }
  for (let i = 0; i < path.length - 1; i++) {
    if (cp >= path[i].p && cp <= path[i + 1].p) { lerpV(path[i], path[i + 1], cp, out); return }
  }
}
function sampleScalar(keys: { p: number; v: number }[], p: number): number {
  const cp = Math.max(0, Math.min(1, p))
  if (cp <= keys[0].p) return keys[0].v
  if (cp >= keys[keys.length - 1].p) return keys[keys.length - 1].v
  for (let i = 0; i < keys.length - 1; i++) {
    if (cp >= keys[i].p && cp <= keys[i + 1].p) {
      const t = (cp - keys[i].p) / (keys[i + 1].p - keys[i].p)
      return keys[i].v + (keys[i + 1].v - keys[i].v) * t
    }
  }
  return keys[keys.length - 1].v
}

// ---- Camera keyframes -------------------------------------------------------
const CAM_POS: VKey[] = [
  { p: 0.0, v: [0, 4, 24] },     // K0 wide establishing
  { p: 0.18, v: [-5, 3, 18] },   // K1 truck enters left
  { p: 0.36, v: [8, 2.2, 11] },  // K2 side profile, branding
  { p: 0.46, v: [14, 2.6, 9] },  // K3 truck passing
  { p: 0.6, v: [24, 3.4, 2] },   // K4 toward facility
  { p: 0.72, v: [34, 4, -12] }, // K5 approach entrance
  { p: 0.86, v: [40, 4.6, -22] },// K6 inside warehouse
  { p: 1.0, v: [36, 13, -32] }, // K7 pull up/back — network + handoff
]
const CAM_LOOK: VKey[] = [
  { p: 0.0, v: [0, 1.4, 0] },
  { p: 0.18, v: [-2, 1.4, 0] },
  { p: 0.36, v: [4, 1.4, 0] },
  { p: 0.46, v: [20, 1.4, -2] },
  { p: 0.6, v: [36, 2, -12] },
  { p: 0.72, v: [40, 3, -24] },
  { p: 0.86, v: [42, 2.6, -30] },
  { p: 1.0, v: [38, 1, -40] },
]
// Truck x position (travels left → right, exits into facility)
const TRUCK_X: { p: number; v: number }[] = [
  { p: 0.0, v: -58 },
  { p: 0.18, v: -26 },
  { p: 0.36, v: 10 },
  { p: 0.46, v: 34 },
  { p: 0.6, v: 66 },
  { p: 0.68, v: 78 },
  { p: 1.0, v: 78 },
]

// ---- Camera rig -------------------------------------------------------------
function CameraRig({ progress }: { progress: ProgressRef }) {
  const { camera } = useThree()
  const pos = useRef(new THREE.Vector3())
  const look = useRef(new THREE.Vector3())
  const cur = useRef(new THREE.Vector3())
  const curLook = useRef(new THREE.Vector3())
  useFrame(() => {
    const p = progress.current
    samplePath(CAM_POS, p, pos.current)
    samplePath(CAM_LOOK, p, look.current)
    // smooth toward target
    cur.current.lerp(pos.current, 0.06)
    curLook.current.lerp(look.current, 0.06)
    camera.position.copy(cur.current)
    camera.lookAt(curLook.current)
  })
  return null
}

// ---- Road + horizon --------------------------------------------------------
function Road() {
  return (
    <group>
      {/* asphalt */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 4]} receiveShadow>
        <planeGeometry args={[200, 60]} />
        <meshStandardMaterial color="#0c1118" roughness={0.95} metalness={0} />
      </mesh>
      {/* center lane markings (subtle) */}
      {Array.from({ length: 28 }).map((_, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[-70 + i * 5, 0.01, 4]}>
          <planeGeometry args={[2.4, 0.18]} />
          <meshStandardMaterial color="#1b2433" roughness={0.6} emissive="#16202c" emissiveIntensity={0.2} />
        </mesh>
      ))}
      {/* shoulder lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -6]}>
        <planeGeometry args={[200, 0.14]} />
        <meshStandardMaterial color="#16202c" roughness={0.7} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 14]}>
        <planeGeometry args={[200, 0.14]} />
        <meshStandardMaterial color="#16202c" roughness={0.7} />
      </mesh>
    </group>
  )
}

function HorizonBuildings() {
  // distant low-poly industrial silhouettes
  const items = useMemo(
    () => Array.from({ length: 16 }).map((_, i) => ({
      x: -90 + i * 12 + (i % 3) * 2,
      w: 6 + (i % 4) * 2,
      h: 4 + (i % 5) * 3 + (i % 3),
      d: 6 + (i % 3) * 2,
      z: -30 - (i % 4) * 4,
    })),
    [],
  )
  return (
    <group>
      {items.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2, b.z]}>
          <boxGeometry args={[b.w, b.h, b.d]} />
          <meshStandardMaterial color="#0a1018" roughness={0.9} metalness={0.1} />
        </mesh>
      ))}
      {/* a few chimney / vent boxes */}
      {items.slice(0, 6).map((b, i) => (
        <mesh key={`v${i}`} position={[b.x + 1, b.h + 1.2, b.z + 1]}>
          <boxGeometry args={[0.6, 2.4, 0.6]} />
          <meshStandardMaterial color="#0c121b" roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}

// ---- Truck ------------------------------------------------------------------
function Truck({ progress }: { progress: ProgressRef }) {
  const grp = useRef<THREE.Group>(null)
  const wheelL = useRef<THREE.Group>(null)
  const wheelR = useRef<THREE.Group>(null)
  const shadowRef = useRef<THREE.Mesh>(null)
  const lastX = useRef(0)

  useFrame((state) => {
    const p = progress.current
    const x = sampleScalar(TRUCK_X, p)
    const visible = p < 0.66
    if (grp.current) {
      grp.current.visible = visible
      // subtle suspension bob
      const bob = Math.sin(state.clock.elapsedTime * 2.4) * 0.025
      grp.current.position.set(x, 0.12 + bob, 0)
    }
    // wheel rotation proportional to distance traveled
    const dx = x - lastX.current
    lastX.current = x
    const rot = dx / 0.55
    if (wheelL.current) wheelL.current.rotation.x -= rot
    if (wheelR.current) wheelR.current.rotation.x -= rot
    // contact shadow follows + fades with distance
    if (shadowRef.current) {
      shadowRef.current.position.set(x, 0.02, 0)
      const m = shadowRef.current.material as THREE.MeshBasicMaterial
      m.opacity = Math.max(0, 0.5 - Math.abs(x) * 0.004)
    }
  })

  const wheel = (z: number) => (
    <group position={[0, 0, z]}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.62, 0.62, 0.42, 24]} />
        <meshStandardMaterial color="#15181d" roughness={0.85} metalness={0.2} />
      </mesh>
      {/* rim */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.26, 0.26, 0.44, 12]} />
        <meshStandardMaterial color="#3a4150" roughness={0.5} metalness={0.7} />
      </mesh>
    </group>
  )

  return (
    <>
      {/* contact shadow */}
      <mesh ref={shadowRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[16, 3.4]} />
        <meshBasicMaterial color="#000" transparent opacity={0.4} />
      </mesh>

      <group ref={grp}>
        {/* ---- Trailer / container ---- */}
        <group position={[0, 0, 0]}>
          {/* container body — graphite, slightly reflective */}
          <RoundedBox args={[12, 3.2, 2.6]} radius={0.12} position={[-1.5, 2.2, 0]} smoothness={4} castShadow>
            <meshStandardMaterial color="#1a2028" roughness={0.32} metalness={0.55} envMapIntensity={0.6} />
          </RoundedBox>
          {/* subtle lower chassis beam */}
          <mesh position={[-1.5, 0.7, 0]}>
            <boxGeometry args={[12, 0.4, 1.0]} />
            <meshStandardMaterial color="#0d1218" roughness={0.7} metalness={0.4} />
          </mesh>
          {/* rear doors detail */}
          <mesh position={[4.55, 2.2, 0]}>
            <boxGeometry args={[0.06, 2.8, 2.5]} />
            <meshStandardMaterial color="#0e131a" roughness={0.5} metalness={0.6} />
          </mesh>
          <mesh position={[4.58, 2.2, 0.62]}>
            <boxGeometry args={[0.02, 2.4, 0.02]} />
            <meshStandardMaterial color="#2a313e" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[4.58, 2.2, -0.62]}>
            <boxGeometry args={[0.02, 2.4, 0.02]} />
            <meshStandardMaterial color="#2a313e" metalness={0.8} roughness={0.3} />
          </mesh>

          {/* INDUSTRYSCOPE wordmark — both sides (camera-side +Z and far -Z) */}
          <BrandText side={1.31} progress={progress} />
          <BrandText side={-1.31} progress={progress} flipped />

          {/* small logistics markings near rear */}
          <Text
            position={[3.6, 1.0, 1.32]}
            rotation={[0, 0, 0]}
            fontSize={0.13}
            letterSpacing={0.06}
            color="#5b6573"
            anchorX="center"
            anchorY="middle"
          >
            IS-LOG-1842 · A
          </Text>
          <Text
            position={[3.6, 0.8, 1.32]}
            rotation={[0, 0, 0]}
            fontSize={0.09}
            letterSpacing={0.08}
            color="#454e5c"
            anchorX="center"
            anchorY="middle"
          >
            FLT-04 · MAX 24T
          </Text>
          {/* geometric brand pattern strip (restrained) */}
          {Array.from({ length: 6 }).map((_, i) => (
            <mesh key={i} position={[-6.2 + i * 0.22, 3.05, 1.31]}>
              <planeGeometry args={[0.12, 0.12]} />
              <meshStandardMaterial color="#2a323e" roughness={0.4} metalness={0.7} />
            </mesh>
          ))}
        </group>

        {/* ---- Cab (tractor) ---- */}
        <group position={[5.6, 0, 0]}>
          {/* cab body */}
          <RoundedBox args={[2.6, 2.9, 2.6]} radius={0.18} position={[0, 2.05, 0]} smoothness={4} castShadow>
            <meshStandardMaterial color="#222a35" roughness={0.28} metalness={0.6} envMapIntensity={0.7} />
          </RoundedBox>
          {/* cab lower skirt */}
          <mesh position={[0, 0.8, 0]}>
            <boxGeometry args={[2.4, 1.2, 2.4]} />
            <meshStandardMaterial color="#15191f" roughness={0.5} metalness={0.5} />
          </mesh>
          {/* windshield */}
          <mesh position={[0.7, 2.6, 0]} rotation={[0, 0, -0.18]}>
            <boxGeometry args={[1.6, 1.2, 2.2]} />
            <meshStandardMaterial color="#0a1822" roughness={0.1} metalness={0.3} transparent opacity={0.6} envMapIntensity={1} />
          </mesh>
          {/* grille */}
          <mesh position={[1.25, 1.4, 0]}>
            <boxGeometry args={[0.1, 0.9, 1.8]} />
            <meshStandardMaterial color="#0c0f14" roughness={0.6} metalness={0.5} />
          </mesh>
          {/* headlight */}
          <mesh position={[1.3, 1.7, 0.8]}>
            <boxGeometry args={[0.08, 0.3, 0.4]} />
            <meshStandardMaterial color="#cfe8ff" emissive="#bfe0ff" emissiveIntensity={0.5} roughness={0.2} />
          </mesh>
          <mesh position={[1.3, 1.7, -0.8]}>
            <boxGeometry args={[0.08, 0.3, 0.4]} />
            <meshStandardMaterial color="#cfe8ff" emissive="#bfe0ff" emissiveIntensity={0.5} roughness={0.2} />
          </mesh>
          {/* exhaust stack */}
          <mesh position={[-0.6, 3.4, -1.2]}>
            <cylinderGeometry args={[0.12, 0.12, 1.6, 12]} />
            <meshStandardMaterial color="#1a1f27" roughness={0.4} metalness={0.8} />
          </mesh>
          {/* small IS mark on cab door */}
          <Text position={[1.0, 2.0, 1.31]} fontSize={0.22} color="#7f8b9a" anchorX="center" anchorY="middle" letterSpacing={0.04}>
            IS
          </Text>
        </group>

        {/* ---- Wheels ---- (5 axle wheels: 2 front cab, 3 trailer) */}
        <group ref={wheelL} position={[0, 0.62, 1.3]}>
          {[5.0, 3.2, -2.5, -4.3, -6.0].map((wx, i) => (
            <group key={i} position={[wx, 0, 0]}>
              <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.62, 0.62, 0.42, 24]} />
                <meshStandardMaterial color="#15181d" roughness={0.85} metalness={0.2} />
              </mesh>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.26, 0.26, 0.44, 12]} />
                <meshStandardMaterial color="#3a4150" roughness={0.5} metalness={0.7} />
              </mesh>
            </group>
          ))}
        </group>
        <group ref={wheelR} position={[0, 0.62, -1.3]}>
          {[5.0, 3.2, -2.5, -4.3, -6.0].map((wx, i) => (
            <group key={i} position={[wx, 0, 0]}>
              <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.62, 0.62, 0.42, 24]} />
                <meshStandardMaterial color="#15181d" roughness={0.85} metalness={0.2} />
              </mesh>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.26, 0.26, 0.44, 12]} />
                <meshStandardMaterial color="#3a4150" roughness={0.5} metalness={0.7} />
              </mesh>
            </group>
          ))}
        </group>
      </group>
    </>
  )
}

function BrandText({ side, flipped, progress }: { side: number; flipped?: boolean; progress: ProgressRef }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(() => {
    // keep brand readable — slight billboard toward camera-side only when side faces camera
    if (ref.current) {
      const p = progress.current
      // fade slightly when far (fog handles most)
      ref.current.visible = p < 0.66
    }
  })
  return (
    <group ref={ref} position={[-1.5, 2.2, side]} rotation={[0, flipped ? Math.PI : 0, 0]}>
      <Text
        fontSize={0.72}
        letterSpacing={0.02}
        color="#d7dee8"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.004}
        outlineColor="#0a0d12"
      >
        INDUSTRYSCOPE
      </Text>
      <Text position={[0, -0.6, 0]} fontSize={0.18} letterSpacing={0.14} color="#5b6573" anchorX="center" anchorY="middle">
        AI OPERATING SYSTEM
      </Text>
    </group>
  )
}

// ---- Warehouse --------------------------------------------------------------
function Warehouse() {
  // Instanced boxes for inventory stacks
  const boxCount = 60
  const refs = useMemo(() => {
    const arr: { pos: [number, number, number]; size: [number, number, number]; rot: number }[] = []
    // rack rows
    const rackX = [22, 28, 50, 56]
    rackX.forEach((rx) => {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 5; col++) {
          arr.push({
            pos: [rx, 0.6 + row * 1.4, -22 - col * 2.6],
            size: [1.1, 1.1, 1.1],
            rot: 0,
          })
        }
      }
    })
    return arr.slice(0, boxCount)
  }, [])

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const meshRef = useRef<THREE.InstancedMesh>(null)
  useFrame(() => {
    if (!meshRef.current) return
    refs.forEach((b, i) => {
      dummy.position.set(...b.pos)
      dummy.rotation.set(0, b.rot, 0)
      dummy.scale.set(...b.size)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group>
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[40, 0, -28]} receiveShadow>
        <planeGeometry args={[44, 32]} />
        <meshStandardMaterial color="#0e131a" roughness={0.9} metalness={0.05} />
      </mesh>
      {/* floor marking lines (subtle) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[40, 0.01, -16]}>
        <planeGeometry args={[44, 0.08]} />
        <meshBasicMaterial color="#1c2632" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[40, 0.01, -34]}>
        <planeGeometry args={[44, 0.08]} />
        <meshBasicMaterial color="#1c2632" />
      </mesh>

      {/* walls */}
      <mesh position={[40, 6.5, -44]}>
        <boxGeometry args={[44, 13, 0.4]} />
        <meshStandardMaterial color="#11161e" roughness={0.9} metalness={0.1} />
      </mesh>
      <mesh position={[18, 6.5, -28]}>
        <boxGeometry args={[0.4, 13, 32]} />
        <meshStandardMaterial color="#11161e" roughness={0.9} metalness={0.1} />
      </mesh>
      <mesh position={[62, 6.5, -28]}>
        <boxGeometry args={[0.4, 13, 32]} />
        <meshStandardMaterial color="#11161e" roughness={0.9} metalness={0.1} />
      </mesh>
      {/* roof */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[40, 13, -28]}>
        <planeGeometry args={[44, 32]} />
        <meshStandardMaterial color="#0a0f16" roughness={0.95} side={THREE.DoubleSide} />
      </mesh>

      {/* structural beams — instanced columns */}
      {[[18, -12], [18, -44], [62, -12], [62, -44], [40, -12], [40, -44]].map((c, i) => (
        <mesh key={i} position={[c[0], 6.5, c[1]]}>
          <boxGeometry args={[0.5, 13, 0.5]} />
          <meshStandardMaterial color="#2a323e" roughness={0.5} metalness={0.6} />
        </mesh>
      ))}
      {/* roof trusses */}
      {[ -12, -22, -32, -42].map((z, i) => (
        <mesh key={i} position={[40, 12.6, z]}>
          <boxGeometry args={[44, 0.3, 0.3]} />
          <meshStandardMaterial color="#222a35" roughness={0.5} metalness={0.6} />
        </mesh>
      ))}

      {/* shelving rack frames */}
      {[22, 28, 50, 56].map((rx) => (
        <group key={rx}>
          {[ -22, -32, -42].map((z) => (
            <group key={z} position={[rx, 0, z]}>
              {/* uprights */}
              <mesh position={[-0.7, 2.1, 0]}><boxGeometry args={[0.12, 4.2, 0.12]} /><meshStandardMaterial color="#2a323e" roughness={0.5} metalness={0.6} /></mesh>
              <mesh position={[0.7, 2.1, 0]}><boxGeometry args={[0.12, 4.2, 0.12]} /><meshStandardMaterial color="#2a323e" roughness={0.5} metalness={0.6} /></mesh>
              {/* shelves */}
              {[0.4, 1.8, 3.2].map((y) => (
                <mesh key={y} position={[0, y, 0]}><boxGeometry args={[1.6, 0.06, 1.6]} /><meshStandardMaterial color="#1a2028" roughness={0.6} metalness={0.4} /></mesh>
              ))}
            </group>
          ))}
        </group>
      ))}

      {/* instanced inventory boxes */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, boxCount]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#8a7f6a" roughness={0.9} metalness={0} />
      </instancedMesh>

      {/* conveyor system along right wall */}
      <group position={[58, 0, -30]}>
        <mesh position={[0, 0.6, 0]}><boxGeometry args={[20, 0.3, 1.4]} /><meshStandardMaterial color="#1a2028" roughness={0.5} metalness={0.5} /></mesh>
        {Array.from({ length: 14 }).map((_, i) => (
          <mesh key={i} rotation={[0, 0, Math.PI / 2]} position={[-9 + i * 1.3, 0.7, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 1.2, 10]} />
            <meshStandardMaterial color="#3a4150" roughness={0.4} metalness={0.7} />
          </mesh>
        ))}
        {/* legs */}
        {[-8, -4, 0, 4, 8].map((x) => (
          <mesh key={x} position={[x, 0.3, 0]}><boxGeometry args={[0.2, 0.6, 1.2]} /><meshStandardMaterial color="#222a35" roughness={0.5} metalness={0.5} /></mesh>
        ))}
      </group>

      {/* forklift (simplified) near front */}
      <Forklift position={[34, 0, -16]} rotation={0.3} />

      {/* pallet on floor */}
      {[[36, -20], [38, -19], [44, -38]].map((p, i) => (
        <group key={i} position={[p[0], 0, p[1]]}>
          <mesh position={[0, 0.08, 0]}><boxGeometry args={[1.2, 0.16, 1.2]} /><meshStandardMaterial color="#5a4f3e" roughness={0.95} /></mesh>
          <mesh position={[0, 0.5, 0]}><boxGeometry args={[1.0, 0.6, 1.0]} /><meshStandardMaterial color="#7a6f5a" roughness={0.9} /></mesh>
        </group>
      ))}

      {/* machine against back wall */}
      <group position={[24, 0, -42]}>
        <mesh position={[0, 1.2, 0]}><boxGeometry args={[3, 2.4, 2]} /><meshStandardMaterial color="#1a2028" roughness={0.45} metalness={0.6} /></mesh>
        <mesh position={[0, 2.8, 0]}><boxGeometry args={[2.6, 0.4, 1.6]} /><meshStandardMaterial color="#222a35" roughness={0.4} metalness={0.7} /></mesh>
        <mesh position={[0.8, 1.2, 1.05]}><boxGeometry args={[0.6, 0.6, 0.1]} /><meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.4} /></mesh>
      </group>
    </group>
  )
}

function Forklift({ position, rotation }: { position: [number, number, number]; rotation: number }) {
  const forkRef = useRef<THREE.Group>(null)
  useFrame((s) => {
    if (forkRef.current) forkRef.current.position.y = 0.6 + Math.sin(s.clock.elapsedTime * 0.8) * 0.2
  })
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* body */}
      <mesh position={[0, 0.9, 0]}><boxGeometry args={[1.4, 1.0, 1.2]} /><meshStandardMaterial color="#f59e0b" roughness={0.4} metalness={0.4} /></mesh>
      {/* cab */}
      <mesh position={[0, 1.7, 0]}><boxGeometry args={[0.9, 0.7, 0.9]} /><meshStandardMaterial color="#1a2028" roughness={0.3} metalness={0.5} transparent opacity={0.7} /></mesh>
      {/* mast */}
      <mesh position={[0, 1.8, 0.7]}><boxGeometry args={[0.2, 2.4, 0.2]} /><meshStandardMaterial color="#2a323e" roughness={0.4} metalness={0.7} /></mesh>
      {/* forks */}
      <group ref={forkRef} position={[0, 0.6, 0.9]}>
        <mesh position={[-0.3, 0, 0.4]}><boxGeometry args={[0.08, 0.08, 1.0]} /><meshStandardMaterial color="#2a323e" roughness={0.4} metalness={0.7} /></mesh>
        <mesh position={[0.3, 0, 0.4]}><boxGeometry args={[0.08, 0.08, 1.0]} /><meshStandardMaterial color="#2a323e" roughness={0.4} metalness={0.7} /></mesh>
      </group>
      {/* wheels */}
      <mesh position={[-0.7, 0.4, 0.5]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.4, 0.4, 0.2, 16]} /><meshStandardMaterial color="#15181d" roughness={0.85} /></mesh>
      <mesh position={[0.7, 0.4, 0.5]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.4, 0.4, 0.2, 16]} /><meshStandardMaterial color="#15181d" roughness={0.85} /></mesh>
      <mesh position={[-0.6, 0.35, -0.5]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.3, 0.3, 0.2, 16]} /><meshStandardMaterial color="#15181d" roughness={0.85} /></mesh>
      <mesh position={[0.6, 0.35, -0.5]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.3, 0.3, 0.2, 16]} /><meshStandardMaterial color="#15181d" roughness={0.85} /></mesh>
    </group>
  )
}

// ---- Data overlays (spatial intelligence) ----------------------------------
type OverlayProps = { progress: ProgressRef; activateAt: number; pos: [number, number, number]; children: React.ReactNode; align?: 'left' | 'right' }
function SpatialOverlay({ progress, activateAt, pos, children, align = 'left' }: OverlayProps) {
  const ref = useRef<HTMLDivElement>(null)
  const grp = useRef<THREE.Group>(null)
  useFrame(() => {
    const a = Math.max(0, Math.min(1, (progress.current - activateAt) / 0.06))
    if (ref.current) ref.current.style.opacity = String(a)
    if (grp.current) grp.current.visible = a > 0.01
  })
  return (
    <group ref={grp} position={pos}>
      {/* anchor marker */}
      <mesh>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.25} />
      </mesh>
      <Html
        position={[align === 'left' ? -0.5 : 0.5, 0.9, 0]}
        center
        distanceFactor={14}
        zIndexRange={[10, 0]}
        style={{ pointerEvents: 'none' }}
      >
        <div
          ref={ref}
          style={{ opacity: 0, transition: 'opacity 0.2s', transform: `translateX(${align === 'left' ? '-100%' : '0'})` }}
          className="whitespace-nowrap rounded-lg border border-emerald-500/40 bg-slate-950/85 backdrop-blur-md px-3 py-2 text-[10px] font-mono text-slate-200 shadow-lg shadow-emerald-500/10"
        >
          {children}
        </div>
      </Html>
    </group>
  )
}

function DataOverlays({ progress }: { progress: ProgressRef }) {
  return (
    <>
      <SpatialOverlay progress={progress} activateAt={0.78} pos={[22, 4, -22]} align="right">
        <div className="text-emerald-400 font-semibold mb-1">WAREHOUSE A</div>
        <div>Inventory · 12,482 units</div>
        <div>Capacity · 78%</div>
        <div>Risk · <span className="text-emerald-400">LOW</span></div>
      </SpatialOverlay>
      <SpatialOverlay progress={progress} activateAt={0.82} pos={[28, 2.6, -32]} align="left">
        <div className="text-emerald-400 font-semibold mb-1">SKU-2048</div>
        <div>Stock · 1,240</div>
        <div>Coverage · 8.4 days</div>
        <div>Forecast · <span className="text-emerald-400">↑ 12%</span></div>
      </SpatialOverlay>
      <SpatialOverlay progress={progress} activateAt={0.86} pos={[58, 2.2, -30]} align="left">
        <div className="text-emerald-400 font-semibold mb-1">SHIPMENT #1842</div>
        <div>ETA · 14:42</div>
        <div>Delay Risk · 18%</div>
        <div>Status · <span className="text-amber-400">IN TRANSIT</span></div>
      </SpatialOverlay>
      <SpatialOverlay progress={progress} activateAt={0.84} pos={[24, 2.6, -42]} align="right">
        <div className="text-emerald-400 font-semibold mb-1">Machine M-204</div>
        <div>Operational</div>
        <div>Health · 94%</div>
      </SpatialOverlay>
    </>
  )
}

// ---- Network nodes (pull-back view) ----------------------------------------
function Network({ progress }: { progress: ProgressRef }) {
  const grp = useRef<THREE.Group>(null)
  const lineMat = useRef<THREE.LineBasicMaterial>(null)
  useFrame(() => {
    const a = Math.max(0, Math.min(1, (progress.current - 0.88) / 0.08))
    if (grp.current) grp.current.visible = a > 0.01
    if (lineMat.current) lineMat.current.opacity = a * 0.5
    grp.current?.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.MeshBasicMaterial | undefined
      if (m && m.transparent) m.opacity = a * (m.userData.base ?? 1)
    })
  })
  const nodes: { id: string; pos: [number, number, number] }[] = [
    { id: 'factory', pos: [26, 8, -34] },
    { id: 'warehouse', pos: [34, 9, -38] },
    { id: 'truck', pos: [42, 8, -34] },
    { id: 'distribution', pos: [50, 9, -38] },
    { id: 'customer', pos: [58, 8, -34] },
  ]
  const routes: [string, string][] = [['factory', 'warehouse'], ['warehouse', 'truck'], ['truck', 'distribution'], ['distribution', 'customer']]
  const get = (id: string) => nodes.find(n => n.id === id)!
  return (
    <group ref={grp}>
      {/* connecting lines */}
      {routes.map((r, i) => {
        const a = get(r[0]).pos; const b = get(r[1]).pos
        const pts = [new THREE.Vector3(...a), new THREE.Vector3(...b)]
        const geo = new THREE.BufferGeometry().setFromPoints(pts)
        return (
          <line key={i}>
            {/* @ts-expect-error r3f primitive */}
            <primitive object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color: '#10b981', transparent: true }))} />
          </line>
        )
      })}
      {/* nodes */}
      {nodes.map((n) => (
        <group key={n.id} position={n.pos}>
          <mesh><sphereGeometry args={[0.3, 16, 16]} /><meshBasicMaterial color="#10b981" transparent userData={{ base: 1 }} /></mesh>
          <mesh><sphereGeometry args={[0.55, 16, 16]} /><meshBasicMaterial color="#10b981" transparent opacity={0.3} userData={{ base: 0.3 }} /></mesh>
        </group>
      ))}
    </group>
  )
}

// ---- Scene ------------------------------------------------------------------
function Scene({ progress }: { progress: ProgressRef }) {
  const intelligenceLight = useRef<THREE.PointLight>(null)
  useFrame(() => {
    const p = progress.current
    if (intelligenceLight.current) {
      intelligenceLight.current.intensity = Math.max(0, (p - 0.74) / 0.12) * 8
    }
  })
  return (
    <>
      <fog attach="fog" args={['#070b12', 22, 78]} />
      <ambientLight intensity={0.35} color="#0a1422" />
      <hemisphereLight args={['#0a1422', '#05080d', 0.4]} />
      <directionalLight position={[10, 18, 12]} intensity={0.7} color="#cfe0ff" castShadow />
      <pointLight position={[40, 8, -28]} intensity={0} color="#10b981" ref={intelligenceLight} distance={40} />
      <pointLight position={[40, 11, -28]} intensity={0.6} color="#3a4150" distance={50} />
      <pointLight position={[24, 10, -40]} intensity={0.4} color="#4a5360" distance={40} />

      <Road />
      <HorizonBuildings />
      <Truck progress={progress} />
      <Warehouse />
      <DataOverlays progress={progress} />
      <Network progress={progress} />

      <Environment preset="night" />
    </>
  )
}

export default function CinematicHero3D({ progress }: { progress: ProgressRef }) {
  return (
    <Canvas
      shadows={false}
      camera={{ position: [0, 4, 24], fov: 48, near: 0.1, far: 200 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <Scene progress={progress} />
        <CameraRig progress={progress} />
      </Suspense>
    </Canvas>
  )
}
