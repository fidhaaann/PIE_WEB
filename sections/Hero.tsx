'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const HERO_WORDS = [
  { text: 'Build', className: 'font-display text-[var(--text-primary)]' },
  { text: 'brighter', className: 'editorial-italic text-[var(--accent)]' },
  { text: 'energy futures.', className: 'font-body font-medium text-[var(--text-primary)]' },
]

const TERMINAL_LINES = [
  '$ whoami',
  'IEEE PIE Kerala Section',
  '$ event --name v-fiesta-5.0',
  'Innovate · Inspire · Impact',
  '$ status --participants',
  '2000+ curious minds registered',
  '$ schedule --days',
  'June 14–15, 2026 | Kochi, Kerala',
  '$ prizes --pool',
  '₹1,25,000+ across competitions',
  '$ focus --mode',
  'Hackathons, quizzes, expos, workshops',
]

export default function Hero() {
  const blobRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [visibleLineCount, setVisibleLineCount] = useState(1)
  const [typingLine, setTypingLine] = useState(0)
  const [typingCharCount, setTypingCharCount] = useState(0)
  const shouldLightMotion = Boolean(prefersReducedMotion)

  const { scrollYProgress } = useScroll()
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 170])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -56])

  useEffect(() => {
    if (!shouldLightMotion) return
    const rafId = window.requestAnimationFrame(() => {
      setVisibleLineCount(TERMINAL_LINES.length)
      setTypingLine(TERMINAL_LINES.length - 1)
      setTypingCharCount(TERMINAL_LINES[TERMINAL_LINES.length - 1].length)
    })
    return () => window.cancelAnimationFrame(rafId)
  }, [shouldLightMotion])

  useEffect(() => {
    if (shouldLightMotion) return

    const currentLine = TERMINAL_LINES[typingLine] ?? ''
    const isTypingCommand = currentLine.startsWith('$')
    const delay = isTypingCommand ? 55 : 24

    if (typingCharCount < currentLine.length) {
      const timer = window.setTimeout(() => {
        setTypingCharCount((prev) => prev + 1)
      }, delay)

      return () => window.clearTimeout(timer)
    }

    if (visibleLineCount < TERMINAL_LINES.length) {
      const timer = window.setTimeout(() => {
        setVisibleLineCount((prev) => prev + 1)
        setTypingLine((prev) => prev + 1)
        setTypingCharCount(0)
      }, 650)

      return () => window.clearTimeout(timer)
    }
  }, [typingCharCount, typingLine, visibleLineCount, shouldLightMotion])

  const scrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-[100svh] md:min-h-screen flex items-center overflow-hidden pt-[calc(env(safe-area-inset-top)+5.5rem)] md:pt-0"
    >
      {/* Ambient blobs */}
      <motion.div
        ref={blobRef}
        style={{ y: shouldLightMotion ? 0 : blobY }}
        className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out"
      >
        <div className="absolute top-8 left-8 w-20 h-20 md:w-28 md:h-28 bg-[#facc15] border-[3px] border-[#0b0b0b] rotate-6" />
        <div className="absolute bottom-16 right-10 w-16 h-16 md:w-24 md:h-24 bg-[#60a5fa] border-[3px] border-[#0b0b0b] -rotate-12" />
        <div className="absolute top-1/2 right-[20%] w-12 h-12 md:w-16 md:h-16 bg-[#f472b6] border-[3px] border-[#0b0b0b] rotate-12" />
      </motion.div>

      <motion.div ref={contentRef} style={{ y: shouldLightMotion ? 0 : contentY }} className="relative z-10 w-full px-5 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-3 text-left">
            <motion.h1
              initial={{ opacity: 0, y: shouldLightMotion ? 12 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldLightMotion ? 0.35 : 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-baseline gap-x-3 gap-y-2 mb-4"
              style={{ fontSize: 'clamp(2rem, 6vw, 4.4rem)' }}
            >
              {HERO_WORDS.map((word, i) => (
                <motion.span
                  key={word.text}
                  initial={{ opacity: 0, y: shouldLightMotion ? 14 : 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: shouldLightMotion ? i * 0.04 : 0.2 + i * 0.12, duration: shouldLightMotion ? 0.35 : 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={word.className}
                >
                  {word.text}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: shouldLightMotion ? 10 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: shouldLightMotion ? 0.14 : 0.5, duration: shouldLightMotion ? 0.35 : 0.6 }}
              className="hero-display"
              style={{ fontSize: 'clamp(2.6rem, 11vw, 8rem)', lineHeight: 0.92 }}
            >
              V-FIESTA 5.0
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: shouldLightMotion ? 12 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: shouldLightMotion ? 0.2 : 0.75, duration: shouldLightMotion ? 0.35 : 0.6 }}
              className="font-body text-[var(--text-secondary)] mt-5 max-w-[36ch]"
              style={{ fontSize: 'clamp(0.95rem, 2vw, 1.2rem)' }}
            >
              Innovate · Inspire · Impact <span className="text-[var(--accent)]">June 14–15, 2026</span> · Kochi, Kerala
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: shouldLightMotion ? 14 : 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: shouldLightMotion ? 0.26 : 0.95, duration: shouldLightMotion ? 0.38 : 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 w-full max-w-md"
            >
              <a href="#register" className="btn-primary btn-register-dark text-base px-8 py-4 justify-center w-full sm:w-auto">
                Register Now
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#events" className="btn-ghost text-base px-8 py-4 justify-center w-full sm:w-auto">
                Explore Events
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: shouldLightMotion ? 18 : 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shouldLightMotion ? 0.32 : 1.1, duration: shouldLightMotion ? 0.42 : 0.7 }}
            className="lg:col-span-2"
          >
            <div className="glass accent-stroke rounded-[28px] p-4 md:p-6 w-full max-w-[560px] mx-auto lg:mx-0 overflow-hidden bg-[#fef08a]">
              <div className="rounded-[22px] border-[3px] border-[#0b0b0b] bg-[#ffffff] shadow-[6px_6px_0_#0b0b0b] overflow-hidden">
                <div className="flex items-center justify-between gap-3 px-4 md:px-5 py-3 border-b-[3px] border-[#0b0b0b] bg-[#dbeafe]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <p className="font-body text-[0.66rem] uppercase tracking-[0.18em] text-[#111827]">v-fiesta terminal</p>
                  <div className="w-16" />
                </div>

                <div className="px-4 md:px-5 py-4 md:py-5 min-h-[300px] md:min-h-[330px] font-mono text-sm md:text-[0.95rem] leading-relaxed text-[#111827] bg-[#ffffff]">
                  <div className="mb-4 flex items-center gap-2 text-[var(--accent)]">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_12px_rgba(227,239,38,0.5)]" />
                    <span className="font-body text-[0.65rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">Live event feed</span>
                  </div>

                  <div className="space-y-2">
                    {TERMINAL_LINES.slice(0, visibleLineCount).map((line, index) => {
                      const isActiveLine = index === typingLine
                      const text = isActiveLine ? line.slice(0, typingCharCount) : line
                      const isCommand = text.startsWith('$')
                      const isOutput = !isCommand && index > 0 && TERMINAL_LINES[index - 1].startsWith('$')

                      return (
                        <div key={line} className="flex gap-3">
                          <span className={`shrink-0 ${isOutput ? 'opacity-0' : 'text-[var(--accent)]'}`}>
                            {isCommand ? '$' : '>'}
                          </span>
                          <span className={`${isCommand ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'} whitespace-pre-wrap`}>
                            {isCommand ? text.slice(1) : text}
                            {isActiveLine ? <span className="terminal-cursor" /> : null}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                    system ready
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: shouldLightMotion ? 0.4 : 2, duration: shouldLightMotion ? 0.45 : 0.8 }}
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs font-body tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={shouldLightMotion ? { y: [0, 5, 0] } : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: shouldLightMotion ? 1.2 : 1.5 }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  )
}
