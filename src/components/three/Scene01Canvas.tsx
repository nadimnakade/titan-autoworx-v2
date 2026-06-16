import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import * as THREE from 'three'
import SpartanHelmet from './SpartanHelmet'
import TelemetryRings from './TelemetryRings'
import ParticleEngine from './ParticleEngine'
import { useMousePosition } from '@/hooks/useMousePosition'

export default function Scene01Canvas() {
  const mouse = useMousePosition()
  const mouseVec = new THREE.Vector2(mouse.x, mouse.y)

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#E8E5DD" />
        <directionalLight position={[-5, 3, -5]} intensity={0.4} color="#C8312A" />
        <pointLight position={[0, 2, 3]} intensity={1} color="#C8312A" distance={10} />
        <pointLight position={[2, -1, 2]} intensity={0.5} color="#F2C14E" distance={8} />

        <fog attach="fog" args={['#0A0D12', 3, 12]} />

        <SpartanHelmet />
        <TelemetryRings mouse={mouseVec} />
        <ParticleEngine mouse={mouseVec} />
      </Suspense>
    </Canvas>
  )
}
