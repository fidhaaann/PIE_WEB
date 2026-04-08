'use client'

import { useEffect, useRef, ReactNode } from 'react'

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<unknown>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (prefersReducedMotion || isTouchDevice) return

    let lenis: {
      raf: (time: number) => void
      destroy: () => void
    } | null = null
    let scrollTriggerUpdate: (() => void) | null = null
    let rafId: number

    const init = async () => {
      const Lenis = (await import('@studio-freight/lenis')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      scrollTriggerUpdate = () => ScrollTrigger.update()

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      lenisRef.current = lenis

      const raf = () => {
        lenis?.raf(performance.now())
        scrollTriggerUpdate?.()
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    }

    init()

    return () => {
      cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])

  return <>{children}</>
}
