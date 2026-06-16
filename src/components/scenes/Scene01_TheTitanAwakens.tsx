import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scene01Canvas from '../three/Scene01Canvas'
import AnimatedText from '../shared/AnimatedText'
import MagneticButton from '../shared/MagneticButton'
import { TelemetryRing, ScanlineEffect, GridOverlay } from '../shared/Effects'
import { TITAN_DATA } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

export default function Scene01_TheTitanAwakens() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!headlineRef.current) return

    const chars = headlineRef.current.querySelectorAll('.hero-char')

    gsap.fromTo(
      chars,
      {
        y: 120,
        opacity: 0,
        rotateX: -90,
        transformOrigin: 'bottom center',
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.03,
        ease: 'power4.out',
        delay: 2.8,
      }
    )
  }, [isLoaded])

  const headlineLines = ['BUILT TO HANDLE', 'ANYTHING', 'ON FOUR WHEELS']

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-titan-void"
    >
      <div className="absolute inset-0">
        <Scene01Canvas />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-titan-void/40 via-transparent to-titan-void" />
      <div className="absolute inset-0 bg-gradient-to-r from-titan-void/60 via-transparent to-titan-void/60" />

      <GridOverlay opacity={0.02} />
      <ScanlineEffect />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <TelemetryRing size={400} speed={25} color="rgba(200, 49, 42, 0.08)" />
        <TelemetryRing size={550} speed={30} reverse color="rgba(242, 193, 78, 0.05)" />
        <TelemetryRing size={700} speed={35} color="rgba(170, 178, 189, 0.04)" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between px-6 md:px-10 lg:px-16 pt-28 pb-12">
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <div className="w-12 h-[1px] bg-titan-red" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-titan-steel/60 uppercase">
            Automotive Engineering Excellence
          </span>
        </motion.div>

        <div className="flex-1 flex items-center">
          <div className="max-w-5xl">
            <div ref={headlineRef} className="perspective-[1000px]">
              {headlineLines.map((line, lineIndex) => (
                <div
                  key={lineIndex}
                  className={`overflow-hidden ${
                    lineIndex === 1 ? 'ml-0 md:ml-16 lg:ml-32' : ''
                  }`}
                >
                  <h1
                    className={`font-oswald font-bold uppercase leading-[0.9] tracking-tight ${
                      lineIndex === 0
                        ? 'text-5xl md:text-7xl lg:text-8xl text-titan-cream'
                        : lineIndex === 1
                        ? 'text-7xl md:text-9xl lg:text-[10rem] hero-text-gradient-red'
                        : 'text-4xl md:text-5xl lg:text-6xl text-titan-steel/60'
                    }`}
                  >
                    {line.split('').map((char, i) => (
                      <span key={i} className="hero-char inline-block">
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </h1>
                </div>
              ))}
            </div>

            <motion.div
              className="mt-12 flex flex-col sm:flex-row items-start gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5, duration: 0.8 }}
            >
              <MagneticButton variant="primary" size="lg">
                Explore Capabilities
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </MagneticButton>
              <MagneticButton variant="secondary" size="lg">
                View Workshop
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
          {TITAN_DATA.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.8 + i * 0.1, duration: 0.6 }}
            >
              <div className="font-oswald text-3xl md:text-4xl font-bold text-titan-cream">
                {stat.value}
                <span className="text-titan-red">{stat.suffix}</span>
              </div>
              <div className="font-mono text-[10px] tracking-[0.15em] text-titan-steel/50 uppercase mt-1">
                {stat.label}
              </div>
              <div className="absolute -bottom-2 left-0 w-8 h-[1px] bg-titan-red/30" />
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.2 }}
      >
        <span className="font-mono text-[9px] tracking-[0.3em] text-titan-steel/30 uppercase">
          Scroll to explore
        </span>
        <motion.div
          className="w-[1px] h-8 bg-gradient-to-b from-titan-red/50 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
