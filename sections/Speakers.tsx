'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Linkedin, Twitter, Globe } from 'lucide-react'
import AnimateIn from '@/components/AnimateIn'
import { StaggerContainer, StaggerItem } from '@/components/StaggerContainer'

const speakers = [
  {
    id: 1,
    name: 'Dr. Priya Krishnan',
    role: 'Professor, IIT Bombay',
    topic: 'Smart Grid Technologies',
    bio: 'Dr. Priya Krishnan is a leading researcher in smart grid systems and power electronics at IIT Bombay with over 20 years of experience. She has authored 150+ research papers and serves on the IEEE Power & Energy Society Technical Committee.',
    img: 'https://ui-avatars.com/api/?name=Priya+Krishnan&background=076653&color=E3EF26&size=256&bold=true',
    linkedin: '#',
    twitter: '#',
    tag: 'Keynote',
  },
  {
    id: 2,
    name: 'Mr. Rahul Menon',
    role: 'CTO, Greenko Group',
    topic: 'Renewable Energy Storage',
    bio: 'Rahul Menon heads technology at Greenko, India\'s largest renewable energy company. He has led over 3 GW of wind and solar projects across 8 states and is passionate about making India carbon-neutral by 2050.',
    img: 'https://ui-avatars.com/api/?name=Rahul+Menon&background=0C342C&color=E3EF26&size=256&bold=true',
    linkedin: '#',
    twitter: '#',
    tag: 'Industry',
  },
  {
    id: 3,
    name: 'Dr. Anita Varma',
    role: 'Scientist, ISRO',
    topic: 'Power Systems in Space',
    bio: 'Dr. Anita Varma is a senior scientist at ISRO\'s Space Applications Centre, specialising in spacecraft power systems. She was part of the Chandrayaan-3 mission team responsible for lunar power management.',
    img: 'https://ui-avatars.com/api/?name=Anita+Varma&background=076653&color=E3EF26&size=256&bold=true',
    linkedin: '#',
    twitter: '#',
    tag: 'Keynote',
  },
  {
    id: 4,
    name: 'Mr. Kevin Thomas',
    role: 'Founder, VoltEdge Labs',
    topic: 'EV Charging Infrastructure',
    bio: 'Kevin Thomas founded VoltEdge Labs after graduating from CUSAT and has built 200+ EV charging stations across Kerala & Tamil Nadu. He is a Forbes 30 Under 30 Asia awardee and active IEEE volunteer.',
    img: 'https://ui-avatars.com/api/?name=Kevin+Thomas&background=0C342C&color=E3EF26&size=256&bold=true',
    linkedin: '#',
    twitter: '#',
    tag: 'Startup',
  },
  {
    id: 5,
    name: 'Dr. Sujith Nair',
    role: 'Assoc. Professor, NIT Calicut',
    topic: 'Power Electronics & Drives',
    bio: 'Dr. Sujith Nair is the recipient of the INAE Young Engineer Award 2024. His work on high-frequency power converters has been adopted in industrial motor drive applications across Southeast Asia.',
    img: 'https://ui-avatars.com/api/?name=Sujith+Nair&background=076653&color=E3EF26&size=256&bold=true',
    linkedin: '#',
    twitter: '#',
    tag: 'Academic',
  },
  {
    id: 6,
    name: 'Ms. Divya Chandran',
    role: 'Senior Engineer, KSEB',
    topic: 'Grid Modernisation in Kerala',
    bio: 'Divya Chandran has led KSEB\'s smart metering initiative covering 2 million households and is instrumental in Kerala\'s transition to advanced distribution management systems. She heads the R&D wing at KSEB.',
    img: 'https://ui-avatars.com/api/?name=Divya+Chandran&background=0C342C&color=E3EF26&size=256&bold=true',
    linkedin: '#',
    twitter: '#',
    tag: 'Utility',
  },
]

type Speaker = typeof speakers[0]

export default function Speakers() {
  const [selected, setSelected] = useState<Speaker | null>(null)

  return (
    <section id="speakers" className="section-pad">
      <div className="max-w-7xl mx-auto">
        <AnimateIn>
          <p className="section-label">Who You&apos;ll Hear</p>
          <h2
            className="font-display font-extrabold text-[var(--text-primary)] mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            World-class
            <span className="text-[var(--accent)]"> speakers.</span>
          </h2>
          <p className="font-body text-[var(--text-secondary)] max-w-lg mb-12 text-sm md:text-base">
            Learn from researchers, entrepreneurs, and engineers shaping the future of power &amp; energy.
          </p>
        </AnimateIn>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {speakers.map((sp) => (
            <StaggerItem key={sp.id}>
              <motion.button
                onClick={() => setSelected(sp)}
                className="group w-full text-left card-base overflow-hidden"
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={sp.img}
                    alt={sp.name}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#06231D]/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs font-display font-700 text-[var(--accent)] px-3 py-1 border border-[var(--accent)]/40 rounded-full">
                      View Bio
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="tag text-[0.65rem] mb-2">{sp.tag}</div>
                  <p className="font-display font-700 text-sm text-[var(--text-primary)] leading-tight">{sp.name}</p>
                  <p className="font-body text-[0.7rem] text-[var(--text-muted)] mt-0.5 leading-tight">{sp.role}</p>
                </div>
              </motion.button>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="fixed inset-0 z-[201] flex items-center justify-center p-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="glass rounded-3xl max-w-lg w-full p-8 relative"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-5 right-5 p-2 rounded-xl hover:bg-white/10 transition-colors text-[var(--text-secondary)]"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center gap-5 mb-6">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                    <Image src={selected.img} alt={selected.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div>
                    <div className="tag mb-2">{selected.tag}</div>
                    <h3 className="font-display font-800 text-xl text-[var(--text-primary)]">{selected.name}</h3>
                    <p className="font-body text-sm text-[var(--text-secondary)]">{selected.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 bg-[var(--accent)] rounded-full" />
                  <p className="font-display font-700 text-sm text-[var(--accent)]">Topic: {selected.topic}</p>
                </div>
                <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed">{selected.bio}</p>
                <div className="flex gap-3 mt-6">
                  <a href={selected.linkedin} className="btn-ghost py-2 px-4 text-xs flex items-center gap-1.5">
                    <Linkedin size={14} /> LinkedIn
                  </a>
                  <a href={selected.twitter} className="btn-ghost py-2 px-4 text-xs flex items-center gap-1.5">
                    <Twitter size={14} /> Twitter
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
