import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GridOverlay } from '../shared/Effects'
import { TITAN_DATA } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const connections = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 4 },
  { from: 3, to: 5 },
  { from: 4, to: 5 },
  { from: 1, to: 2 },
  { from: 3, to: 4 },
]

const nodePositions = [
  { x: 15, y: 30 },
  { x: 42, y: 15 },
  { x: 42, y: 50 },
  { x: 70, y: 25 },
  { x: 70, y: 55 },
  { x: 88, y: 40 },
]

export default function Scene03_WorkshopEcosystem() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const [activeNode, setActiveNode] = useState<number | null>(null)

  useEffect(() => {
    if (!svgRef.current || !isInView) return

    const lines = svgRef.current.querySelectorAll('.connection-line')
    const nodes = svgRef.current.querySelectorAll('.service-node')

    gsap.fromTo(
      lines,
      { strokeDashoffset: 200, opacity: 0 },
      {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.3,
      }
    )

    gsap.fromTo(
      nodes,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'back.out(1.7)',
        delay: 0.5,
      }
    )
  }, [isInView])

  return (
    <section
      ref={sectionRef}
      id="workshop"
      className="relative min-h-screen py-24 md:py-32 bg-titan-deep overflow-hidden"
    >
      <GridOverlay opacity={0.02} />

      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-titan-gold/20 to-transparent" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="w-8 h-[1px] bg-titan-gold" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-titan-gold/80 uppercase">
            03 / Workshop Ecosystem
          </span>
        </motion.div>

        <motion.h2
          className="font-oswald text-5xl md:text-7xl lg:text-8xl font-bold uppercase text-titan-cream leading-[0.9] mb-4"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          The Workshop
          <br />
          <span className="text-gradient-gold">Ecosystem</span>
        </motion.h2>

        <motion.p
          className="font-inter text-titan-steel/50 text-sm max-w-lg mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          Every system is interconnected. Hover over nodes to explore how our capabilities integrate.
        </motion.p>

        <motion.div
          className="relative w-full aspect-[2/1] min-h-[400px]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 1 }}
        >
          <svg
            ref={svgRef}
            viewBox="0 0 100 80"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {connections.map((conn, i) => {
              const from = nodePositions[conn.from]
              const to = nodePositions[conn.to]
              return (
                <line
                  key={i}
                  className="connection-line"
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="rgba(200, 49, 42, 0.15)"
                  strokeWidth="0.15"
                  strokeDasharray="2 2"
                  strokeDashoffset="200"
                />
              )
            })}

            {connections.map((conn, i) => {
              const from = nodePositions[conn.from]
              const to = nodePositions[conn.to]
              const midX = (from.x + to.x) / 2
              const midY = (from.y + to.y) / 2
              return (
                <circle
                  key={`flow-${i}`}
                  cx={midX}
                  cy={midY}
                  r="0.3"
                  fill="#C8312A"
                  opacity="0.3"
                >
                  <animate
                    attributeName="opacity"
                    values="0.1;0.6;0.1"
                    dur={`${2 + i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              )
            })}

            {nodePositions.map((pos, i) => (
              <g
                key={i}
                className="service-node"
                transform={`translate(${pos.x}, ${pos.y})`}
                onMouseEnter={() => setActiveNode(i)}
                onMouseLeave={() => setActiveNode(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  r={activeNode === i ? '4' : '3'}
                  fill="rgba(19, 24, 31, 0.9)"
                  stroke={activeNode === i ? '#C8312A' : 'rgba(200, 49, 42, 0.3)'}
                  strokeWidth="0.15"
                  className="transition-all duration-300"
                />
                <circle
                  r="1"
                  fill={activeNode === i ? '#C8312A' : 'rgba(200, 49, 42, 0.5)'}
                  className="transition-all duration-300"
                />
                {activeNode === i && (
                  <>
                    <circle r="5" fill="none" stroke="rgba(200, 49, 42, 0.2)" strokeWidth="0.1">
                      <animate
                        attributeName="r"
                        values="4;6;4"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.3;0;0.3"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </>
                )}

                <text
                  y="-5"
                  textAnchor="middle"
                  className="font-oswald"
                  fill={activeNode === i ? '#E8E5DD' : '#AAB2BD'}
                  fontSize="2"
                  fontWeight="600"
                  letterSpacing="0.1"
                >
                  {TITAN_DATA.services[i]?.title.toUpperCase()}
                </text>
              </g>
            ))}
          </svg>

          <div className="absolute inset-0 pointer-events-none">
            {activeNode !== null && (
              <motion.div
                className="absolute bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:max-w-sm glass-panel rounded-xl p-6 pointer-events-auto"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-titan-red animate-pulse" />
                  <span className="font-mono text-[10px] tracking-wider text-titan-red uppercase">
                    System Active
                  </span>
                </div>
                <h4 className="font-oswald text-lg font-semibold text-titan-cream uppercase mb-1">
                  {TITAN_DATA.services[activeNode]?.title}
                </h4>
                <p className="font-inter text-xs text-titan-steel/60 mb-3">
                  {TITAN_DATA.services[activeNode]?.description}
                </p>
                <div className="flex gap-4">
                  {Object.entries(TITAN_DATA.services[activeNode]?.metrics || {}).map(
                    ([key, value]) => (
                      <div key={key}>
                        <span className="font-mono text-sm font-bold text-titan-gold">
                          {value}
                        </span>
                        <span className="font-mono text-[8px] text-titan-steel/40 ml-1 uppercase">
                          {key}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          {TITAN_DATA.services.map((service, i) => (
            <button
              key={service.id}
              className={`px-4 py-2 font-mono text-[10px] tracking-wider uppercase border rounded-full transition-all duration-300 ${
                activeNode === i
                  ? 'border-titan-red text-titan-red bg-titan-red/10'
                  : 'border-titan-steel/10 text-titan-steel/40 hover:border-titan-red/30 hover:text-titan-cream'
              }`}
              onMouseEnter={() => setActiveNode(i)}
              onMouseLeave={() => setActiveNode(null)}
            >
              {service.title}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
