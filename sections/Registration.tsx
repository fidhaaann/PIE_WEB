'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Clock, Users, MapPin } from 'lucide-react'
import AnimateIn from '@/components/AnimateIn'
import { useCountdown } from '@/hooks/useCountdown'

const EVENT_DATE = new Date('2026-06-14T09:00:00+05:30')

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl w-20 h-20 md:w-24 md:h-24 flex items-center justify-center"
      >
        <span className="font-body font-medium text-3xl md:text-4xl text-[var(--accent)]">
          {String(value).padStart(2, '0')}
        </span>
      </motion.div>
      <span className="font-body font-medium text-[0.65rem] text-[var(--text-muted)] uppercase tracking-widest mt-2">{label}</span>
    </div>
  )
}

export default function Registration() {
  const { days, hours, minutes, seconds } = useCountdown(EVENT_DATE)

  return (
    <section id="register" className="section-pad relative overflow-hidden">
      {/* Bg accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] h-[220px] md:w-[600px] md:h-[400px] rounded-full bg-[var(--accent)] opacity-[0.04] blur-[70px] md:blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Top urgency badge */}
        <AnimateIn className="flex justify-center mb-8">
          <div className="flex items-center gap-2 px-3 py-2 md:px-4 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/8 text-center">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="font-body font-medium text-[0.65rem] md:text-xs text-[var(--accent)] uppercase tracking-[0.18em] md:tracking-widest">
              Registrations Open · Limited Seats
            </span>
          </div>
        </AnimateIn>

        <AnimateIn className="section-intro">
          <h2
            className="font-display text-center text-[var(--text-primary)] section-title"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)' }}
          >
            Secure your <span className="editorial-italic">spot</span>
            <br />
            <span className="text-[var(--accent)]">at V-Fiesta 5.0</span>
          </h2>
          <p className="font-body section-copy text-center max-w-xl mx-auto">
            Join 2000+ engineers, innovators and dreamers for two days of non-stop action. Early bird ends soon!
          </p>
        </AnimateIn>

        {/* Countdown */}
        <AnimateIn type="scaleUp">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 md:gap-6 mb-12 md:mb-14 max-w-xs sm:max-w-none mx-auto">
            <CountdownBox value={days}    label="Days"    />
            <div className="hidden md:block font-body font-medium text-3xl text-[var(--text-muted)] self-start mt-4">:</div>
            <CountdownBox value={hours}   label="Hours"   />
            <div className="hidden md:block font-body font-medium text-3xl text-[var(--text-muted)] self-start mt-4">:</div>
            <CountdownBox value={minutes} label="Minutes" />
            <div className="hidden md:block font-body font-medium text-3xl text-[var(--text-muted)] self-start mt-4">:</div>
            <CountdownBox value={seconds} label="Seconds" />
          </div>
        </AnimateIn>

        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: Clock,   label: 'Duration',     value: '2 Days · June 14–15' },
            { icon: MapPin,  label: 'Venue',         value: 'Rajagiri Engineering, Kochi' },
            { icon: Users,   label: 'Max Capacity',  value: '2000 Participants' },
          ].map((item) => (
            <AnimateIn key={item.label} type="scaleUp">
              <div className="card-base flex items-center gap-4 p-5">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/12 border border-[var(--accent)]/20 flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-[var(--accent)]" />
                </div>
                <div>
                  <p className="font-body text-xs text-[var(--text-muted)] uppercase tracking-wider">{item.label}</p>
                  <p className="font-body font-medium text-sm text-[var(--text-primary)] mt-0.5">{item.value}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* CTA */}
        <AnimateIn className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="https://forms.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-register-dark text-base md:text-lg px-8 md:px-10 py-4 md:py-5 w-full sm:w-auto justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Register Now — Free <ArrowRight size={18} />
          </motion.a>
          <a href="#events" className="btn-ghost text-base px-8 py-4 md:py-5 w-full sm:w-auto justify-center">
            View All Events
          </a>
        </AnimateIn>

        <p className="font-body text-center text-xs text-[var(--text-muted)] mt-6">
          No registration fee · IEEE membership not required · Open to all engineering students
        </p>
      </div>
    </section>
  )
}
