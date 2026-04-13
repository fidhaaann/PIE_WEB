'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useMotionValueEvent, useSpring, PanInfo } from 'framer-motion'
import { X, ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react'
import AnimateIn from '@/components/AnimateIn'

const speakers = [
  {
    id: 1,
    name: 'Dr. Priya Krishnan',
    role: 'Professor, IIT Bombay',
    topic: 'Smart Grid Technologies',
    bio: 'Dr. Priya Krishnan is a leading researcher in smart grid systems and power electronics at IIT Bombay with over 20 years of experience. She has authored 150+ research papers and serves on the IEEE Power & Energy Society Technical Committee.',
    img: 'https://ui-avatars.com/api/?name=Priya+Krishnan&background=076653&color=E3EF26&size=512&bold=true',
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
    img: 'https://ui-avatars.com/api/?name=Rahul+Menon&background=0C342C&color=E3EF26&size=512&bold=true',
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
    img: 'https://ui-avatars.com/api/?name=Anita+Varma&background=076653&color=E3EF26&size=512&bold=true',
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
    img: 'https://ui-avatars.com/api/?name=Kevin+Thomas&background=0C342C&color=E3EF26&size=512&bold=true',
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
    img: 'https://ui-avatars.com/api/?name=Sujith+Nair&background=076653&color=E3EF26&size=512&bold=true',
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
    img: 'https://ui-avatars.com/api/?name=Divya+Chandran&background=0C342C&color=E3EF26&size=512&bold=true',
    linkedin: '#',
    twitter: '#',
    tag: 'Utility',
  },
  {
    id: 7,
    name: 'Dr. Meera Joseph',
    role: 'Director, Centre for Energy Analytics',
    topic: 'AI for Power Grid Reliability',
    bio: 'Dr. Meera Joseph leads applied research in AI-driven fault prediction and reliability analytics for large-scale transmission networks. Her team has deployed predictive maintenance pilots with utilities across South India.',
    img: 'https://ui-avatars.com/api/?name=Meera+Joseph&background=076653&color=E3EF26&size=512&bold=true',
    linkedin: '#',
    twitter: '#',
    tag: 'Research',
  },
]

type Speaker = typeof speakers[0]

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const stackProfiles = {
  mobile: {
    radiusX: 180,
    radiusZ: 150,
    yOffset: 15,
    angleStep: 0.60,
    inactiveOpacity: 0.8,
    cardSize: 'w-[260px] md:w-[360px] h-[360px] md:h-[440px]',
  },
  tablet: {
    radiusX: 480,
    radiusZ: 300,
    yOffset: 40,
    angleStep: 0.28,
    inactiveOpacity: 0.78,
    cardSize: 'w-[320px] md:w-[360px] h-[440px]',
  },
  desktop: {
    radiusX: 800,
    radiusZ: 450,
    yOffset: 60,
    angleStep: 0.20,
    inactiveOpacity: 0.76,
    cardSize: 'w-[320px] md:w-[360px] h-[440px]',
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
  
  const exactActiveIndex = progress * (total - 1)
  const delta = index - exactActiveIndex
  const absDelta = Math.abs(delta)
  const isActive = absDelta < 0.35

  const angle = delta * profile.angleStep
  const x = Math.sin(angle) * profile.radiusX
  const z = (Math.cos(angle) - 1) * profile.radiusZ
  const y = Math.abs(Math.sin(angle)) * profile.yOffset

  const rotateY = -(angle * 180 / Math.PI)
  const rotateZ = delta * -1.5

  const scale = 1
  const opacity = clamp(1 - (absDelta * 0.15), profile.inactiveOpacity, 1)
  const zIndex = Math.round(500 - absDelta * 100)
  const filter = isActive ? 'grayscale(0%)' : `grayscale(${clamp(absDelta * 80, 0, 100)}%)`

  return {
    isActive,
    x,
    y,
    z,
    rotateY,
    rotateZ,
    scale,
    opacity,
    zIndex,
    filter,
  }
}

export default function Speakers() {
  const [selected, setSelected] = useState<Speaker | null>(null)
  const [screenTier, setScreenTier] = useState<ScreenTier>('desktop')
  const [activeIndex, setActiveIndex] = useState(Math.floor(speakers.length / 2))
  const [hoveredSpeaker, setHoveredSpeaker] = useState<Speaker | null>(null)

  // Spring to drive visual rotation from 0.0 to 1.0 continuously
  const storyProgress = useSpring(0, {
    stiffness: 85,
    damping: 22,
    mass: 0.8,
  })

  const [localProgress, setLocalProgress] = useState(0)

  useMotionValueEvent(storyProgress, 'change', (latest) => {
    setLocalProgress(latest)
  })

  // Whenever the user changes cards, update the target progress of the spring
  useEffect(() => {
    // We map index to a 0 to 1 scale since getStackMetrics uses a global 0-1 continuous progress
    storyProgress.set(activeIndex / (speakers.length - 1))
  }, [activeIndex, storyProgress])

  const handlePanEnd = (e: any, info: PanInfo) => {
    const offset = info.offset.x
    const velocity = info.velocity.x
    // Swipe left (next) vs Swipe right (prev)
    if (offset < -50 || velocity < -400) {
      setActiveIndex((prev) => Math.min(speakers.length - 1, prev + 1))
    } else if (offset > 50 || velocity > 400) {
      setActiveIndex((prev) => Math.max(0, prev - 1))
    }
  }

  useEffect(() => {
    let resizeTimer: number | null = null

    const updateTier = () => setScreenTier(getScreenTier(window.innerWidth))
    const onResize = () => {
      if (resizeTimer !== null) {
        window.clearTimeout(resizeTimer)
      }
      resizeTimer = window.setTimeout(updateTier, 120)
    }

    updateTier()
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      if (resizeTimer !== null) {
        window.clearTimeout(resizeTimer)
      }
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    // Lock background scroll when modal is open
    if (selected) {
      document.body.style.overflow = 'hidden'
      document.documentElement.classList.add('lenis-stopped')
    } else {
      document.body.style.overflow = ''
      document.documentElement.classList.remove('lenis-stopped')
    }
    
    return () => {
      document.body.style.overflow = ''
      document.documentElement.classList.remove('lenis-stopped')
    }
  }, [selected])

  return (
    <section id="speakers" className="notebook-paper relative group overflow-hidden border-t-[6px] border-[#0b0b0b]">
      {/* Intro Text */}
      <div className="pt-16 pb-0 md:pt-24 md:pb-1 relative max-w-7xl mx-auto px-5 sm:px-10">
        <AnimateIn className="section-intro !mb-1 md:!mb-2">
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

      {/* Interactive Carousel Container */}
      <div className="relative w-full h-[480px] md:h-[620px] lg:h-[660px]">
        
        {/* Navigation Buttons */}
        <div className="hidden lg:flex absolute inset-x-4 max-w-7xl mx-auto top-1/2 -translate-y-1/2 z-[300] items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
            disabled={activeIndex === 0}
            className="relative w-14 h-14 rounded-full bg-[#fef08a] flex items-center justify-center text-[#0b0b0b] hover:scale-105 disabled:opacity-20 disabled:cursor-not-allowed pointer-events-auto cursor-pointer border-[3px] border-[#0b0b0b] shadow-[4px_4px_0_#0b0b0b] transition-transform"
            aria-label="Previous speaker"
          >
            <ArrowLeft className="relative z-10 w-7 h-7" strokeWidth={2.75} />
          </button>
          <button
            onClick={() => setActiveIndex(prev => Math.min(speakers.length - 1, prev + 1))}
            disabled={activeIndex === speakers.length - 1}
            className="relative w-14 h-14 rounded-full bg-[#bfdbfe] flex items-center justify-center text-[#0b0b0b] hover:scale-105 disabled:opacity-20 disabled:cursor-not-allowed pointer-events-auto cursor-pointer border-[3px] border-[#0b0b0b] shadow-[4px_4px_0_#0b0b0b] transition-transform"
            aria-label="Next speaker"
          >
            <ArrowRight className="relative z-10 w-7 h-7" strokeWidth={2.75} />
          </button>
        </div>

        {/* Swipe Indicators Mobile */}
        <div className="absolute top-4 left-0 right-0 z-50 flex justify-center gap-2 pointer-events-none">
          {speakers.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-6 bg-[var(--accent)]' : 'w-1.5 bg-white/20'}`}
            />
          ))}
        </div>

        {/* 3D Scene */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'pan-y' }}
          onPanEnd={handlePanEnd}
        >
          {/* Card Engine Container */}
          <div 
            className={`relative mx-auto ${stackProfiles[screenTier].cardSize}`}
            style={{ perspective: '1400px', transformStyle: 'preserve-3d' }}
          >
            {speakers.map((sp, i) => {
              const { isActive, x, y, z, rotateY, rotateZ, scale, opacity, zIndex, filter } = getStackMetrics(localProgress, i, speakers.length, screenTier)

              return (
                <motion.div
                  key={sp.id}
                  className="group absolute inset-0 pointer-events-auto cursor-pointer"
                  onMouseEnter={() => isActive && setHoveredSpeaker(sp)}
                  onMouseLeave={() => setHoveredSpeaker(null)}
                  style={{
                    x,
                    y,
                    z,
                    scale,
                    rotateY,
                    rotateZ,
                    opacity,
                    zIndex,
                    filter,
                    pointerEvents: isActive ? 'auto' : 'none',
                    willChange: 'transform, opacity, filter',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <motion.button
                    onClick={() => setSelected(sp)}
                    className="relative h-full w-full text-left rounded-[26px] border-[3px] border-[#0b0b0b] bg-[#ffffff] shadow-[8px_8px_0_#0b0b0b] overflow-hidden flex flex-col transform-gpu"
                    whileHover={isActive ? { scale: 1.04, y: -8 } : undefined}
                    whileTap={isActive ? { scale: 1.02, y: -4 } : undefined}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className={`relative overflow-hidden transition-all duration-500 ease-out ${isActive ? 'h-[54%]' : 'h-full'}`}>
                      <Image
                        src={sp.img}
                        alt={sp.name}
                        fill
                        loading={i === 0 ? 'eager' : 'lazy'}
                        className="object-cover"
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 78vw, 520px"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(circle at center, rgba(227,239,38,0.10) 0%, rgba(63,173,146,0.06) 38%, rgba(10,10,9,0) 74%)' }} />
                    </div>

                    <div className={`relative flex flex-1 flex-col px-4 py-4 sm:px-6 sm:py-6 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="flex items-start justify-between gap-3 sm:gap-4">
                        <div>
                          <div className="tag mb-1 sm:mb-2 text-[0.65rem] sm:text-[0.75rem]">{sp.tag}</div>
                          <h3 className="font-display text-[1.15rem] sm:text-[1.55rem] text-[var(--text-primary)] leading-tight">
                            {sp.name}
                          </h3>
                          <p className="font-body text-xs sm:text-sm text-[var(--text-muted)] mt-1">{sp.role}</p>
                        </div>
                        <div className="rounded-full border-[2px] border-[#0b0b0b] bg-[#facc15] px-2 py-1 sm:px-3 text-[0.6rem] sm:text-[0.68rem] uppercase tracking-[0.22em] text-[#0b0b0b]">
                          {String(i + 1).padStart(2, '0')}
                        </div>
                      </div>

                      <p className="mt-2 sm:mt-4 font-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                        {sp.topic}
                      </p>

                      <div className="mt-auto pt-3 sm:pt-4 border-t-[3px] border-[#0b0b0b]">
                        <span className="rounded-full border-[2px] border-[#0b0b0b] bg-[#bfdbfe] px-3 py-1.5 sm:py-2 text-[0.65rem] sm:text-[0.7rem] font-medium text-[#0b0b0b] inline-flex">
                          Tap for details
                        </span>
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Global Hover Detail Panel */}
        <div
          className={`hidden md:block absolute top-1/2 left-[calc(50%+193px)] -translate-y-1/2 z-[200] w-[280px] rounded-2xl border-[3px] border-[#0b0b0b] bg-[#ffffff] shadow-[8px_8px_0_#0b0b0b] p-4 transition-all duration-300 ease-out ${hoveredSpeaker ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-4 pointer-events-none'}`}
        >
          <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed">
            {hoveredSpeaker?.bio}
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
                data-lenis-prevent="true"
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
