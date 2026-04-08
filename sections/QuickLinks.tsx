'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, HelpCircle, BookOpen, ArrowUpRight } from 'lucide-react'
import { StaggerContainer, StaggerItem } from '@/components/StaggerContainer'
import AnimateIn from '@/components/AnimateIn'

const links = [
  {
    icon: Calendar,
    title: 'Schedule',
    desc: 'View the full two-day programme with session timings.',
    href: '#events',
    accent: '#E3EF26',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    icon: MapPin,
    title: 'Venue',
    desc: 'Rajagiri School of Engineering, Kakkanad, Kochi.',
    href: '#contact',
    accent: '#76d7b0',
    span: 'lg:col-span-1',
  },
  {
    icon: BookOpen,
    title: 'Workshops',
    desc: 'Hands-on sessions with industry mentors & researchers.',
    href: '#events',
    accent: '#f9a848',
    span: 'lg:col-span-1',
  },
  {
    icon: HelpCircle,
    title: 'FAQ',
    desc: 'Everything you need to know before you arrive.',
    href: '#contact',
    accent: '#76d7b0',
    span: 'lg:col-span-2',
  },
]

export default function QuickLinks() {
  return (
    <section id="about" className="section-pad">
      <div className="max-w-7xl mx-auto">
        <AnimateIn className="section-intro">
          <p className="section-label">Quick Access</p>
          <h2
            className="font-display text-[var(--text-primary)] section-title"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Everything you need,
            <br />
            <span className="text-[var(--accent)]">in one place.</span>
          </h2>
          <p className="font-body section-copy">
            Navigate the event effortlessly — from schedule to speakers, workshops to venue info.
          </p>
        </AnimateIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:auto-rows-[minmax(168px,1fr)]">
          {links.map((link, i) => (
            <StaggerItem key={link.title}>
              <a
                href={link.href}
                className={`card-base group relative isolate flex flex-col h-full p-5 md:p-6 cursor-pointer overflow-hidden ${link.span}`}
              >
                <div
                  className="absolute inset-x-0 top-0 h-px opacity-70"
                  style={{ background: `linear-gradient(90deg, transparent, ${link.accent}, transparent)` }}
                />
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${link.accent}18`, border: `1px solid ${link.accent}30` }}
                >
                  <link.icon size={20} style={{ color: link.accent }} />
                </div>
                <p className="font-body text-[0.65rem] tracking-[0.16em] uppercase text-[var(--text-muted)] mb-2">
                  {i === 0 ? 'Most Used' : 'Quick Route'}
                </p>
                <h3 className={`font-display text-[var(--text-primary)] mb-2 leading-tight ${i === 0 || i === 3 ? 'text-xl md:text-2xl' : 'text-lg'}`}>
                  {link.title}
                </h3>
                <p className="font-body text-sm text-[var(--text-secondary)] flex-1 leading-relaxed">
                  {link.desc}
                </p>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-body font-medium text-[var(--accent)] group-hover:gap-3 transition-all">
                  Explore
                  <ArrowUpRight size={14} />
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
