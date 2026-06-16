import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import SpotlightCard from '../shared/SpotlightCard'
import MagneticButton from '../shared/MagneticButton'
import { GridOverlay, ParticleField } from '../shared/Effects'
import { cn } from '@/lib/utils'

const contactModules = [
  {
    id: 'save',
    title: 'Save Contact',
    subtitle: 'Quick Connect',
    description: 'Save our details for instant access. One tap to connect anytime.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
      </svg>
    ),
    action: 'Save Now',
    fields: ['Name', 'Phone', 'Email'],
  },
  {
    id: 'book',
    title: 'Book Service',
    subtitle: 'Schedule',
    description: 'Book your next service appointment. Select your vehicle, service, and preferred time.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    action: 'Book Now',
    fields: ['Vehicle', 'Service', 'Date', 'Time'],
  },
  {
    id: 'follow',
    title: 'Follow Builds',
    subtitle: 'Updates',
    description: 'Get real-time updates on active projects. Photos, videos, and progress reports.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    action: 'Follow',
    fields: ['Build Type', 'Email'],
  },
  {
    id: 'offers',
    title: 'Current Offers',
    subtitle: 'Deals',
    description: 'Exclusive member pricing on performance packages and seasonal services.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    action: 'View Offers',
    fields: ['Interest'],
  },
]

export default function Scene06_TheTitanNetwork() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [activeModule, setActiveModule] = useState<string | null>(null)

  return (
    <section
      ref={sectionRef}
      id="connect"
      className="relative min-h-screen py-24 md:py-32 bg-titan-void overflow-hidden"
    >
      <GridOverlay opacity={0.02} />
      <ParticleField count={30} color="#C8312A" />

      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-titan-red/20 to-transparent" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-titan-red/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
        >
          <div className="w-8 h-[1px] bg-titan-red" />
          <span className="font-mono text-[10px] tracking-[0.3em] text-titan-red/80 uppercase">
            06 / The Titan Network
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="font-oswald text-5xl md:text-7xl lg:text-8xl font-bold uppercase text-titan-cream leading-[0.9]">
              Command
              <br />
              <span className="text-gradient-red">Center</span>
            </h2>
            <p className="font-inter text-titan-steel/50 text-sm mt-6 max-w-md leading-relaxed">
              Your mission control. Connect with Titan through any channel. 
              Choose your vector.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <div className="glass-panel rounded-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-titan-red animate-pulse" />
                <span className="font-mono text-[10px] tracking-wider text-titan-red/70 uppercase">
                  Live Status
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-mono text-[9px] text-titan-steel/30 uppercase block mb-1">
                    Response Time
                  </span>
                  <span className="font-oswald text-2xl font-bold text-titan-cream">{'< 2h'}</span>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-titan-steel/30 uppercase block mb-1">
                    Active Projects
                  </span>
                  <span className="font-oswald text-2xl font-bold text-titan-gold">12</span>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-titan-steel/30 uppercase block mb-1">
                    Queue Status
                  </span>
                  <span className="font-oswald text-lg font-bold text-titan-red-light">Accepting</span>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-titan-steel/30 uppercase block mb-1">
                    Next Available
                  </span>
                  <span className="font-oswald text-lg font-bold text-titan-cream">This Week</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {contactModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <SpotlightCard
                spotlightColor={
                  index === 0
                    ? 'rgba(200, 49, 42, 0.2)'
                    : index === 1
                    ? 'rgba(242, 193, 78, 0.15)'
                    : 'rgba(200, 49, 42, 0.1)'
                }
              >
                <div
                  className={cn(
                    'relative p-6 md:p-8 rounded-2xl bg-titan-deep/40 backdrop-blur-xl border transition-all duration-500 cursor-pointer min-h-[280px] flex flex-col',
                    activeModule === module.id
                      ? 'border-titan-red/30'
                      : 'border-titan-red/5 hover:border-titan-red/15'
                  )}
                  onClick={() =>
                    setActiveModule(activeModule === module.id ? null : module.id)
                  }
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-titan-red/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative flex-1">
                    <div className="flex items-start justify-between mb-6">
                      <div className="text-titan-red/60">{module.icon}</div>
                      <span className="font-mono text-[10px] text-titan-steel/20">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <span className="font-mono text-[9px] tracking-wider text-titan-gold/60 uppercase block mb-2">
                      {module.subtitle}
                    </span>

                    <h3 className="font-oswald text-2xl md:text-3xl font-bold uppercase text-titan-cream mb-3">
                      {module.title}
                    </h3>

                    <p className="font-inter text-sm text-titan-steel/40 leading-relaxed">
                      {module.description}
                    </p>
                  </div>

                  <div className="relative mt-6">
                    <AnimatePresence>
                      {activeModule === module.id && (
                        <motion.div
                          className="space-y-3 mb-6"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {module.fields.map((field) => (
                            <div key={field}>
                              <label className="font-mono text-[9px] tracking-wider text-titan-steel/30 uppercase block mb-1">
                                {field}
                              </label>
                              <div className="w-full h-10 bg-titan-void/50 border border-titan-red/10 rounded-lg px-4 flex items-center">
                                <span className="font-inter text-xs text-titan-steel/30">
                                  Enter {field.toLowerCase()}...
                                </span>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <MagneticButton
                      variant={activeModule === module.id ? 'primary' : 'secondary'}
                      size="sm"
                      className="w-full"
                      strength={0.15}
                    >
                      {module.action}
                    </MagneticButton>
                  </div>

                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-titan-red group-hover:w-full transition-all duration-700" />
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-[1px] bg-titan-red/20" />
            <div className="w-2 h-2 rotate-45 border border-titan-red/30" />
            <div className="w-16 h-[1px] bg-titan-red/20" />
          </div>

          <p className="font-mono text-[10px] tracking-[0.3em] text-titan-steel/30 uppercase">
            Titan AutoWorx &mdash; Built to handle anything on four wheels
          </p>
        </motion.div>
      </div>
    </section>
  )
}
