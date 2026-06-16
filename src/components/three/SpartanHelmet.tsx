import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, Environment, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function SpartanHelmet() {
  const groupRef = useRef<THREE.Group>(null!)
  const helmetRef = useRef<THREE.Group>(null!)
  const { mouse } = useThree()

  const eyeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#C8312A'),
        emissive: new THREE.Color('#C8312A'),
        emissiveIntensity: 2,
        toneMapped: false,
      }),
    []
  )

  const metalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1a1a2e'),
        metalness: 0.95,
        roughness: 0.15,
        envMapIntensity: 1.5,
      }),
    []
  )

  const accentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#C8312A'),
        metalness: 0.8,
        roughness: 0.2,
      }),
    []
  )

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.elapsedTime

    groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.15 + mouse.x * 0.3
    groupRef.current.rotation.x = Math.cos(time * 0.2) * 0.05 + mouse.y * 0.15

    if (helmetRef.current) {
      helmetRef.current.position.y = Math.sin(time * 0.8) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef}>
        <group ref={helmetRef} scale={1.2}>
          <mesh material={metalMaterial} castShadow>
            <sphereGeometry args={[1, 64, 64]} />
          </mesh>

          <mesh position={[0, 0.1, 0.85]} material={metalMaterial}>
            <boxGeometry args={[0.6, 0.8, 0.3]} />
          </mesh>

          <mesh position={[0, 0.5, 0.3]} material={metalMaterial}>
            <boxGeometry args={[1.4, 0.15, 0.8]} />
          </mesh>

          <mesh position={[0, 0.3, 0.7]} material={accentMaterial}>
            <boxGeometry args={[0.3, 0.5, 0.15]} />
          </mesh>

          <mesh position={[-0.25, 0.15, 0.9]} material={eyeMaterial}>
            <sphereGeometry args={[0.08, 32, 32]} />
          </mesh>
          <mesh position={[0.25, 0.15, 0.9]} material={eyeMaterial}>
            <sphereGeometry args={[0.08, 32, 32]} />
          </mesh>

          <mesh position={[0, -0.3, 0.75]} material={metalMaterial}>
            <boxGeometry args={[0.8, 0.3, 0.2]} />
          </mesh>

          {[...Array(8)].map((_, i) => (
            <mesh
              key={i}
              position={[
                Math.cos((i / 8) * Math.PI * 2) * 1.02,
                Math.sin((i / 8) * Math.PI * 2) * 0.3,
                Math.sin((i / 8) * Math.PI * 2) * 1.02,
              ]}
              material={accentMaterial}
            >
              <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  )
}
