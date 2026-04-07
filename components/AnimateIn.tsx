'use client'

import { motion, useInView } from 'framer-motion'
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
  const inView = useInView(ref, { once, margin: '-60px' })
  const variant = variantMap[type]

  return (
    <motion.div
      ref={ref}
      variants={variant}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
