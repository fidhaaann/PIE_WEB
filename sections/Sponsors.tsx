'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import AnimateIn from '@/components/AnimateIn'
import { StaggerContainer, StaggerItem } from '@/components/StaggerContainer'

const tiers = [
  {
    label: 'Gold Sponsors',
    color: '#E3EF26',
    sponsors: [
      { name: 'KSEB',        img: 'https://ui-avatars.com/api/?name=KSEB&background=E3EF26&color=06231D&size=128&bold=true' },
      { name: 'Greenko',     img: 'https://ui-avatars.com/api/?name=Greenko&background=E3EF26&color=06231D&size=128&bold=true' },
    ],
  },
  {
    label: 'Silver Sponsors',
    color: '#76d7b0',
    sponsors: [
      { name: 'VoltEdge',    img: 'https://ui-avatars.com/api/?name=VoltEdge&background=76d7b0&color=06231D&size=128&bold=true' },
      { name: 'Renew Power', img: 'https://ui-avatars.com/api/?name=Renew&background=76d7b0&color=06231D&size=128&bold=true' },
      { name: 'CESA Tech',   img: 'https://ui-avatars.com/api/?name=CESA&background=76d7b0&color=06231D&size=128&bold=true' },
    ],
  },
  {
    label: 'Bronze Sponsors',
    color: '#f9a848',
    sponsors: [
      { name: 'Zyod Labs',   img: 'https://ui-avatars.com/api/?name=Zyod&background=f9a848&color=06231D&size=128&bold=true' },
      { name: 'InnoHacks',   img: 'https://ui-avatars.com/api/?name=InnoHacks&background=f9a848&color=06231D&size=128&bold=true' },
      { name: 'ElecTrack',   img: 'https://ui-avatars.com/api/?name=ElecTrack&background=f9a848&color=06231D&size=128&bold=true' },
      { name: 'PowerSync',   img: 'https://ui-avatars.com/api/?name=PowerSync&background=f9a848&color=06231D&size=128&bold=true' },
    ],
  },
]

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

        <div className="space-y-12">
          {tiers.map((tier) => (
            <div key={tier.label}>
              <AnimateIn>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1" style={{ background: `${tier.color}40` }} />
                  <span
                    className="font-body font-medium text-sm uppercase tracking-widest"
                    style={{ color: tier.color }}
                  >
                    {tier.label}
                  </span>
                  <div className="h-px flex-1" style={{ background: `${tier.color}40` }} />
                </div>
              </AnimateIn>
              <StaggerContainer className="flex flex-wrap justify-center gap-3 md:gap-4">
                {tier.sponsors.map((sp) => (
                  <StaggerItem key={sp.name}>
                    <motion.div
                      className="glass rounded-2xl p-4 md:p-6 flex flex-col items-center gap-3 cursor-pointer min-w-[120px] md:min-w-[140px]"
                      whileHover={{
                        scale: 1.06,
                        borderColor: `${tier.color}60`,
                        boxShadow: `0 8px 32px ${tier.color}20`,
                      }}
                    >
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden relative">
                        <Image src={sp.img} alt={sp.name} fill className="object-cover" sizes="64px" />
                      </div>
                      <span className="font-body font-medium text-xs text-[var(--text-secondary)]">{sp.name}</span>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
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
