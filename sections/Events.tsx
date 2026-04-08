'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import AnimateIn from '@/components/AnimateIn'

const events = [
  {
    id: 1,
    title: 'PowerGrid Hackathon',
    category: 'Hackathon',
    desc: '36-hour hackathon challenging teams to solve real-world power & energy problems using IoT, ML and embedded systems.',
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    date: 'Jun 14',
    prize: '₹50,000',
    color: '#E3EF26',
  },
  {
    id: 2,
    title: 'Paper Presentation',
    category: 'Technical',
    desc: 'Present your research in power systems, renewables or smart grids before a panel of senior IEEE members.',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    date: 'Jun 14–15',
    prize: '₹20,000',
    color: '#76d7b0',
  },
  {
    id: 3,
    title: 'Project Expo',
    category: 'Exhibition',
    desc: 'Showcase your hardware or software prototype and pitch to industry judges for funding & mentorship.',
    img: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80',
    date: 'Jun 15',
    prize: '₹30,000',
    color: '#f9a848',
  },
  {
    id: 4,
    title: 'Circuit Design Challenge',
    category: 'Technical',
    desc: 'Design, simulate and build a working circuit within 3 hours. Speed and accuracy are equally weighted.',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    date: 'Jun 14',
    prize: '₹15,000',
    color: '#b48cdb',
  },
  {
    id: 5,
    title: 'Techno Quiz',
    category: 'Quiz',
    desc: 'Fast-paced buzzer quiz covering power engineering fundamentals, IEEE standards, and emerging tech.',
    img: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&q=80',
    date: 'Jun 15',
    prize: '₹10,000',
    color: '#f97aab',
  },
  {
    id: 6,
    title: 'Drone Dynamics',
    category: 'Workshop',
    desc: 'Hands-on workshop on drone assembly, control systems and aerial mapping led by industry professionals.',
    img: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&q=80',
    date: 'Jun 14',
    prize: 'Certificate',
    color: '#4ecdc4',
  },
]

export default function Events() {
  const sectionRef = useRef<HTMLElement>(null)
  const [spotlightIndex, setSpotlightIndex] = useState(0)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const accentY = useTransform(scrollYProgress, [0, 1], [24, -32])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSpotlightIndex((prev) => (prev + 1) % events.length)
    }, 4200)

    return () => window.clearInterval(timer)
  }, [])

  const spotlight = events[spotlightIndex]

  return (
    <section ref={sectionRef} id="events" className="section-pad relative overflow-hidden">
      <motion.div
        style={{ y: accentY }}
        className="pointer-events-none absolute left-0 top-12 w-[220px] h-[220px] md:w-[340px] md:h-[340px] rounded-full bg-[var(--accent)] opacity-[0.05] blur-[90px]"
      />
      <div className="max-w-7xl mx-auto">
        <AnimateIn className="section-intro">
          <p className="section-label">Events &amp; Competitions</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="font-display text-[var(--text-primary)] section-title"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Compete. Learn.
              <br />
              <span className="text-[var(--accent)]">Conquer.</span>
            </h2>
            <p className="font-body section-copy md:max-w-sm">
              Six high-stakes events across two action-packed days. Total prize pool: <strong className="text-[var(--text-primary)]">₹1,25,000+</strong>
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7">
          <motion.article
            className="lg:col-span-4 card-base accent-stroke p-5 md:p-6 lg:sticky lg:top-24 h-[560px] md:h-[590px] flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={spotlight.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="min-h-[380px]"
              >
                <p className="font-body text-[0.66rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">Feature Spotlight</p>
                <div className="flex items-center justify-between gap-2 mt-1">
                  <span className="text-[0.68rem] font-body text-[var(--text-muted)]">{spotlight.date}</span>
                  <span className="text-[0.68rem] font-body text-[var(--accent)]">{spotlight.prize}</span>
                </div>
                <h3 className="font-display text-2xl text-[var(--text-primary)] mt-2 leading-tight h-[58px] overflow-hidden">{spotlight.title}</h3>
                <p className="font-body text-sm text-[var(--text-secondary)] mt-3 leading-relaxed h-[68px] overflow-hidden">{spotlight.desc}</p>

                <div className="relative mt-5 rounded-2xl overflow-hidden h-44">
                  <Image src={spotlight.img} alt={spotlight.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 30vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06231D] via-transparent to-transparent" />
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="grid grid-cols-3 gap-3 mt-auto">
              <div className="glass rounded-xl p-3 text-center">
                <p className="font-display text-lg text-[var(--accent)]">{events.length}</p>
                <p className="font-body text-[0.66rem] text-[var(--text-muted)] uppercase tracking-[0.14em]">Events</p>
              </div>
              <div className="glass rounded-xl p-3 text-center">
                <p className="font-display text-lg text-[var(--accent)]">2</p>
                <p className="font-body text-[0.66rem] text-[var(--text-muted)] uppercase tracking-[0.14em]">Days</p>
              </div>
              <div className="glass rounded-xl p-3 text-center">
                <p className="font-display text-lg text-[var(--accent)]">₹1.25L+</p>
                <p className="font-body text-[0.66rem] text-[var(--text-muted)] uppercase tracking-[0.14em]">Prizes</p>
              </div>
            </div>
          </motion.article>

          <div className="lg:col-span-8 space-y-4">
            {events.map((ev, i) => (
              <motion.article
                key={ev.id}
                className="card-base accent-stroke p-4 md:p-5"
                whileHover={{ y: -4 }}
                whileInView={{ opacity: [0, 1], y: [14, 0] }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="grid grid-cols-[auto,1fr] md:grid-cols-[auto,112px,1fr,auto] gap-4 items-start">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[var(--accent)]/14 border border-[var(--border-accent)] flex items-center justify-center text-[0.72rem] font-body font-medium text-[var(--accent)]">
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div className="hidden md:block relative w-28 h-20 rounded-xl overflow-hidden">
                    <Image src={ev.img} alt={ev.title} fill className="object-cover" sizes="112px" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-display text-lg text-[var(--text-primary)] leading-tight">{ev.title}</p>
                      <span className="text-[0.63rem] font-body uppercase tracking-[0.15em] text-[var(--text-muted)]">{ev.category}</span>
                    </div>
                    <p className="font-body text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">{ev.desc}</p>
                  </div>

                  <div className="col-span-2 md:col-span-1 flex md:flex-col items-center md:items-end justify-between md:justify-start gap-2 md:gap-1">
                    <span className="text-[0.68rem] font-body text-[var(--text-muted)] border border-[var(--border)] rounded-full px-2.5 py-1">{ev.date}</span>
                    <span className="text-[0.72rem] font-body text-[var(--accent)]">{ev.prize}</span>
                    <button className="hidden md:flex items-center gap-1.5 text-xs font-body font-medium text-[var(--accent)] hover:gap-3 transition-all mt-1">
                      Details <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
