import { useRef, useEffect, ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SpotlightCard from '../shared/SpotlightCard'
import { BentoGrid, BentoCard } from '../shared/BentoGrid'
import { GridOverlay } from '../shared/Effects'
import { TITAN_DATA } from '@/lib/utils'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const iconMap: Record<string, ReactNode> = {
  Cpu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  Gauge: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 3" />
    </svg>
  ),
  Wrench: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  Hammer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M15 12l-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 010-3L12 9m0 0l4 4m-4-4l5.5-5.5c.83-.83 2.17-.83 3 0 .83.83.83 2.17 0 3L15 12" />
    </svg>
  ),
  Zap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Wind: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
    </svg>
  ),
}

export default function Scene02_CapabilityMatrix() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  useEffect(() => {
    if (!sectionRef.current) return

    const cards = gridRef.current?.querySelectorAll('.capability-card')
    if (cards) {
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            once: true,
          },
        }
      )
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative min-h-screen py-24 md:py-32 bg-titan-void overflow-hidden"
    >
      <GridOverlay opacity={0.015} />

      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-titan-red/20 to-transparent" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        <div ref={headerRef} className="mb-16 md:mb-24">
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="w-8 h-[1px] bg-titan-red" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-titan-red/80 uppercase">
              02 / Capability Matrix
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h2 className="font-oswald text-5xl md:text-7xl lg:text-8xl font-bold uppercase text-titan-cream leading-[0.9]">
                Engineered
                <br />
                <span className="text-gradient-red">Systems</span>
              </h2>
            </motion.div>

            <motion.p
              className="font-inter text-titan-steel/60 text-sm md:text-base max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Six integrated disciplines. One unified engineering approach. 
              Every system calibrated to deliver precision performance.
            </motion.p>
          </div>
        </div>

        <div ref={gridRef}>
          <BentoGrid cols={3}>
            {TITAN_DATA.services.map((service, index) => (
              <div key={service.id} className="capability-card">
                <SpotlightCard
                  spotlightColor={
                    index === 0
                      ? 'rgba(200, 49, 42, 0.2)'
                      : index === 1
                      ? 'rgba(242, 193, 78, 0.15)'
                      : 'rgba(200, 49, 42, 0.12)'
                  }
                >
                  <BentoCard
                    span={
                      index === 0
                        ? 'wide'
                        : index === 3
                        ? 'wide'
                        : 'default'
                    }
                    className="h-full min-h-[280px] md:min-h-[320px]"
                  >
                    <div className="p-6 md:p-8 h-full flex flex-col justify-between relative group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-titan-red/5 rounded-full blur-3xl group-hover:bg-titan-red/10 transition-all duration-700" />

                      <div>
                        <div className="flex items-start justify-between mb-6">
                          <div className="text-titan-red/70 group-hover:text-titan-red transition-colors duration-300">
                            {iconMap[service.icon]}
                          </div>
                          <span className="font-mono text-[10px] tracking-wider text-titan-steel/30">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        <h3 className="font-oswald text-xl md:text-2xl font-semibold uppercase text-titan-cream mb-3 tracking-wide">
                          {service.title}
                        </h3>

                        <p className="font-inter text-sm text-titan-steel/50 leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-titan-red/10">
                        <div className="grid grid-cols-3 gap-3">
                          {Object.entries(service.metrics).map(([key, value]) => (
                            <div key={key}>
                              <div className="font-mono text-lg font-bold text-titan-cream">
                                {value}
                              </div>
                              <div className="font-mono text-[9px] tracking-wider text-titan-steel/40 uppercase">
                                {key}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-titan-red group-hover:w-full transition-all duration-700" />
                    </div>
                  </BentoCard>
                </SpotlightCard>
              </div>
            ))}
          </BentoGrid>
        </div>

        <motion.div
          className="mt-16 flex items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="flex-1 h-[1px] bg-titan-red/10" />
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-titan-red/40" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-titan-steel/30 uppercase">
              All systems operational
            </span>
          </div>
          <div className="flex-1 h-[1px] bg-titan-red/10" />
        </motion.div>
      </div>
    </section>
  )
}
