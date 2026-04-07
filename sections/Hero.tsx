'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Zap } from 'lucide-react'

const CHARS = 'V-FIESTA 5.0'.split('')

export default function Hero() {
  const blobRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!blobRef.current) return
      const x = (e.clientX / window.innerWidth - 0.5) * 40
      const y = (e.clientY / window.innerHeight - 0.5) * 40
      blobRef.current.style.transform = `translate(${x}px, ${y}px)`
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  const scrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Ambient blobs */}
      <div
        ref={blobRef}
        className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out"
      >
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[var(--accent)] opacity-[0.06] blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-forest-500 opacity-[0.12] blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#076653] opacity-[0.08] blur-[140px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-8"
      >
        <div className="flex items-center gap-2 tag">
          <Zap size={12} />
          <span>IEEE Power &amp; Energy Society · Kerala Section</span>
        </div>
      </motion.div>

      {/* Main title – character stagger */}
      <div className="relative z-10 text-center px-5">
        <div
          className="font-display font-extrabold leading-none tracking-tight"
          style={{ fontSize: 'clamp(3.5rem, 14vw, 11rem)' }}
        >
          {CHARS.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60, rotateX: -40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: 0.3 + i * 0.05,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`inline-block ${char === ' ' ? 'w-6 md:w-12' : ''} ${
                char === '5' || char === '.' || char === '0'
                  ? 'text-[var(--accent)]'
                  : 'text-[var(--text-primary)]'
              }`}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="font-body text-[var(--text-secondary)] mt-6"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)' }}
        >
          Innovate · Inspire · Impact&nbsp;&nbsp;|&nbsp;&nbsp;
          <span className="text-[var(--accent)]">June 14–15, 2026</span>
          &nbsp;·&nbsp;Kochi, Kerala
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-wrap gap-4 justify-center mt-10"
        >
          <a href="#register" className="btn-primary text-base px-8 py-4">
            Register Now
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#events" className="btn-ghost text-base px-8 py-4">
            Explore Events
          </a>
        </motion.div>
      </div>

      {/* Floating stats */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.7 }}
        className="relative z-10 mt-16 flex flex-wrap justify-center gap-6 px-5"
      >
        {[
          { value: '2000+', label: 'Participants' },
          { value: '25+',   label: 'Events' },
          { value: '50+',   label: 'Speakers' },
          { value: '5th',   label: 'Edition' },
        ].map((stat) => (
          <div key={stat.label} className="glass px-6 py-4 rounded-2xl text-center min-w-[110px]">
            <div className="font-display font-extrabold text-2xl text-[var(--accent)]">{stat.value}</div>
            <div className="font-body text-xs text-[var(--text-muted)] mt-0.5">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs font-body tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  )
}
