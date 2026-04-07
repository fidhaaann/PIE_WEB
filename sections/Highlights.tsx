'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
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
  return (
    <section id="highlights" className="section-pad overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <AnimateIn>
          <p className="section-label">Past Editions</p>
          <h2
            className="font-display font-extrabold text-[var(--text-primary)] mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Relive the
            <span className="text-[var(--accent)]"> magic.</span>
          </h2>
          <p className="font-body text-[var(--text-secondary)] max-w-lg mb-16 text-sm md:text-base">
            Four editions of electrifying innovation, unforgettable moments, and Kerala's brightest engineering minds.
          </p>
        </AnimateIn>

        {/* Overlapping stacked cards */}
        <div className="relative flex justify-center items-center min-h-[420px] mb-20">
          {highlights.map((item, i) => (
            <motion.div
              key={item.id}
              className="absolute w-[260px] md:w-[320px] rounded-2xl overflow-hidden shadow-card"
              initial={{ opacity: 0, y: 50, rotate: item.rotate }}
              whileInView={{ opacity: 1, y: 0, rotate: item.rotate }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 20, transition: { duration: 0.25 } }}
              style={{
                zIndex: item.z,
                left: `${10 + i * 18}%`,
                top: `${i % 2 === 0 ? 0 : 60}px`,
                cursor: 'pointer',
              }}
            >
              <div className="relative h-44">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06231D] via-transparent to-transparent" />
              </div>
              <div className="bg-[var(--card-bg)] border border-[var(--border)] p-4">
                <p className="font-display font-700 text-sm text-[var(--text-primary)]">{item.title}</p>
                <p className="font-body text-xs text-[var(--text-secondary)] mt-1">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee ticker */}
        <div className="divider mb-8" />
        <div className="overflow-hidden relative">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [0, '-50%'] }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          >
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="font-display font-700 text-sm uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-8"
              >
                {item}
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block" />
              </span>
            ))}
          </motion.div>
        </div>
        <div className="divider mt-8" />
      </div>
    </section>
  )
}
