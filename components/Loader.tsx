'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 2.4s global spin pre-loader before revealing the site natively
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#03120f]" // Deep carbon bg
        >
          {/* Subtle noise overlay */}
          <div 
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, rgba(255,255,255,0.2) 1px, transparent 0)', backgroundSize: '24px 24px' }} 
          />

          <div className="relative flex items-center justify-center w-40 h-40">
            {/* The structural dark tracks */}
            {[...Array(4)].map((_, i) => (
              <svg key={`track-${i}`} className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={16 + i * 11} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" />
              </svg>
            ))}

            {/* The vividly coloring spirals */}
            {[...Array(4)].map((_, i) => (
              <motion.svg
                key={`spiral-${i}`}
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                initial={{ rotate: -90 }} // Start top
                animate={{ rotate: 270 + (i * 90) }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2 + i * 0.4,
                  ease: "easeInOut",
                  repeatType: "mirror"
                }}
              >
                <motion.circle
                  cx="50"
                  cy="50"
                  r={16 + i * 11}
                  fill="none"
                  stroke={i === 3 ? 'var(--accent)' : i === 2 ? '#3fad92' : i === 1 ? '#076653' : '#E3EF26'}
                  strokeWidth={i === 3 ? 3 : 2}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.2 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 1.8 + i * 0.2,
                    ease: "circOut",
                  }}
                  style={{ transformOrigin: "center" }}
                />
              </motion.svg>
            ))}

            {/* Pulsing center core */}
            <motion.div 
               initial={{ scale: 0, opacity: 0 }}
               animate={{ scale: [0, 1.2, 0.8, 1], opacity: [0, 1, 0.7, 1] }}
               transition={{ delay: 0.6, duration: 1.4 }}
               className="absolute w-4 h-4 rounded-full bg-[var(--accent)] shadow-[0_0_24px_var(--accent)]" 
            />
          </div>

          {/* Typography Loading State */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-10 flex flex-col items-center gap-3 relative z-10"
          >
            <p className="font-mono tracking-[0.3em] text-[var(--accent)] text-xs md:text-sm uppercase font-semibold">
              Booting V-Fiesta
            </p>
            <div className="w-48 h-[2px] bg-white/5 relative overflow-hidden rounded-full">
               <motion.div 
                 initial={{ x: '-100%' }}
                 animate={{ x: '100%' }}
                 transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                 className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
               />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
