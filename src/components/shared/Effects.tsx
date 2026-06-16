import { useRef, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlowEffectProps {
  children: ReactNode
  className?: string
  color?: string
  size?: number
  intensity?: number
}

export default function GlowEffect({
  children,
  className = '',
  color = '#C8312A',
  size = 300,
  intensity = 0.15,
}: GlowEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {children}
    </div>
  )
}

interface AnimatedBorderProps {
  children: ReactNode
  className?: string
  borderWidth?: number
  duration?: number
}

export function AnimatedBorder({
  children,
  className = '',
  borderWidth = 1,
  duration = 3,
}: AnimatedBorderProps) {
  return (
    <div className={cn('relative p-[1px]', className)}>
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background: `conic-gradient(from 0deg, transparent, #C8312A, transparent, #F2C14E, transparent)`,
          animation: `spin ${duration}s linear infinite`,
        }}
      />
      <div className="relative rounded-xl bg-titan-deep">{children}</div>
    </div>
  )
}

interface ParticleFieldProps {
  count?: number
  className?: string
  color?: string
}

export function ParticleField({ count = 50, className = '', color = '#C8312A' }: ParticleFieldProps) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.1,
  }))

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [particle.opacity, particle.opacity * 2, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

interface GridOverlayProps {
  className?: string
  opacity?: number
}

export function GridOverlay({ className = '', opacity = 0.03 }: GridOverlayProps) {
  return (
    <div
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{
        backgroundImage: `
          linear-gradient(rgba(200, 49, 42, ${opacity}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(200, 49, 42, ${opacity}) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  )
}

interface ScanlineEffectProps {
  className?: string
  color?: string
}

export function ScanlineEffect({ className = '', color = '#C8312A' }: ScanlineEffectProps) {
  return (
    <div className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}>
      <motion.div
        className="absolute w-full h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          boxShadow: `0 0 20px ${color}, 0 0 40px ${color}`,
        }}
        animate={{
          y: ['-100vh', '100vh'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}

interface TelemetryRingProps {
  size: number
  className?: string
  speed?: number
  reverse?: boolean
  color?: string
}

export function TelemetryRing({
  size,
  className = '',
  speed = 20,
  reverse = false,
  color = 'rgba(200, 49, 42, 0.15)',
}: TelemetryRingProps) {
  return (
    <div
      className={cn('absolute rounded-full border', className)}
      style={{
        width: size,
        height: size,
        borderColor: color,
        animation: `telemetryRotate ${speed}s linear infinite ${reverse ? 'reverse' : ''}`,
      }}
    >
      <div
        className="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ backgroundColor: color.replace('0.15', '0.6') }}
      />
    </div>
  )
}
