'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, ReactNode } from 'react'
import { staggerContainer, staggerItem } from '@/lib/animations'

interface StaggerProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function StaggerContainer({ children, className, delay = 0 }: StaggerProps) {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const [isMobileLike, setIsMobileLike] = useState(false)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })

  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px), (pointer: coarse)')
    const update = () => setIsMobileLike(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const useLightMotion = Boolean(prefersReducedMotion) || isMobileLike

  return (
    <motion.div
      ref={ref}
      variants={useLightMotion ? undefined : staggerContainer}
      initial={useLightMotion ? { opacity: 0, y: 10 } : 'hidden'}
      animate={inView ? (useLightMotion ? { opacity: 1, y: 0 } : 'visible') : (useLightMotion ? { opacity: 0, y: 10 } : 'hidden')}
      transition={useLightMotion ? { duration: 0.3, delay } : { delayChildren: delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion()
  const [isMobileLike, setIsMobileLike] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px), (pointer: coarse)')
    const update = () => setIsMobileLike(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const useLightMotion = Boolean(prefersReducedMotion) || isMobileLike

  return (
    <motion.div
      variants={useLightMotion ? undefined : staggerItem}
      initial={useLightMotion ? { opacity: 0, y: 10 } : undefined}
      whileInView={useLightMotion ? { opacity: 1, y: 0 } : undefined}
      viewport={useLightMotion ? { once: true, amount: 0.18 } : undefined}
      transition={useLightMotion ? { duration: 0.28, ease: [0.22, 1, 0.36, 1] } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  )
}
