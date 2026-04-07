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
  },
  {
    icon: MapPin,
    title: 'Venue',
    desc: 'Rajagiri School of Engineering, Kakkanad, Kochi.',
    href: '#contact',
    accent: '#76d7b0',
  },
  {
    icon: BookOpen,
    title: 'Workshops',
    desc: 'Hands-on sessions with industry mentors & researchers.',
    href: '#events',
    accent: '#f9a848',
  },
  {
    icon: HelpCircle,
    title: 'FAQ',
    desc: 'Everything you need to know before you arrive.',
    href: '#contact',
    accent: '#b48cdb',
  },
]

export default function QuickLinks() {
  return (
    <section id="about" className="section-pad">
      <div className="max-w-7xl mx-auto">
        <AnimateIn>
          <p className="section-label">Quick Access</p>
          <h2
            className="font-display font-extrabold text-[var(--text-primary)] mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Everything you need,
            <br />
            <span className="text-[var(--accent)]">in one place.</span>
          </h2>
          <p className="font-body text-[var(--text-secondary)] max-w-lg mb-12" style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)' }}>
            Navigate the event effortlessly — from schedule to speakers, workshops to venue info.
          </p>
        </AnimateIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {links.map((link) => (
            <StaggerItem key={link.title}>
              <a
                href={link.href}
                className="card-base group flex flex-col h-full p-6 cursor-pointer"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${link.accent}18`, border: `1px solid ${link.accent}30` }}
                >
                  <link.icon size={20} style={{ color: link.accent }} />
                </div>
                <h3 className="font-display font-700 text-lg text-[var(--text-primary)] mb-2">
                  {link.title}
                </h3>
                <p className="font-body text-sm text-[var(--text-secondary)] flex-1 leading-relaxed">
                  {link.desc}
                </p>
                <div className="mt-5 flex items-center gap-1.5 text-xs font-600 font-display text-[var(--accent)] group-hover:gap-3 transition-all">
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
