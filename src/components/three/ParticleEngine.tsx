import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleEngineProps {
  count?: number
  mouse: THREE.Vector2
}

export default function ParticleEngine({ count = 500, mouse }: ParticleEngineProps) {
  const pointsRef = useRef<THREE.Points>(null!)

  const { positions, velocities, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2 + Math.random() * 3

      positions[i3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = r * Math.cos(phi)

      velocities[i3] = (Math.random() - 0.5) * 0.002
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.002
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002

      const colorChoice = Math.random()
      if (colorChoice < 0.4) {
        colors[i3] = 0.784
        colors[i3 + 1] = 0.192
        colors[i3 + 2] = 0.165
      } else if (colorChoice < 0.7) {
        colors[i3] = 0.949
        colors[i3 + 1] = 0.757
        colors[i3 + 2] = 0.306
      } else {
        colors[i3] = 0.667
        colors[i3 + 1] = 0.698
        colors[i3 + 2] = 0.741
      }

      sizes[i] = Math.random() * 0.02 + 0.005
    }

    return { positions, velocities, colors, sizes }
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.elapsedTime
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      posArray[i3] += velocities[i3] + Math.sin(time * 0.1 + i) * 0.0003
      posArray[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.1 + i) * 0.0003
      posArray[i3 + 2] += velocities[i3 + 2]

      const dist = Math.sqrt(
        posArray[i3] ** 2 + posArray[i3 + 1] ** 2 + posArray[i3 + 2] ** 2
      )

      if (dist > 5) {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const r = 1 + Math.random()
        posArray[i3] = r * Math.sin(phi) * Math.cos(theta)
        posArray[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
        posArray[i3 + 2] = r * Math.cos(phi)
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true

    pointsRef.current.rotation.y = time * 0.02 + mouse.x * 0.1
    pointsRef.current.rotation.x = mouse.y * 0.05
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  )
}
