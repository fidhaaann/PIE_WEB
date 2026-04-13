'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Show notebook intro briefly before revealing the site
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#f4ecd9]"
        >
          {/* Notebook ruled lines */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, rgba(46,104,201,0.18) 0px, rgba(46,104,201,0.18) 1px, transparent 1px, transparent 42px)',
              backgroundSize: '100% 43px',
            }}
          />

          {/* Left notebook margin line */}
          <div className="pointer-events-none absolute bottom-0 left-[12%] top-0 w-[2px] bg-[#e35b5b]/70" />

          {/* Paper grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(30,30,30,0.15) 1px, transparent 0)',
              backgroundSize: '16px 16px',
            }}
          />

          <div className="relative z-10 w-[min(88vw,720px)]">
            <svg viewBox="0 0 400 260" className="h-auto w-full" aria-label="loading handwritten animation">
              <motion.text
                x="200"
                y="168"
                fill="#111827"
                fontSize="84"
                fontWeight="400"
                fontFamily="'Caveat', 'Comic Sans MS', cursive"
                fontStyle="normal"
                textAnchor="middle"
                style={{ letterSpacing: '0.02em' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
              >
                {['l', 'o', 'a', 'd', 'i', 'n', 'g'].map((letter, index) => (
                  <motion.tspan
                    key={letter}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.18, duration: 0.22, ease: 'easeOut' }}
                  >
                    {letter}
                  </motion.tspan>
                ))}
              </motion.text>

              <motion.path
                d="M34 154 C44 68 356 70 366 154 C376 238 44 242 34 154 Z"
                fill="none"
                stroke="#d62828"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0.95 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 1.75, duration: 0.95, ease: [0.2, 0.75, 0.3, 1] }}
              />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
