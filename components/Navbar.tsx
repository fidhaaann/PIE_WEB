'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import pieLogo from '@/photo/pielogo-Photoroom.png'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Highlights', href: '#highlights' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showNav, setShowNav] = useState(true)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const onScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 40)

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNav(false)
      } else {
        setShowNav(true)
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
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
        animate={{ y: showNav ? 0 : -110, opacity: showNav ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-2 md:top-0 left-0 right-0 z-[100] py-3 md:py-4 pt-[env(safe-area-inset-top)] md:pt-4 pointer-events-auto"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-5">
          <div
            className={`rounded-2xl px-4 md:px-5 py-2.5 flex items-center justify-between transition-all duration-500 ${
              scrolled
                ? 'bg-[#fef08a] border-[3px] border-[#0b0b0b] shadow-[6px_6px_0_#0b0b0b]'
                : 'bg-[#bfdbfe] border-[3px] border-[#0b0b0b] shadow-[6px_6px_0_#0b0b0b]'
            }`}
          >
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image
                src={pieLogo}
                alt="IEEE PIE Kerala Section logo"
                className="h-8 sm:h-9 md:h-10 w-auto"
                priority
                loading="eager"
                fetchPriority="high"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNav(link.href)}
                  className="relative text-sm font-body font-bold text-[var(--text-primary)] hover:text-[#2563eb] transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[var(--accent)] group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a href="#register" className="btn-primary btn-register-dark py-2.5 px-5 text-sm">
                Register
              </a>
            </div>

            <button
              className="md:hidden p-2 rounded-lg border-[3px] border-[#0b0b0b] bg-[#f472b6] text-[#0b0b0b] shadow-[4px_4px_0_#0b0b0b]"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-[99] w-[86vw] max-w-xs bg-[#ffffff] border-l-[4px] border-[#0b0b0b] flex flex-col pt-20 px-6 gap-5 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                type="button"
                onClick={() => handleNav(link.href)}
              >
                <span className="block text-left font-body font-medium text-lg text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
                  {link.label}
                </span>
              </motion.button>
            ))}
            <a
              href="#register"
              onClick={() => setMenuOpen(false)}
              className="btn-primary btn-register-dark mt-4 justify-center"
            >
              Register Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>

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
