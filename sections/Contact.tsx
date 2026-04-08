'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, ArrowUpRight } from 'lucide-react'
import AnimateIn from '@/components/AnimateIn'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Mock submit
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="section-pad">
      <div className="max-w-7xl mx-auto">
        <AnimateIn className="section-intro">
          <p className="section-label">Get in Touch</p>
          <h2
            className="font-display text-[var(--text-primary)] section-title"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            We&apos;d love to
            <span className="editorial-italic text-[var(--accent)]"> hear from you.</span>
          </h2>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 mt-10 md:mt-12">
          {/* Left: info */}
          <AnimateIn type="slideLeft">
            <div className="space-y-8">
              {[
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'pie.keralasection@ieee.org',
                  href: 'mailto:pie.keralasection@ieee.org',
                },
                {
                  icon: Phone,
                  label: 'Phone',
                  value: '+91 98765 43210',
                  href: 'tel:+919876543210',
                },
                {
                  icon: MapPin,
                  label: 'Venue',
                  value: 'Rajagiri School of Engineering & Technology, Kakkanad, Kochi, Kerala – 682039',
                  href: 'https://maps.google.com',
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.icon === MapPin ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/12 border border-[var(--accent)]/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[var(--accent)]/20 transition-colors">
                    <item.icon size={18} className="text-[var(--accent)]" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-[var(--text-muted)] uppercase tracking-widest">{item.label}</p>
                    <p className="font-body font-medium text-sm text-[var(--text-primary)] mt-0.5 group-hover:text-[var(--accent)] transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}

              {/* Socials */}
              <div>
                <p className="font-body text-xs text-[var(--text-muted)] uppercase tracking-widest mb-4">Follow Us</p>
                <div className="flex gap-3">
                  {[
                    { icon: ArrowUpRight, href: 'https://instagram.com', label: 'Instagram' },
                    { icon: ArrowUpRight, href: 'https://linkedin.com', label: 'LinkedIn' },
                    { icon: ArrowUpRight, href: 'https://twitter.com', label: 'Twitter' },
                  ].map((soc) => (
                    <motion.a
                      key={soc.label}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={soc.label}
                      className="w-10 h-10 rounded-xl glass border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <soc.icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="card-base overflow-hidden rounded-2xl h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={32} className="text-[var(--accent)] mx-auto mb-2" />
                  <p className="font-body font-medium text-sm text-[var(--text-primary)]">Rajagiri Engineering</p>
                  <p className="font-body text-xs text-[var(--text-muted)]">Kakkanad, Kochi, Kerala</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-xs font-body font-medium text-[var(--accent)] hover:underline"
                  >
                    Open in Maps →
                  </a>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Right: form */}
          <AnimateIn type="slideRight">
            <form onSubmit={handleSubmit} className="card-base p-5 sm:p-8 rounded-3xl space-y-5">
              <h3 className="font-display text-xl text-[var(--text-primary)]">Send a Message</h3>

              {[
                { id: 'name',    label: 'Your Name',    type: 'text',  placeholder: 'e.g. Arjun Kumar' },
                { id: 'email',   label: 'Email Address', type: 'email', placeholder: 'arjun@college.edu' },
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block font-body text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    {field.label}
                  </label>
                  <input
                    suppressHydrationWarning
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                    value={form[field.id as 'name' | 'email']}
                    onChange={e => setForm(f => ({ ...f, [field.id]: e.target.value }))}
                    className="w-full bg-[rgba(245,245,240,0.05)] border border-[var(--border)] rounded-xl px-4 py-3 font-body text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]/60 focus:bg-[rgba(245,245,240,0.08)] transition-all"
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block font-body text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  suppressHydrationWarning
                  id="message"
                  rows={4}
                  placeholder="Your message or query..."
                  required
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full bg-[rgba(245,245,240,0.05)] border border-[var(--border)] rounded-xl px-4 py-3 font-body text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]/60 focus:bg-[rgba(245,245,240,0.08)] transition-all resize-none"
                />
              </div>

              <motion.button
                type="submit"
                className="btn-primary w-full justify-center py-4 text-[#06231D]"
                style={{ color: '#06231D' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {sent ? '✓ Message Sent!' : (
                  <>Send Message <Send size={15} /></>
                )}
              </motion.button>
            </form>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
