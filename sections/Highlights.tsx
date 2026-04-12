'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import AnimateIn from '@/components/AnimateIn'

const highlights = [
  {
    id: 1,
    title: 'V-Fiesta 4.0 Highlights',
    desc: '1800+ Participants from 60+ colleges across Kerala.',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    rotate: -3,
    z: 1,
  },
  {
    id: 2,
    title: 'Grand Award Ceremony',
    desc: 'Winners celebrated with trophies and cash prizes.',
    img: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80',
    rotate: 1.5,
    z: 2,
  },
  {
    id: 3,
    title: 'Keynote: Dr. Anitha Nair',
    desc: 'Inspiring session on smart grids and the future of energy.',
    img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
    rotate: -1,
    z: 3,
  },
  {
    id: 4,
    title: 'Hands-On Workshops',
    desc: '12 workshops, 600+ participants, 0% boredom.',
    img: 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=800&q=80',
    rotate: 2.5,
    z: 4,
  },
]

const marqueeItems = [
  '1800+ Participants',
  'V-Fiesta 4.0',
  '₹75,000 Prize Pool',
  '60+ Colleges',
  '20+ Events',
  'IEEE Certified',
  'Kochi, Kerala',
  '2 Epic Days',
]

export default function Highlights() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isMobileLike, setIsMobileLike] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const glowY = useTransform(scrollYProgress, [0, 1], [30, -30])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px), (pointer: coarse)')
    const update = () => setIsMobileLike(media.matches)

    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const useStaticMobile = Boolean(prefersReducedMotion) || isMobileLike

  return (
    <section ref={sectionRef} id="highlights" className="section-pad overflow-hidden relative" style={{ position: 'relative' }}>
      <motion.div
        style={{ y: useStaticMobile ? 0 : glowY }}
        className="pointer-events-none absolute -top-16 right-0 w-[220px] h-[220px] md:w-[360px] md:h-[360px] rounded-full bg-[var(--accent)] opacity-[0.06] blur-[80px]"
      />
      <div className="max-w-7xl mx-auto">
        <AnimateIn className="section-intro">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-end">
            <div className="lg:col-span-3">
              <p className="section-label">Past Editions</p>
              <motion.h2
                className="font-display text-[var(--text-primary)] section-title"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                Relive the <span className="editorial-italic text-[var(--accent)]">magic</span> and momentum.
              </motion.h2>
            </div>
            <motion.p
              className="lg:col-span-2 font-body section-copy leading-relaxed lg:text-right"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              Four editions of electrifying innovation, unforgettable moments, and Kerala&apos;s brightest engineering minds.
            </motion.p>
          </div>
        </AnimateIn>

        {/* Mobile cards */}
        <div className="md:hidden grid grid-cols-1 gap-4 mb-12">
          {highlights.map((item, i) => (
            <motion.div
              key={`mobile-${item.id}`}
              className="w-full rounded-2xl overflow-hidden shadow-card bg-[#06231D]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                opacity: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              <div className="relative h-44">
                <Image src={item.img} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) calc(100vw - 2.5rem), 320px" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06231D] via-transparent to-transparent" />
              </div>
              <div className="bg-[#06231D] border border-[var(--border)] p-4">
                <p className="font-body font-medium text-sm text-[var(--text-primary)]">{item.title}</p>
                <p className="font-body text-xs text-[var(--text-secondary)] mt-1">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop overlapping stack */}
        <div className="hidden md:flex relative justify-center items-center min-h-[420px] mb-20">
          {highlights.map((item, i) => (
            <motion.div
              key={item.id}
              className="absolute w-[320px] rounded-2xl overflow-hidden shadow-card bg-[#06231D]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              animate={{ y: [-8, 8] }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                opacity: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 4.8 + i * 0.25, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: i * 0.22 },
              }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 20, transition: { duration: 0.25 } }}
              style={{
                zIndex: item.z,
                left: `${10 + i * 18}%`,
                top: `${i % 2 === 0 ? 0 : 60}px`,
                rotate: item.rotate,
                cursor: 'pointer',
              }}
            >
              <div className="relative h-44">
                <Image src={item.img} alt={item.title} fill className="object-cover" sizes="320px" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06231D] via-transparent to-transparent" />
              </div>
              <div className="bg-[#06231D] border border-[var(--border)] p-4">
                <p className="font-body font-medium text-sm text-[var(--text-primary)]">{item.title}</p>
                <p className="font-body text-xs text-[var(--text-secondary)] mt-1">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee ticker */}
        <div className="divider mb-6 md:mb-8" />
        <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
          <div className="px-4 sm:px-6 md:px-10">
            <motion.div
              className="flex gap-6 md:gap-8 whitespace-nowrap"
              animate={{ x: [0, '-50%'] }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            >
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span
                  key={i}
                  className="font-body font-medium text-xs md:text-sm uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-6 md:gap-8"
                >
                  {item}
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block" />
                </span>
              ))}
            </motion.div>
          </div>
        </div>
        <div className="divider mt-8" />
      </div>
    </section>
  )
}
