import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface TelemetryRingsProps {
  count?: number
  mouse: THREE.Vector2
}

export default function TelemetryRings({ count = 4, mouse }: TelemetryRingsProps) {
  const groupRef = useRef<THREE.Group>(null!)

  const rings = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      radius: 1.8 + i * 0.5,
      tube: 0.005 + i * 0.002,
      speed: 0.2 + i * 0.1,
      direction: i % 2 === 0 ? 1 : -1,
      color: i === 0 ? '#C8312A' : i === 1 ? '#F2C14E' : i === 2 ? '#E8453C' : '#AAB2BD',
      segments: 128,
      dashSize: 0.3 + i * 0.1,
      gapSize: 0.5 + i * 0.15,
    }))
  }, [count])

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.elapsedTime

    groupRef.current.rotation.x = Math.PI / 2 + mouse.y * 0.2
    groupRef.current.rotation.z = mouse.x * 0.3

    groupRef.current.children.forEach((child, i) => {
      const ring = rings[i]
      if (ring) {
        child.rotation.z = time * ring.speed * ring.direction
      }
    })
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {rings.map((ring) => (
        <mesh key={ring.id} rotation={[0, 0, 0]}>
          <torusGeometry args={[ring.radius, ring.tube, 16, ring.segments]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={0.4}
            toneMapped={false}
          />
        </mesh>
      ))}

      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const r = 1.5 + Math.random() * 2
        return (
          <mesh
            key={`dot-${i}`}
            position={[
              Math.cos(angle) * r,
              Math.sin(angle) * r,
              0,
            ]}
          >
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshBasicMaterial color="#C8312A" toneMapped={false} />
          </mesh>
        )
      })}
    </group>
  )
}
