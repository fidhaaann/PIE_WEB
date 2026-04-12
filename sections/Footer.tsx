'use client'

import Image from 'next/image'
import { ArrowUpRight, ArrowUp } from 'lucide-react'
import pieLogo from '@/photo/pielogo-Photoroom.png'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Highlights', href: '#highlights' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Register', href: '#register' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-[var(--border)] pt-14 sm:pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16 text-center md:text-left">
          {/* Brand */}
          <div>
            <div className="mb-4 flex justify-center md:justify-start">
              <Image
                src={pieLogo}
                alt="IEEE PIE Kerala Section logo"
                className="h-12 sm:h-14 md:h-20 w-auto"
                loading="eager"
              />
            </div>
            <p className="font-body text-xs text-[var(--text-secondary)] max-w-xs mx-auto md:mx-0 leading-relaxed">
              IEEE Power & Energy Society, Kerala Section — connecting engineers, driving innovation, and powering the future of energy.
            </p>
            <div className="flex gap-3 mt-5 justify-center md:justify-start flex-wrap">
              {[
                { icon: ArrowUpRight, href: '#', label: 'Instagram' },
                { icon: ArrowUpRight, href: '#', label: 'LinkedIn' },
                { icon: ArrowUpRight, href: '#', label: 'Twitter' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg glass border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-colors"
                >
                  <s.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="font-body font-medium text-xs uppercase tracking-widest text-[var(--text-muted)] mb-5">Navigation</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="font-body font-medium text-xs uppercase tracking-widest text-[var(--text-muted)] mb-5">Event Info</p>
            <ul className="space-y-3">
              {[
                { label: 'Date',  value: 'June 14–15, 2026' },
                { label: 'Venue', value: 'Rajagiri Engineering, Kochi' },
                { label: 'Email', value: 'pie.keralasection@ieee.org' },
              ].map((item) => (
                <li key={item.label}>
                  <span className="font-body text-xs text-[var(--text-muted)]">{item.label}: </span>
                  <span className="font-body text-sm text-[var(--text-secondary)]">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider mb-6" />

        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-4 text-center md:text-left">
          <p className="font-body text-xs text-[var(--text-muted)] text-center md:text-left">
            © 2026 IEEE Power & Energy Society, Kerala Section · All rights reserved
          </p>
          <div className="flex items-center gap-4 self-center md:self-auto">
            <span className="font-body text-xs text-[var(--text-muted)]">V-Fiesta 5.0 · 5th Edition</span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg glass border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
