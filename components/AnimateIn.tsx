'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { fadeUp, slideLeft, slideRight, scaleUp } from '@/lib/animations'
import { Variants } from 'framer-motion'

type AnimationType = 'fadeUp' | 'slideLeft' | 'slideRight' | 'scaleUp'

const variantMap: Record<AnimationType, Variants> = {
  fadeUp,
  slideLeft,
  slideRight,
  scaleUp,
}

interface AnimateInProps {
  children: ReactNode
  type?: AnimationType
  delay?: number
  className?: string
  once?: boolean
}

export default function AnimateIn({
  children,
  type = 'fadeUp',
  delay = 0,
  className,
  once = true,
}: AnimateInProps) {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const inView = useInView(ref, { once, margin: '-40px 0px' })
  const variant = variantMap[type]

  const useLightMotion = Boolean(prefersReducedMotion)

  const hiddenState =
    type === 'slideLeft'
      ? { opacity: 0, x: -14 }
      : type === 'slideRight'
        ? { opacity: 0, x: 14 }
        : type === 'scaleUp'
          ? { opacity: 0, scale: 0.985 }
          : { opacity: 0, y: 14 }

  const visibleState = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      delay,
      duration: useLightMotion ? 0.34 : 0.46,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={useLightMotion ? undefined : variant}
      initial={useLightMotion ? hiddenState : 'hidden'}
      animate={inView ? (useLightMotion ? visibleState : 'visible') : (useLightMotion ? hiddenState : 'hidden')}
      transition={useLightMotion ? undefined : { delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
