import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Scenes', href: '#scenes' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Workshop', href: '#workshop' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Process', href: '#process' },
  { label: 'Connect', href: '#connect' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-titan-void/80 backdrop-blur-xl border-b border-titan-red/10'
            : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 2.5 }}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-20">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 relative">
                <div className="absolute inset-0 bg-titan-red rounded-lg rotate-45 group-hover:rotate-[225deg] transition-transform duration-500" />
                <span className="absolute inset-0 flex items-center justify-center font-oswald font-bold text-white text-lg z-10">
                  T
                </span>
              </div>
              <div className="hidden sm:block">
                <div className="font-oswald font-semibold text-sm tracking-[0.2em] uppercase text-titan-cream">
                  Titan
                </div>
                <div className="font-mono text-[10px] tracking-[0.1em] text-titan-steel/60 uppercase">
                  AutoWorx
                </div>
              </div>
            </a>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 font-mono text-[11px] tracking-[0.15em] uppercase transition-all duration-300 relative group',
                    activeSection === link.href
                      ? 'text-titan-red'
                      : 'text-titan-steel/70 hover:text-titan-cream'
                  )}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-titan-red group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-titan-red/20 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-titan-red animate-pulse" />
                <span className="font-mono text-[10px] tracking-wider text-titan-steel/60 uppercase">
                  Available
                </span>
              </div>

              <button
                className="lg:hidden flex flex-col gap-1.5 p-2"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
              >
                <motion.span
                  className="block w-6 h-[1px] bg-titan-cream"
                  animate={isMobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                  className="block w-4 h-[1px] bg-titan-red ml-auto"
                  animate={isMobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                />
                <motion.span
                  className="block w-6 h-[1px] bg-titan-cream"
                  animate={isMobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-titan-void/98 backdrop-blur-xl flex items-center justify-center lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="font-oswald text-4xl font-light tracking-wider text-titan-cream hover:text-titan-red transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
