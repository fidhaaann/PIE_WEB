'use client'

import Link from 'next/link'
import { Zap, Instagram, Linkedin, Twitter, ArrowUp } from 'lucide-react'

const navLinks = ['About', 'Events', 'Speakers', 'Sponsors', 'Contact']

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-[var(--border)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                <Zap size={16} className="text-[#06231D]" />
              </div>
              <div>
                <span className="font-display font-800 text-sm text-[var(--text-primary)] block">IEEE PIE</span>
                <span className="font-display font-700 text-xs text-[var(--accent)]">Kerala Section</span>
              </div>
            </div>
            <p className="font-body text-xs text-[var(--text-secondary)] max-w-xs leading-relaxed">
              IEEE Power & Energy Society, Kerala Section — connecting engineers, driving innovation, and powering the future of energy.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Linkedin,  href: '#', label: 'LinkedIn' },
                { icon: Twitter,   href: '#', label: 'Twitter' },
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
            <p className="font-display font-700 text-xs uppercase tracking-widest text-[var(--text-muted)] mb-5">Navigation</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="font-body text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="font-display font-700 text-xs uppercase tracking-widest text-[var(--text-muted)] mb-5">Event Info</p>
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

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-[var(--text-muted)]">
            © 2026 IEEE Power & Energy Society, Kerala Section · All rights reserved
          </p>
          <div className="flex items-center gap-4">
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
