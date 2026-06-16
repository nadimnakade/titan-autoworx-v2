import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GridOverlay, TelemetryRing } from '../shared/Effects'
import { TITAN_DATA } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

export default function Scene05_EngineeringProcess() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (!scrollContainerRef.current || !sectionRef.current || !progressRef.current) return

    const container = scrollContainerRef.current
    const totalScroll = container.scrollWidth - window.innerWidth

    const scrollTween = gsap.to(container, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${totalScroll}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress
          const stepIndex = Math.min(
            Math.floor(progress * TITAN_DATA.process.length),
            TITAN_DATA.process.length - 1
          )
          setActiveStep(stepIndex)
        },
      },
    })

    return () => {
      scrollTween.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative h-screen bg-titan-void overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-titan-void via-titan-carbon/30 to-titan-void" />
      <GridOverlay opacity={0.02} />

      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-titan-red/30 to-transparent" />

      <div className="absolute top-8 left-6 md:left-10 lg:left-16 z-20">
        <motion.div
          className="flex items-center gap-4 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
        >
          <div className="w-8 h-[1px] bg-titan-red" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-titan-red/80 uppercase">
            05 / Engineering Process
          </span>
        </motion.div>
        <motion.h2
          className="font-oswald text-3xl md:text-5xl font-bold uppercase text-titan-cream"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          The Process
        </motion.h2>
      </div>

      <div ref={progressRef} className="absolute top-1/2 right-6 md:right-10 lg:right-16 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-3">
        {TITAN_DATA.process.map((_, i) => (
          <div key={i} className="relative">
            <div
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                i <= activeStep
                  ? 'bg-titan-red scale-125'
                  : 'bg-titan-steel/20 scale-100'
              }`}
            />
            {i === activeStep && (
              <motion.div
                className="absolute inset-0 rounded-full border border-titan-red/50"
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>
        ))}
        <div className="w-[1px] h-16 bg-gradient-to-b from-titan-red/20 to-transparent mt-2" />
        <span className="font-mono text-[9px] text-titan-steel/30">
          {String(activeStep + 1).padStart(2, '0')}/{String(TITAN_DATA.process.length).padStart(2, '0')}
        </span>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex h-full items-stretch pl-6 md:pl-10 lg:pl-16"
      >
        {TITAN_DATA.process.map((step, index) => (
          <div
            key={step.step}
            className="flex-shrink-0 w-[90vw] md:w-[70vw] lg:w-[50vw] h-full flex items-center"
          >
            <div className="relative w-full h-[70vh] flex flex-col justify-center">
              <div className="relative p-8 md:p-12 rounded-2xl bg-titan-deep/30 backdrop-blur-sm border border-titan-red/5 h-full flex flex-col justify-between overflow-hidden group hover:border-titan-red/15 transition-all duration-700">
                <div className="absolute top-0 right-0 w-64 h-64 bg-titan-red/5 rounded-full blur-[100px] group-hover:bg-titan-red/10 transition-all duration-700" />

                <div className="relative">
                  <div className="flex items-start justify-between mb-8">
                    <div className="relative">
                      <span className="font-mono text-[120px] md:text-[180px] font-bold text-titan-red/5 leading-none absolute -top-16 -left-4">
                        {step.step}
                      </span>
                      <span className="relative font-mono text-sm tracking-wider text-titan-red uppercase">
                        Step {step.step}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-titan-gold/50" />
                      <span className="font-mono text-[10px] text-titan-gold/70">
                        {step.duration}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-titan-cream leading-[0.9] mb-6">
                    {step.title}
                  </h3>

                  <p className="font-inter text-sm md:text-base text-titan-steel/50 leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>

                <div className="relative">
                  <div className="flex items-center gap-4">
                    {Array.from({ length: TITAN_DATA.process.length }).map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 h-[2px] rounded-full transition-all duration-500 ${
                          i <= index ? 'bg-titan-red' : 'bg-titan-steel/10'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="font-mono text-[9px] tracking-wider text-titan-steel/30 uppercase">
                      Phase {step.step} of {String(TITAN_DATA.process.length).padStart(2, '0')}
                    </span>
                    <div className="flex items-center gap-2">
                      <TelemetryRing size={20} speed={3} color="rgba(200, 49, 42, 0.3)" />
                      <span className="font-mono text-[9px] text-titan-red/50">
                        {index <= activeStep ? 'ACTIVE' : 'PENDING'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-titan-red to-transparent group-hover:w-full transition-all duration-1000" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
