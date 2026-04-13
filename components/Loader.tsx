'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const letters = ['L', 'O', 'A', 'D', 'I', 'N', 'G']
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!loading) return

    const stepTimer = window.setInterval(() => {
      setActiveIndex((prev) => Math.min(letters.length - 1, prev + 1))
    }, 320)

    return () => window.clearInterval(stepTimer)
  }, [letters.length, loading])

  useEffect(() => {
    if (!loading) return
    if (activeIndex !== letters.length - 1) return

    const finishTimer = window.setTimeout(() => {
      setLoading(false)
    }, 520)

    return () => window.clearTimeout(finishTimer)
  }, [activeIndex, letters.length, loading])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#f6efdb]"
        >
          {/* Pseudo-brutalism backdrop */}
          <div className="pointer-events-none absolute left-[-5%] top-[8%] h-28 w-28 rotate-12 border-4 border-[#0b0b0b] bg-[#E3EF26] shadow-[8px_8px_0_#0b0b0b]" />
          <div className="pointer-events-none absolute right-[7%] top-[18%] h-20 w-36 -rotate-6 border-4 border-[#0b0b0b] bg-[#3fad92] shadow-[8px_8px_0_#0b0b0b]" />
          <div className="pointer-events-none absolute bottom-[11%] left-[12%] h-24 w-24 -rotate-12 border-4 border-[#0b0b0b] bg-[#f97316] shadow-[8px_8px_0_#0b0b0b]" />
          <div className="pointer-events-none absolute bottom-[14%] right-[10%] h-16 w-44 rotate-3 border-4 border-[#0b0b0b] bg-[#60a5fa] shadow-[8px_8px_0_#0b0b0b]" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, rgba(11,11,11,0.08) 0px, rgba(11,11,11,0.08) 2px, transparent 2px, transparent 16px)',
              backgroundSize: '20px 20px',
            }}
          />

          <div className="relative z-10 rounded-[20px] border-[5px] border-[#0b0b0b] bg-[#fff7e8] px-6 py-8 shadow-[12px_12px_0_#0b0b0b] md:px-10">
            <div className="relative mx-auto w-fit pt-11">
              <motion.div
                className="absolute left-0 top-0 h-5 w-5 border-[3px] border-[#0b0b0b] bg-[#E3EF26] shadow-[4px_4px_0_#0b0b0b]"
                animate={{
                  x: activeIndex * 68,
                  y: [0, -20, 0],
                }}
                transition={{
                  x: { duration: 0.26, ease: [0.25, 0.9, 0.35, 1] },
                  y: { duration: 0.26, ease: [0.3, 0.8, 0.4, 1] },
                }}
              />

              <div className="flex items-end gap-3">
                {letters.map((letter, index) => (
                  <motion.span
                    key={`${letter}-${index}`}
                    className="inline-flex h-16 w-14 select-none items-center justify-center border-[3px] border-[#0b0b0b] font-body text-5xl font-black uppercase shadow-[4px_4px_0_#0b0b0b] md:h-[74px] md:w-[58px] md:text-6xl"
                    animate={{
                      backgroundColor:
                        index < activeIndex
                          ? '#3fad92'
                          : index === activeIndex
                            ? '#E3EF26'
                            : '#ffffff',
                      color: index === activeIndex ? '#0b0b0b' : '#1f2937',
                      y: index === activeIndex ? -4 : 0,
                    }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </div>

            <motion.p
              className="mt-8 text-center font-body text-xs font-medium uppercase tracking-[0.22em] text-[#1f2937]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.35 }}
            >
              preparing your experience
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
