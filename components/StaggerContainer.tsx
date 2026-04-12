'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { staggerContainer, staggerItem } from '@/lib/animations'

interface StaggerProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function StaggerContainer({ children, className, delay = 0 }: StaggerProps) {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })

  const useReducedMotionMode = Boolean(prefersReducedMotion)

  return (
    <motion.div
      ref={ref}
      variants={useReducedMotionMode ? undefined : staggerContainer}
      initial={useReducedMotionMode ? { opacity: 0, y: 10 } : 'hidden'}
      animate={inView ? (useReducedMotionMode ? { opacity: 1, y: 0 } : 'visible') : (useReducedMotionMode ? { opacity: 0, y: 10 } : 'hidden')}
      transition={useReducedMotionMode ? { duration: 0.3, delay } : { delayChildren: delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion()
  const useReducedMotionMode = Boolean(prefersReducedMotion)

  return (
    <motion.div
      variants={useReducedMotionMode ? undefined : staggerItem}
      initial={useReducedMotionMode ? { opacity: 0, y: 10 } : undefined}
      whileInView={useReducedMotionMode ? { opacity: 1, y: 0 } : undefined}
      viewport={useReducedMotionMode ? { once: true, amount: 0.18 } : undefined}
      transition={useReducedMotionMode ? { duration: 0.28, ease: [0.22, 1, 0.36, 1] } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  )
}
