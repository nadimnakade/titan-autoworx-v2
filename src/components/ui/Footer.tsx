import { motion } from 'framer-motion'
import InfiniteMarquee, { MarqueeItem } from '../shared/InfiniteMarquee'

const marqueeTexts = [
  'ADVANCED DIAGNOSTICS',
  'PERFORMANCE ENGINEERING',
  'HERITAGE RESTORATION',
  'CUSTOM FABRICATION',
  'ELECTRICAL SYSTEMS',
  'AERODYNAMIC DESIGN',
  'TITAN AUTOWORX',
]

export default function Footer() {
  return (
    <footer className="relative bg-titan-void border-t border-titan-red/5">
      <InfiniteMarquee speed={40} className="py-8 border-y border-titan-red/5 overflow-hidden">
        {marqueeTexts.map((text, i) => (
          <MarqueeItem key={i}>
            <span className="font-oswald text-2xl md:text-4xl font-bold uppercase text-titan-red/10 tracking-wider">
              {text}
            </span>
            <span className="mx-8 text-titan-red/10">&bull;</span>
          </MarqueeItem>
        ))}
      </InfiniteMarquee>

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 relative">
                <div className="absolute inset-0 bg-titan-red rounded-lg rotate-45" />
                <span className="absolute inset-0 flex items-center justify-center font-oswald font-bold text-white text-lg z-10">
                  T
                </span>
              </div>
              <div>
                <div className="font-oswald font-semibold text-sm tracking-[0.2em] uppercase text-titan-cream">
                  Titan AutoWorx
                </div>
                <div className="font-mono text-[9px] tracking-[0.1em] text-titan-steel/40 uppercase">
                  Automotive Engineering Excellence
                </div>
              </div>
            </div>
            <p className="font-inter text-sm text-titan-steel/40 leading-relaxed max-w-sm">
              Precision engineering for the discerning automotive enthusiast. 
              Where craftsmanship meets cutting-edge technology.
            </p>
          </div>

          <div>
            <h4 className="font-oswald text-sm font-semibold uppercase tracking-wider text-titan-cream mb-4">
              Workshop
            </h4>
            <ul className="space-y-2">
              {['Diagnostics', 'Performance', 'Restoration', 'Fabrication', 'Electrical', 'Aero'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="font-mono text-[11px] text-titan-steel/40 hover:text-titan-red transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-oswald text-sm font-semibold uppercase tracking-wider text-titan-cream mb-4">
              Connect
            </h4>
            <ul className="space-y-2">
              {[
                'Instagram',
                'YouTube',
                'LinkedIn',
                'Workshop Tour',
                'Careers',
                'Press',
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-mono text-[11px] text-titan-steel/40 hover:text-titan-red transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-titan-red/5">
          <span className="font-mono text-[10px] text-titan-steel/20">
            &copy; 2024 Titan AutoWorx. All rights reserved.
          </span>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <span className="font-mono text-[10px] text-titan-steel/20">
              Privacy Policy
            </span>
            <span className="font-mono text-[10px] text-titan-steel/20">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
