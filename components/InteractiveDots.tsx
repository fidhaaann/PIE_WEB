'use client'

import { useEffect } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'

export default function InteractiveDots() {
  const mouseX = useMotionValue(-9999)
  const mouseY = useMotionValue(-9999)
  const isActive = useMotionValue(0)

  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 24 })
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 24 })
  const smoothActive = useSpring(isActive, { stiffness: 200, damping: 30 })

  const maskImageStyle = useMotionTemplate`radial-gradient(350px circle at ${smoothX}px ${smoothY}px, black, transparent)`
  const opacityStyle = useMotionTemplate`${smoothActive}`

  useEffect(() => {
    const coarsePointer = window.matchMedia('(pointer: coarse)')

    const onPointerMove = (event: PointerEvent) => {
      if (coarsePointer.matches) return
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
      isActive.set(1)
    }

    const onPointerOut = (event: MouseEvent) => {
      if (event.relatedTarget === null) {
        isActive.set(0)
      }
    }

    const onBlur = () => {
      isActive.set(0)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('mouseout', onPointerOut)
    window.addEventListener('blur', onBlur)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('mouseout', onPointerOut)
      window.removeEventListener('blur', onBlur)
    }
  }, [isActive, mouseX, mouseY])

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1]" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, rgba(255,255,255,0.04) 1.5px, transparent 0)',
          backgroundSize: '36px 36px',
          backgroundPosition: 'center center',
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: opacityStyle,
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, var(--accent) 1.5px, transparent 0)',
          backgroundSize: '36px 36px',
          backgroundPosition: 'center center',
          WebkitMaskImage: maskImageStyle,
          maskImage: maskImageStyle,
        }}
      />
    </div>
  )
}
