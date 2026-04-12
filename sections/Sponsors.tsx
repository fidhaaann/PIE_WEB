'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import AnimateIn from '@/components/AnimateIn'

const tiers = [
  {
    label: 'Gold Sponsors',
    color: '#E3EF26',
    sponsors: [
      { name: 'KSEB',        img: 'https://ui-avatars.com/api/?name=KSEB&background=E3EF26&color=06231D&size=512&bold=true' },
      { name: 'Greenko',     img: 'https://ui-avatars.com/api/?name=Greenko&background=E3EF26&color=06231D&size=512&bold=true' },
    ],
  },
  {
    label: 'Silver Sponsors',
    color: '#76d7b0',
    sponsors: [
      { name: 'VoltEdge',    img: 'https://ui-avatars.com/api/?name=VoltEdge&background=76d7b0&color=06231D&size=512&bold=true' },
      { name: 'Renew Power', img: 'https://ui-avatars.com/api/?name=Renew&background=76d7b0&color=06231D&size=512&bold=true' },
      { name: 'CESA Tech',   img: 'https://ui-avatars.com/api/?name=CESA&background=76d7b0&color=06231D&size=512&bold=true' },
    ],
  },
  {
    label: 'Bronze Sponsors',
    color: '#f9a848',
    sponsors: [
      { name: 'Zyod Labs',   img: 'https://ui-avatars.com/api/?name=Zyod&background=f9a848&color=06231D&size=512&bold=true' },
      { name: 'InnoHacks',   img: 'https://ui-avatars.com/api/?name=InnoHacks&background=f9a848&color=06231D&size=512&bold=true' },
      { name: 'ElecTrack',   img: 'https://ui-avatars.com/api/?name=ElecTrack&background=f9a848&color=06231D&size=512&bold=true' },
      { name: 'PowerSync',   img: 'https://ui-avatars.com/api/?name=PowerSync&background=f9a848&color=06231D&size=512&bold=true' },
    ],
  },
]

const carouselTransition = (duration: number) => ({
  duration,
  repeat: Infinity,
  ease: 'linear' as const,
})

function SponsorCarouselRow({
  tier,
  reverse = false,
}: {
  tier: (typeof tiers)[number]
  reverse?: boolean
}) {
  const items = [...tier.sponsors, ...tier.sponsors, ...tier.sponsors]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1" style={{ background: `${tier.color}40` }} />
        <span
          className="font-body font-medium text-sm uppercase tracking-widest"
          style={{ color: tier.color }}
        >
          {tier.label}
        </span>
        <div className="h-px flex-1" style={{ background: `${tier.color}40` }} />
      </div>

      <div className="relative overflow-hidden rounded-[30px] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] px-2 py-4 md:px-3 md:py-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-24 bg-[linear-gradient(90deg,#0a0a09_0%,rgba(10,10,9,0.96)_40%,rgba(10,10,9,0)_100%)]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-24 bg-[linear-gradient(270deg,#0a0a09_0%,rgba(10,10,9,0.96)_40%,rgba(10,10,9,0)_100%)]" />

        <motion.div
          className="flex w-max items-stretch gap-4 md:gap-5"
          animate={{ x: reverse ? ['-33.333%', '0%'] : ['0%', '-33.333%'] }}
          transition={carouselTransition(24 + tier.sponsors.length * 1.4)}
          whileHover={{ animationPlayState: 'paused' }}
          style={{ willChange: 'transform' }}
        >
          {items.map((sp, index) => (
            <motion.div
              key={`${tier.label}-${sp.name}-${index}`}
              className="group relative flex-shrink-0 w-[210px] sm:w-[230px] md:w-[250px] lg:w-[260px] xl:w-[270px] overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.10)] bg-[#111110] shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
              whileHover={{ scale: 1.05, y: -3 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'center center' }}
            >
              <div className="relative h-[230px] sm:h-[240px] md:h-[250px] overflow-hidden">
                <Image
                  src={sp.img}
                  alt={sp.name}
                  fill
                  className="object-cover transition-all duration-500 ease-out grayscale group-hover:grayscale-0 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 210px, (max-width: 768px) 230px, (max-width: 1024px) 250px, 270px"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,9,0.08)_0%,rgba(10,10,9,0.34)_100%)] transition-opacity duration-500 group-hover:opacity-70" />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(circle at center, rgba(227,239,38,0.10) 0%, rgba(63,173,146,0.08) 35%, rgba(10,10,9,0) 72%)', filter: 'blur(12px)' }} />
              </div>

              <div className="relative px-4 py-4 md:px-5 md:py-5 bg-[linear-gradient(180deg,rgba(10,10,9,0.18),rgba(10,10,9,0.65))]">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-body font-medium text-sm md:text-[0.95rem] text-[var(--text-primary)]">
                    {sp.name}
                  </span>
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] opacity-70 shadow-[0_0_16px_rgba(227,239,38,0.35)]" />
                </div>
                <p className="mt-2 font-body text-[0.72rem] uppercase tracking-[0.18em] text-[var(--text-muted)] opacity-80">
                  Hover for color
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default function Sponsors() {
  return (
    <section id="sponsors" className="section-pad">
      <div className="max-w-7xl mx-auto">
        <AnimateIn className="section-intro">
          <p className="section-label">Our Supporters</p>
          <h2
            className="font-display text-[var(--text-primary)] section-title"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Backed by
            <span className="editorial-italic text-[var(--accent)]"> industry leaders.</span>
          </h2>
          <p className="font-body section-copy md:max-w-md">
            V-Fiesta 5.0 is powered by organisations committed to engineering excellence and innovation.
          </p>
        </AnimateIn>

        <div className="space-y-12 md:space-y-14">
          {tiers.map((tier, index) => (
            <AnimateIn key={tier.label}>
              <SponsorCarouselRow tier={tier} reverse={index % 2 === 1} />
            </AnimateIn>
          ))}
        </div>

        {/* Become a sponsor CTA */}
        <AnimateIn className="mt-16 text-center">
          <div className="card-base inline-block px-5 md:px-8 py-5 md:py-6 rounded-3xl max-w-full">
            <p className="font-display text-lg text-[var(--text-primary)] mb-2">
              Want to sponsor V-Fiesta 5.0?
            </p>
            <p className="font-body text-sm text-[var(--text-secondary)] mb-4">
              Get your brand in front of 2000+ engineering students and professionals.
            </p>
            <a href="mailto:pie@ieee.org" className="btn-primary py-2.5 px-6 text-sm w-full sm:w-auto justify-center text-[#06231D]" style={{ color: '#06231D' }}>
              Get in Touch
            </a>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
