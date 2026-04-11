'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import AnimateIn from '@/components/AnimateIn'

const speakers = [
  {
    id: 1,
    name: 'Dr. Priya Krishnan',
    role: 'Professor, IIT Bombay',
    topic: 'Smart Grid Technologies',
    bio: 'Dr. Priya Krishnan is a leading researcher in smart grid systems and power electronics at IIT Bombay with over 20 years of experience. She has authored 150+ research papers and serves on the IEEE Power & Energy Society Technical Committee.',
    img: 'https://ui-avatars.com/api/?name=Priya+Krishnan&background=076653&color=E3EF26&size=256&bold=true',
    linkedin: '#',
    twitter: '#',
    tag: 'Keynote',
  },
  {
    id: 2,
    name: 'Mr. Rahul Menon',
    role: 'CTO, Greenko Group',
    topic: 'Renewable Energy Storage',
    bio: 'Rahul Menon heads technology at Greenko, India\'s largest renewable energy company. He has led over 3 GW of wind and solar projects across 8 states and is passionate about making India carbon-neutral by 2050.',
    img: 'https://ui-avatars.com/api/?name=Rahul+Menon&background=0C342C&color=E3EF26&size=256&bold=true',
    linkedin: '#',
    twitter: '#',
    tag: 'Industry',
  },
  {
    id: 3,
    name: 'Dr. Anita Varma',
    role: 'Scientist, ISRO',
    topic: 'Power Systems in Space',
    bio: 'Dr. Anita Varma is a senior scientist at ISRO\'s Space Applications Centre, specialising in spacecraft power systems. She was part of the Chandrayaan-3 mission team responsible for lunar power management.',
    img: 'https://ui-avatars.com/api/?name=Anita+Varma&background=076653&color=E3EF26&size=256&bold=true',
    linkedin: '#',
    twitter: '#',
    tag: 'Keynote',
  },
  {
    id: 4,
    name: 'Mr. Kevin Thomas',
    role: 'Founder, VoltEdge Labs',
    topic: 'EV Charging Infrastructure',
    bio: 'Kevin Thomas founded VoltEdge Labs after graduating from CUSAT and has built 200+ EV charging stations across Kerala & Tamil Nadu. He is a Forbes 30 Under 30 Asia awardee and active IEEE volunteer.',
    img: 'https://ui-avatars.com/api/?name=Kevin+Thomas&background=0C342C&color=E3EF26&size=256&bold=true',
    linkedin: '#',
    twitter: '#',
    tag: 'Startup',
  },
  {
    id: 5,
    name: 'Dr. Sujith Nair',
    role: 'Assoc. Professor, NIT Calicut',
    topic: 'Power Electronics & Drives',
    bio: 'Dr. Sujith Nair is the recipient of the INAE Young Engineer Award 2024. His work on high-frequency power converters has been adopted in industrial motor drive applications across Southeast Asia.',
    img: 'https://ui-avatars.com/api/?name=Sujith+Nair&background=076653&color=E3EF26&size=256&bold=true',
    linkedin: '#',
    twitter: '#',
    tag: 'Academic',
  },
  {
    id: 6,
    name: 'Ms. Divya Chandran',
    role: 'Senior Engineer, KSEB',
    topic: 'Grid Modernisation in Kerala',
    bio: 'Divya Chandran has led KSEB\'s smart metering initiative covering 2 million households and is instrumental in Kerala\'s transition to advanced distribution management systems. She heads the R&D wing at KSEB.',
    img: 'https://ui-avatars.com/api/?name=Divya+Chandran&background=0C342C&color=E3EF26&size=256&bold=true',
    linkedin: '#',
    twitter: '#',
    tag: 'Utility',
  },
]

type Speaker = typeof speakers[0]

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const STACK_START = 0.06
const STACK_END = 0.84
const ENTRY_HOLD = 0.2

const stackProfiles = {
  mobile: {
    xStep: 0,
    pastStep: 12,
    futureStep: 7,
    scaleStep: 0.025,
    opacityStep: 0.06,
    inactiveOpacity: 0.8,
    cardSize: 'w-[320px] md:w-[360px] h-[440px]',
    stageHeight: '240vh',
  },
  tablet: {
    xStep: 2,
    pastStep: 16,
    futureStep: 9,
    scaleStep: 0.03,
    opacityStep: 0.05,
    inactiveOpacity: 0.78,
    cardSize: 'w-[320px] md:w-[360px] h-[440px]',
    stageHeight: '260vh',
  },
  desktop: {
    xStep: 4,
    pastStep: 20,
    futureStep: 11,
    scaleStep: 0.035,
    opacityStep: 0.045,
    inactiveOpacity: 0.76,
    cardSize: 'w-[320px] md:w-[360px] h-[440px]',
    stageHeight: '280vh',
  },
} as const

type ScreenTier = keyof typeof stackProfiles

const getScreenTier = (width: number): ScreenTier => {
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

const getStackMetrics = (progress: number, index: number, total: number, tier: ScreenTier) => {
  const profile = stackProfiles[tier]
  const usableProgress = clamp((progress - STACK_START) / (STACK_END - STACK_START), 0, 1)
  const heldProgress = usableProgress <= ENTRY_HOLD
    ? 0
    : (usableProgress - ENTRY_HOLD) / (1 - ENTRY_HOLD)
  const activeIndex = heldProgress * (total - 1)
  const delta = index - activeIndex
  const absDelta = Math.abs(delta)
  const isActive = absDelta < 0.35

  const y = delta < 0
    ? Math.min(Math.abs(delta) * profile.pastStep, 96)
    : -Math.min(delta * profile.futureStep, 40)
  const x = delta * profile.xStep
  const scale = clamp(1 - absDelta * profile.scaleStep, 0.9, 1)
  const opacity = clamp(1 - absDelta * profile.opacityStep, profile.inactiveOpacity, 1)
  const rotate = clamp(delta * -0.45, -2.2, 2.2)
  const zIndex = Math.round(500 - absDelta * 120)

  return {
    isActive,
    x,
    y,
    scale,
    rotate,
    opacity,
    zIndex,
  }
}

export default function Speakers() {
  const [selected, setSelected] = useState<Speaker | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [storyProgress, setStoryProgress] = useState(0)
  const [screenTier, setScreenTier] = useState<ScreenTier>('desktop')
  const [floatPhase, setFloatPhase] = useState(0)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 78,
    damping: 25,
    mass: 0.72,
  })

  useMotionValueEvent(smoothScrollProgress, 'change', (latest) => {
    setStoryProgress(latest)
  })

  useEffect(() => {
    const updateTier = () => setScreenTier(getScreenTier(window.innerWidth))

    updateTier()
    window.addEventListener('resize', updateTier)

    return () => {
      window.removeEventListener('resize', updateTier)
    }
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFloatPhase((prev) => (prev + 0.09) % (Math.PI * 2))
    }, 50)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section ref={sectionRef} id="speakers" className="relative" style={{ position: 'relative' }}>
      {/* Intro Text */}
      <div className="section-pad pb-2 md:pb-4 relative max-w-7xl mx-auto">
        <AnimateIn className="section-intro">
          <p className="section-label">Who You&apos;ll Hear</p>
          <h2
            className="font-display text-[var(--text-primary)] section-title"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            World-class
            <span className="text-[var(--accent)]"> speakers.</span>
          </h2>
          <p className="font-body section-copy">
            Learn from researchers, entrepreneurs, and engineers shaping the future of power &amp; energy.
          </p>
        </AnimateIn>
      </div>

      {/* Scroll-driven animation container */}
      <div
        className="relative w-full"
        style={{
          height: stackProfiles[screenTier].stageHeight,
          position: 'relative',
        }}
      >
        {/* Sticky viewport - stays fixed while scrolling through section */}
        <div
          className="sticky w-full flex items-center justify-center overflow-visible"
          style={{
            top: 0,
            height: '100vh',
            position: 'sticky',
            zIndex: 40,
          }}
        >
          {/* Card container */}
          <div className={`relative ${stackProfiles[screenTier].cardSize}`}>
            {speakers.map((sp, i) => {
              const { isActive, x, y, scale, rotate, opacity, zIndex } = getStackMetrics(storyProgress, i, speakers.length, screenTier)
              const floatOffset = Math.sin(floatPhase + i * 0.9) * (isActive ? 5 : 2.5)

              return (
                <motion.div
                  key={sp.id}
                  className="group absolute inset-0"
                  style={{
                    x,
                    y: y + floatOffset,
                    scale,
                    rotate,
                    opacity,
                    zIndex,
                    pointerEvents: isActive ? 'auto' : 'none',
                    willChange: 'transform, opacity',
                  }}
                >
                  <motion.button
                    onClick={() => setSelected(sp)}
                    className="relative h-full w-full text-left rounded-[26px] border border-[rgba(255,255,255,0.12)] bg-[linear-gradient(180deg,rgba(13,34,28,0.98),rgba(8,23,19,0.98))] shadow-[0_18px_48px_rgba(0,0,0,0.34)] overflow-hidden flex flex-col transform-gpu"
                    whileHover={isActive ? { scale: 1.04, y: -8 } : undefined}
                    whileTap={isActive ? { scale: 1.02, y: -4 } : undefined}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="relative h-[54%] overflow-hidden">
                      <Image
                        src={sp.img}
                        alt={sp.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 78vw, 520px"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,9,0.02)_0%,rgba(10,10,9,0.22)_42%,rgba(10,10,9,0.68)_100%)]" />
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(circle at center, rgba(227,239,38,0.10) 0%, rgba(63,173,146,0.06) 38%, rgba(10,10,9,0) 74%)' }} />
                    </div>

                    <div className="relative flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="tag mb-2">{sp.tag}</div>
                          <h3 className="font-display text-[1.35rem] sm:text-[1.55rem] text-[var(--text-primary)] leading-tight">
                            {sp.name}
                          </h3>
                          <p className="font-body text-sm text-[var(--text-muted)] mt-1">{sp.role}</p>
                        </div>
                        <div className="rounded-full border border-[rgba(255,255,255,0.12)] bg-white/5 px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                      </div>

                      <p className="mt-4 font-body text-sm text-[var(--text-secondary)] leading-relaxed">
                        {sp.topic}
                      </p>

                      <div className="mt-auto pt-4 border-t border-[rgba(255,255,255,0.08)]">
                        <span className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-3 py-2 text-[0.7rem] font-medium text-[var(--text-primary)] inline-flex">
                          Hover for details
                        </span>
                      </div>
                    </div>
                  </motion.button>

                  <div
                    className="hidden md:block absolute top-1/2 left-[calc(100%+0.8rem)] -translate-y-1/2 w-[min(72vw,280px)] rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[linear-gradient(180deg,rgba(13,34,28,0.96),rgba(8,23,19,0.98))] shadow-[0_18px_42px_rgba(0,0,0,0.35)] p-4 opacity-0 translate-x-4 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0"
                    style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                  >
                    <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed">
                      {sp.bio}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] px-3 py-2 text-[0.7rem] font-medium text-[var(--text-primary)]">
                        Tap card to open
                      </span>
                      <span className="rounded-full border border-[rgba(227,239,38,0.22)] bg-[rgba(227,239,38,0.08)] px-3 py-2 text-[0.7rem] font-medium text-[var(--accent)] shadow-[0_0_18px_rgba(227,239,38,0.14)]">
                        Detail panel
                      </span>
                    </div>
                  </div>
                </motion.div>
                )
              })}
            </div>
          {/* End sticky viewport */}
      </div>
      {/* End scroll container */}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 z-[200] bg-black/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="fixed inset-0 z-[201] flex items-center justify-center p-3 sm:p-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="glass rounded-2xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-8 relative max-h-[88vh] overflow-y-auto"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 rounded-xl hover:bg-white/10 transition-colors text-[var(--text-secondary)]"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center gap-3 sm:gap-5 mb-5 sm:mb-6 pr-8 sm:pr-10">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden flex-shrink-0">
                    <Image src={selected.img} alt={selected.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div>
                    <div className="tag mb-2">{selected.tag}</div>
                    <h3 className="font-display text-xl text-[var(--text-primary)]">{selected.name}</h3>
                    <p className="font-body text-xs sm:text-sm text-[var(--text-secondary)]">{selected.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-[var(--accent)] rounded-full" />
                  <p className="font-body font-medium text-sm text-[var(--accent)]">Topic: {selected.topic}</p>
                </div>
                <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed">{selected.bio}</p>
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <a href={selected.linkedin} className="btn-ghost py-2 px-4 text-xs flex items-center justify-center gap-1.5">
                    <ArrowUpRight size={14} /> LinkedIn
                  </a>
                  <a href={selected.twitter} className="btn-ghost py-2 px-4 text-xs flex items-center justify-center gap-1.5">
                    <ArrowUpRight size={14} /> Twitter
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
