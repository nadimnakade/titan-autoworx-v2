import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsComplete(true)
            setTimeout(onComplete, 800)
          }, 400)
          return 100
        }
        return prev + Math.random() * 3 + 1
      })
    }, 30)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[100] bg-titan-void flex flex-col items-center justify-center"
          exit={{
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0 grid-bg opacity-30" />

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              className="w-20 h-20 mb-8 relative"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 bg-titan-red rounded-xl rotate-45" />
              <span className="absolute inset-0 flex items-center justify-center font-oswald font-bold text-white text-3xl">
                T
              </span>
            </motion.div>

            <motion.div
              className="font-oswald text-sm tracking-[0.4em] uppercase text-titan-steel/60 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Titan AutoWorx
            </motion.div>

            <div className="w-48 h-[1px] bg-titan-slate/30 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-titan-red"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>

            <motion.div
              className="mt-4 font-mono text-[10px] tracking-[0.3em] text-titan-steel/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.div>

            <motion.div
              className="mt-12 font-mono text-[9px] tracking-[0.2em] text-titan-red/40 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Initializing Systems
            </motion.div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 rounded-full bg-titan-red/30"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
