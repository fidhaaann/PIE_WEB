'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
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
  const [isTrainPaused, setIsTrainPaused] = useState(false)
  const trainEvents = [...events, ...events]

  return (
    <section
      id="events"
      className="section-pad notebook-paper relative overflow-hidden"
      style={{ position: 'relative' }}
    >
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

        <div className="grid grid-cols-1 gap-6 lg:gap-7">
          <div className="w-full">
            <div className="flex items-end justify-between gap-4 mb-4">
              <div>
                <p className="font-body text-[0.66rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">Competition Train</p>
                <h3 className="font-display text-xl md:text-2xl text-[var(--text-primary)] mt-1">Hover any card to pause and inspect it.</h3>
              </div>
              <p className="hidden md:block font-body text-xs text-[var(--text-muted)] text-right max-w-[16rem]">
                The lineup loops to the right automatically until you hover a card.
              </p>
            </div>

            <div
              className="relative overflow-hidden rounded-[28px] border-[3px] border-[#0b0b0b] bg-[#ffffff] shadow-[8px_8px_0_#0b0b0b] p-4 md:p-5"
              onMouseEnter={() => setIsTrainPaused(true)}
              onMouseLeave={() => setIsTrainPaused(false)}
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-[#facc15] z-10 border-r-[3px] border-[#0b0b0b]" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-[#60a5fa] z-10 border-l-[3px] border-[#0b0b0b]" />

              <motion.div
                className="train-track flex w-max gap-4 md:gap-5"
                style={{ animationPlayState: isTrainPaused ? 'paused' : 'running' }}
              >
                {trainEvents.map((ev, i) => (
                  <motion.article
                    key={`${ev.id}-${i}`}
                    className="group relative flex-shrink-0 w-[280px] md:w-[304px] h-[380px] overflow-hidden rounded-[24px] border-[3px] border-[#0b0b0b] bg-[#fdfdfd] shadow-[7px_7px_0_#0b0b0b]"
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="relative h-[168px]">
                      <Image src={ev.img} alt={ev.title} fill className="object-cover" sizes="304px" />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>

                    <div className="relative flex h-[212px] flex-col p-4 md:p-5">
                      <div className="flex-1 flex items-center justify-center text-center">
                        <div>
                          <p className="font-body text-[0.68rem] uppercase tracking-[0.18em] text-[#ec4899]">Event</p>
                          <h4 className="font-display text-2xl text-[var(--text-primary)] mt-3 leading-tight">{ev.title}</h4>
                        </div>
                      </div>

                      <div className="mt-auto pt-4 border-t-[3px] border-[#0b0b0b] overflow-hidden">
                        <div className="max-h-0 opacity-0 translate-y-2 transition-all duration-300 group-hover:max-h-32 group-hover:opacity-100 group-hover:translate-y-0">
                          <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed">{ev.desc}</p>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="font-body text-[0.68rem] uppercase tracking-[0.16em] text-[var(--text-muted)]">Hover to pause</span>
                          <ArrowUpRight size={14} className="text-[var(--accent)]" />
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
