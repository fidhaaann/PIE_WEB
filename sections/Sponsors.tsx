'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import AnimateIn from '@/components/AnimateIn'

const sponsors = [
  { name: 'KSEB', img: 'https://ui-avatars.com/api/?name=KSEB&background=E3EF26&color=06231D&size=512&bold=true' },
  { name: 'Greenko', img: 'https://ui-avatars.com/api/?name=Greenko&background=E3EF26&color=06231D&size=512&bold=true' },
  { name: 'VoltEdge', img: 'https://ui-avatars.com/api/?name=VoltEdge&background=76d7b0&color=06231D&size=512&bold=true' },
  { name: 'Renew Power', img: 'https://ui-avatars.com/api/?name=Renew&background=76d7b0&color=06231D&size=512&bold=true' },
  { name: 'CESA Tech', img: 'https://ui-avatars.com/api/?name=CESA&background=76d7b0&color=06231D&size=512&bold=true' },
  { name: 'Zyod Labs', img: 'https://ui-avatars.com/api/?name=Zyod&background=f9a848&color=06231D&size=512&bold=true' },
]

export default function Sponsors() {
  return (
    <section id="sponsors" className="section-pad notebook-paper">
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

        <AnimateIn>
          <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-3xl mx-auto">
            {sponsors.map((sp) => (
              <motion.div
                key={sp.name}
                className="relative flex items-center justify-center rounded-[16px] border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.02)] p-4 md:p-5"
                whileHover={{ scale: 1.03, y: -1 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative h-[74px] w-full max-w-[160px] sm:h-[82px] md:h-[92px] md:max-w-[180px]">
                  <Image
                    src={sp.img}
                    alt={sp.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 180px"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </AnimateIn>

        {/* Become a sponsor CTA */}
        <AnimateIn className="mt-10 text-center">
          <div className="card-base inline-block px-4 md:px-6 py-4 md:py-5 rounded-2xl max-w-full">
            <p className="font-display text-base md:text-lg text-[var(--text-primary)] mb-1.5">
              Want to sponsor V-Fiesta 5.0?
            </p>
            <p className="font-body text-[0.86rem] md:text-sm text-[var(--text-secondary)] mb-3">
              Get your brand in front of 2000+ engineering students and professionals.
            </p>
            <a href="mailto:pie@ieee.org" className="btn-primary py-2 px-5 text-[0.82rem] md:text-sm w-full sm:w-auto justify-center text-[#06231D]" style={{ color: '#06231D' }}>
              Get in Touch
            </a>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
