'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import AnimateIn from '@/components/AnimateIn'
import GlareHover from '@/components/GlareHover'
import logo1 from '@/photo/logo1.png'
import logo2 from '@/photo/logo2.png'
import logo3 from '@/photo/logo3.png'
import logo4 from '@/photo/logo4.png'

const sponsors = [
  { name: 'Sponsor 1', img: logo1 },
  { name: 'Sponsor 2', img: logo2 },
  { name: 'Sponsor 3', img: logo3 },
  { name: 'Sponsor 4', img: logo4 },
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 max-w-5xl mx-auto">
            {sponsors.map((sp) => (
              <motion.div
                key={sp.name}
                className="relative"
                whileHover={{ scale: 1.03, y: -1 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlareHover
                  width="100%"
                  height="clamp(220px, 26vw, 280px)"
                  background="rgba(255,255,255,0.03)"
                  borderRadius="16px"
                  borderColor="transparent"
                  glareColor="#ffffff"
                  glareOpacity={0.35}
                  glareAngle={-30}
                  glareSize={190}
                  transitionDuration={1000}
                  playOnce={false}
                >
                  <div className="flex h-[165px] w-[165px] items-center justify-center p-3 md:h-[190px] md:w-[190px] md:p-4">
                    <Image
                      src={sp.img}
                      alt={sp.name}
                      width={170}
                      height={170}
                      className="h-auto w-full max-w-[170px] object-contain"
                      sizes="170px"
                    />
                  </div>
                </GlareHover>
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
