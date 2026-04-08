'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion'
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
const lerp = (from: number, to: number, t: number) => from + (to - from) * t
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

const SCATTER_LAYOUT = [
  { x: 10, y: 10, rotate: -14 },
  { x: 38, y: 8, rotate: 10 },
  { x: 66, y: 12, rotate: -10 },
  { x: 14, y: 48, rotate: 12 },
  { x: 42, y: 46, rotate: -8 },
  { x: 70, y: 50, rotate: 8 },
]

const FINAL_LAYOUT = [
  { x: 10, y: 12, rotate: -4 },
  { x: 38, y: 12, rotate: 3 },
  { x: 66, y: 12, rotate: -3 },
  { x: 14, y: 60, rotate: 4 },
  { x: 42, y: 60, rotate: -2 },
  { x: 70, y: 60, rotate: 2 },
]

export default function Speakers() {
  const [selected, setSelected] = useState<Speaker | null>(null)
  const desktopStoryRef = useRef<HTMLDivElement>(null)
  const [storyProgress, setStoryProgress] = useState(0)
  const rafRef = useRef<number | null>(null)

  const { scrollYProgress } = useScroll({ target: desktopStoryRef, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
    }

    rafRef.current = requestAnimationFrame(() => {
      setStoryProgress(latest)
      rafRef.current = null
    })
  })

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  const renderSpeakerCard = (sp: Speaker, index: number, cardWidthClass: string) => (
    <motion.button
      key={sp.id}
      onClick={() => setSelected(sp)}
      className={`group text-left glass border border-[rgba(255,255,255,0.08)] backdrop-blur-xl rounded-[18px] overflow-hidden h-[266px] flex flex-col transform-gpu shadow-[0_14px_32px_rgba(0,0,0,0.18)] ${cardWidthClass}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-36 overflow-hidden">
        <Image
          src={sp.img}
          alt={sp.name}
          fill
          className="object-cover"
          sizes="280px"
        />
        <div className="absolute inset-0 bg-[#06231D]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-xs font-body font-medium text-[var(--text-primary)] px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
            View Bio
          </span>
        </div>
      </div>
      <div className="p-4 flex-1">
        <div className="tag text-[0.65rem] mb-2">{sp.tag}</div>
        <p className="font-body font-medium text-sm text-[var(--text-primary)] leading-tight">{sp.name}</p>
        <p className="font-body text-[0.7rem] text-[var(--text-muted)] mt-0.5 leading-tight">{sp.role}</p>
      </div>
    </motion.button>
  )

  return (
    <section id="speakers" className="section-pad">
      <div className="max-w-7xl mx-auto">
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

        <div className="lg:hidden overflow-x-auto pb-3 -mx-1 px-1">
          <div className="flex gap-4 min-w-max pr-2">
            {speakers.map((sp, i) => renderSpeakerCard(sp, i, 'w-[240px] sm:w-[250px] shrink-0'))}
          </div>
        </div>

        <div ref={desktopStoryRef} className="hidden lg:block mt-0">
          <div className="h-[220vh]">
            <div className="sticky top-20 h-[94vh] overflow-visible">
              <div className="absolute inset-0">
                {speakers.map((sp, i) => {
                  const revealStart = i * 0.09
                  const revealEnd = revealStart + 0.16
                  const t = clamp((storyProgress - revealStart) / (revealEnd - revealStart), 0, 1)
                  const eased = easeOutCubic(t)

                  const from = SCATTER_LAYOUT[i]
                  const to = FINAL_LAYOUT[i]

                  const x = lerp(from.x, to.x, eased)
                  const y = lerp(from.y, to.y, eased)
                  const rotate = lerp(from.rotate, to.rotate, eased)
                  const opacity = clamp((t - 0.03) / 0.26, 0, 1)
                  const blur = lerp(8, 0, eased)
                  const scale = lerp(0.92, 1, eased)

                  return (
                    <motion.button
                      key={sp.id}
                      onClick={() => setSelected(sp)}
                      className="group absolute w-[252px] xl:w-[272px] h-[286px] text-left glass border border-[rgba(255,255,255,0.08)] backdrop-blur-xl rounded-[18px] shadow-[0_14px_32px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col transform-gpu"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        rotate: `${rotate}deg`,
                        opacity,
                        scale,
                        filter: `blur(${blur}px)`,
                        zIndex: 20 + i,
                        transform: 'translate(-50%, -50%)',
                      }}
                      whileHover={{ y: -5, rotate: 0, scale: 1.02 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={sp.img}
                          alt={sp.name}
                          fill
                          className="object-cover"
                          sizes="272px"
                        />
                        <div className="absolute inset-0 bg-[#06231D]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-xs font-body font-medium text-[var(--text-primary)] px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
                            View Bio
                          </span>
                        </div>
                      </div>
                      <div className="p-4 flex-1">
                        <div className="tag text-[0.68rem] mb-2">{sp.tag}</div>
                        <p className="font-body font-medium text-[0.95rem] text-[var(--text-primary)] leading-tight">{sp.name}</p>
                        <p className="font-body text-xs text-[var(--text-muted)] mt-1 leading-tight">{sp.role}</p>
                      </div>
                    </motion.button>
                  )
                })}
              </div>

            </div>
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
