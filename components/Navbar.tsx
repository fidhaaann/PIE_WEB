'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X, Zap } from 'lucide-react'

const navLinks = [
  { label: 'About',     href: '#about' },
  { label: 'Events',    href: '#events' },
  { label: 'Speakers',  href: '#speakers' },
  { label: 'Sponsors',  href: '#sponsors' },
  { label: 'Contact',   href: '#contact' },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
              <Zap size={16} className="text-[#06231D]" />
            </div>
            <div>
              <span className="font-display font-800 text-sm tracking-tight text-[var(--text-primary)] block leading-none">
                IEEE PIE
              </span>
              <span className="font-display font-700 text-xs text-[var(--accent)] leading-none">
                Kerala Section
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="relative text-sm font-body text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#register" className="btn-primary py-2.5 px-5 text-sm">
              Register
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg border border-[var(--border)] text-[var(--text-primary)]"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-[99] w-72 glass border-l border-[var(--border)] flex flex-col pt-24 px-8 gap-6 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => handleNav(link.href)}
                className="text-left font-display text-xl font-600 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
              >
                {link.label}
              </motion.button>
            ))}
            <a
              href="#register"
              onClick={() => setMenuOpen(false)}
              className="btn-primary mt-4 justify-center"
            >
              Register Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[98] bg-black/60 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
