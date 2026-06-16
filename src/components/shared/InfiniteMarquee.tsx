import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface InfiniteMarqueeProps {
  children: ReactNode[]
  className?: string
  speed?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
}

export default function InfiniteMarquee({
  children,
  className = '',
  speed = 30,
  direction = 'left',
  pauseOnHover = true,
}: InfiniteMarqueeProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className="flex w-max"
        style={{
          animation: `marquee ${speed}s linear infinite ${direction === 'right' ? 'reverse' : ''}`,
        }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

interface MarqueeItemProps {
  children: ReactNode
  className?: string
}

export function MarqueeItem({ children, className = '' }: MarqueeItemProps) {
  return (
    <div className={cn('flex items-center shrink-0 px-8', className)}>
      {children}
    </div>
  )
}
