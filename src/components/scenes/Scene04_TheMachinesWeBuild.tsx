import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GridOverlay } from '../shared/Effects'
import { TITAN_DATA } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

export default function Scene04_TheMachinesWeBuild() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  useEffect(() => {
    if (!scrollContainerRef.current || !sectionRef.current) return

    const container = scrollContainerRef.current
    const items = container.querySelectorAll('.showcase-item')
    const totalScroll = container.scrollWidth - window.innerWidth

    gsap.to(container, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${totalScroll}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })

    items.forEach((item) => {
      gsap.fromTo(
        item.querySelector('.showcase-content'),
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: item,
            containerAnimation: gsap.getById?.('showcaseScroll'),
            start: 'left 80%',
            end: 'left 40%',
            scrub: true,
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative h-screen bg-titan-void overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-titan-void via-titan-deep/50 to-titan-void" />
      <GridOverlay opacity={0.01} />

      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-titan-red/20 to-transparent" />

      <div className="absolute top-8 left-6 md:left-10 lg:left-16 z-20">
        <motion.div
          className="flex items-center gap-4 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
        >
          <div className="w-8 h-[1px] bg-titan-red" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-titan-red/80 uppercase">
            04 / The Machines We Build
          </span>
        </motion.div>
        <motion.h2
          className="font-oswald text-3xl md:text-5xl font-bold uppercase text-titan-cream"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
        >
          Machines
          <span className="text-gradient-red ml-3">We Build</span>
        </motion.h2>
      </div>

      <div className="absolute top-8 right-6 md:right-10 lg:right-16 z-20">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-titan-steel/30">
            {TITAN_DATA.showcase.length} Projects
          </span>
          <div className="w-8 h-[1px] bg-titan-red/20" />
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex h-full items-center gap-8 md:gap-16 pl-6 md:pl-10 lg:pl-16 pr-[30vw]"
      >
        {TITAN_DATA.showcase.map((item, index) => (
          <div
            key={item.id}
            className="showcase-item flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[50vw] h-[70vh] relative group"
          >
            <div className="showcase-content relative h-full">
              <div className="absolute inset-0 bg-titan-deep/40 backdrop-blur-sm rounded-2xl border border-titan-red/5 overflow-hidden group-hover:border-titan-red/15 transition-all duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-titan-red/5 via-transparent to-titan-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="absolute top-0 right-0 w-48 h-48 bg-titan-red/10 rounded-full blur-[80px] group-hover:bg-titan-red/20 transition-all duration-700" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-titan-gold/10 rounded-full blur-[60px] group-hover:bg-titan-gold/15 transition-all duration-700" />

                <div className="relative h-full flex flex-col justify-between p-6 md:p-10">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-[10px] tracking-wider text-titan-red/60 uppercase block mb-2">
                        {item.category} / {item.year}
                      </span>
                      <h3 className="font-oswald text-4xl md:text-6xl lg:text-7xl font-bold uppercase text-titan-cream leading-[0.85]">
                        {item.title}
                      </h3>
                      <p className="font-oswald text-lg md:text-xl text-titan-steel/40 mt-2 italic">
                        {item.subtitle}
                      </p>
                    </div>
                    <span className="font-mono text-[10px] text-titan-steel/20">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="font-inter text-sm text-titan-steel/50 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-end">
                      <div className="text-right">
                        <span className="font-mono text-[10px] text-titan-steel/30 uppercase block">
                          Power Output
                        </span>
                        <span className="font-oswald text-3xl md:text-4xl font-bold text-titan-red">
                          {item.power}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <div className="flex-1 h-[1px] bg-titan-red/10" />
                    <div className="w-2 h-2 rotate-45 border border-titan-red/30" />
                    <div className="flex-1 h-[1px] bg-titan-red/10" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-titan-red to-titan-gold group-hover:w-full transition-all duration-1000" />
              </div>

              <div className="absolute -inset-2 rounded-3xl border border-titan-red/0 group-hover:border-titan-red/5 transition-all duration-700 pointer-events-none" />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <div className="w-32 h-[1px] bg-titan-red/20" />
        <span className="font-mono text-[9px] tracking-[0.2em] text-titan-steel/30 uppercase">
          Scroll horizontally
        </span>
        <div className="w-32 h-[1px] bg-titan-red/20" />
      </div>
    </section>
  )
}
