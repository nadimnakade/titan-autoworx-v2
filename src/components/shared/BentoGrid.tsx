import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BentoGridProps {
  children: ReactNode
  className?: string
  cols?: 2 | 3 | 4
}

export function BentoGrid({ children, className = '', cols = 3 }: BentoGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={cn('grid gap-4', gridCols[cols], className)}>
      {children}
    </div>
  )
}

interface BentoCardProps {
  children: ReactNode
  className?: string
  span?: 'default' | 'wide' | 'tall' | 'full'
}

export function BentoCard({ children, className = '', span = 'default' }: BentoCardProps) {
  const spans = {
    default: '',
    wide: 'md:col-span-2',
    tall: 'md:row-span-2',
    full: 'md:col-span-2 md:row-span-2',
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-titan-deep/60 backdrop-blur-xl',
        'border border-titan-red/5',
        'hover:border-titan-red/20 transition-all duration-500',
        spans[span],
        className
      )}
    >
      {children}
    </div>
  )
}
