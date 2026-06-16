import { useRef, useState, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  spotlightColor?: string
  borderGlow?: boolean
  hoverScale?: number
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(200, 49, 42, 0.15)',
  borderGlow = true,
  hoverScale = 1.02,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative overflow-hidden rounded-xl',
        borderGlow && 'group',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: hoverScale }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {borderGlow && (
        <div
          className={cn(
            'absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500',
            'group-hover:opacity-100'
          )}
          style={{
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 60%)`,
          }}
        />
      )}

      <div
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(200, 49, 42, 0.06), transparent 40%)`,
        }}
      />

      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            background: `radial-gradient(200px circle at ${position.x}px ${position.y}px, rgba(200, 49, 42, 0.1), transparent 60%)`,
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
