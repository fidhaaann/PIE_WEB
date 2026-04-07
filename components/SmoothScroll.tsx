'use client'

import { useEffect, useRef, ReactNode } from 'react'

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<unknown>(null)

  useEffect(() => {
    let lenis: {
      raf: (time: number) => void
      destroy: () => void
    } | null = null
    let rafId: number

    const init = async () => {
      const Lenis = (await import('@studio-freight/lenis')).default
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      lenisRef.current = lenis

      const raf = (time: number) => {
        lenis?.raf(time)
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
