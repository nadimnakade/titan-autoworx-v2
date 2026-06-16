import { useRef, useEffect, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  splitType?: 'chars' | 'words' | 'lines'
  stagger?: number
  duration?: number
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  scrollTrigger?: boolean
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  children?: ReactNode
}

export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  splitType = 'chars',
  stagger = 0.02,
  duration = 0.8,
  from = { y: 80, opacity: 0, rotateX: -40 },
  to = { y: 0, opacity: 1, rotateX: 0 },
  scrollTrigger = false,
  tag = 'div',
  children,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const targets = splitType === 'chars'
      ? container.querySelectorAll('.char')
      : splitType === 'words'
      ? container.querySelectorAll('.word')
      : container.querySelectorAll('.line')

    if (targets.length === 0) return

    const tl = gsap.timeline({
      delay,
      scrollTrigger: scrollTrigger ? {
        trigger: container,
        start: 'top 80%',
        once: true,
      } : undefined,
    })

    tl.fromTo(targets, from, {
      ...to,
      duration,
      stagger,
      ease: 'power3.out',
    })

    return () => {
      tl.kill()
    }
  }, [text, delay, splitType, stagger, duration, from, to, scrollTrigger])

  const renderText = () => {
    if (splitType === 'chars') {
      return text.split('').map((char, i) => (
        <span key={i} className="char inline-block" style={{ perspective: '400px' }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))
    }
    if (splitType === 'words') {
      return text.split(' ').map((word, i) => (
        <span key={i} className="word inline-block overflow-hidden">
          <span className="inline-block">{word}</span>
          {i < text.split(' ').length - 1 && '\u00A0'}
        </span>
      ))
    }
    return text.split('\n').map((line, i) => (
      <span key={i} className="line block overflow-hidden">
        <span className="inline-block">{line}</span>
      </span>
    ))
  }

  const Tag = tag as any

  return (
    <Tag ref={containerRef} className={className}>
      {children || renderText()}
    </Tag>
  )
}
