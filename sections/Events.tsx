'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import AnimateIn from '@/components/AnimateIn'
import { StaggerContainer, StaggerItem } from '@/components/StaggerContainer'

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
  return (
    <section id="events" className="section-pad">
      <div className="max-w-7xl mx-auto">
        <AnimateIn>
          <p className="section-label">Events &amp; Competitions</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <h2
              className="font-display text-[var(--text-primary)]"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Compete. Learn.
              <br />
              <span className="text-[var(--accent)]">Conquer.</span>
            </h2>
            <p className="font-body text-[var(--text-secondary)] max-w-sm text-sm md:text-base">
              Six high-stakes events across two action-packed days. Total prize pool: <strong className="text-[var(--text-primary)]">₹1,25,000+</strong>
            </p>
          </div>
        </AnimateIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((ev) => (
            <StaggerItem key={ev.id}>
              <motion.div
                className="card-base overflow-hidden group cursor-pointer flex flex-col h-full"
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={ev.img}
                    alt={ev.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06231D] via-transparent to-transparent" />
                  {/* Category badge */}
                  <div
                    className="absolute top-4 left-4 text-xs font-body font-medium px-3 py-1 rounded-full"
                    style={{ background: `${ev.color}22`, border: `1px solid ${ev.color}50`, color: ev.color }}
                  >
                    {ev.category}
                  </div>
                  {/* Prize */}
                  <div className="absolute bottom-4 right-4 glass px-3 py-1 rounded-lg text-xs font-body font-medium text-[var(--accent)]">
                    {ev.prize}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-display text-lg text-[var(--text-primary)] leading-tight">
                      {ev.title}
                    </h3>
                    <span className="text-xs font-body text-[var(--text-muted)] whitespace-nowrap mt-0.5">{ev.date}</span>
                  </div>
                  <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed flex-1">
                    {ev.desc}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <div className="h-px flex-1 bg-[var(--border)]" />
                    <button className="ml-4 flex items-center gap-1.5 text-xs font-body font-medium text-[var(--accent)] hover:gap-3 transition-all">
                      Learn more <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
