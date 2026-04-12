'use client'

import type Lenis from 'lenis'
import { useEffect, ReactNode } from 'react'

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let lenis: Lenis | null = null
    let rafId: number | null = null
    let isRunning = false
    let resizeTimer: number | null = null

    type Runtime = {
      destroy: () => void
    }

    const runtimeWindow = window as typeof window & {
      __pieLenisRuntime?: Runtime
    }

    if (runtimeWindow.__pieLenisRuntime) {
      return () => {
        runtimeWindow.__pieLenisRuntime?.destroy()
        delete runtimeWindow.__pieLenisRuntime
      }
    }

    const init = async () => {
      const Lenis = (await import('lenis')).default
      const scrollTriggerModule = await import('gsap/ScrollTrigger')
      const gsapModule = await import('gsap')
      const ScrollTrigger: any = (scrollTriggerModule as any).ScrollTrigger ?? (scrollTriggerModule as any).default
      const gsap: any = (gsapModule as any).gsap ?? (gsapModule as any).default
      const scroller = document.documentElement

      gsap.registerPlugin(ScrollTrigger)

      const isMobile = window.matchMedia('(max-width: 767px)').matches
      const lerp = isMobile ? 0.1 : 0.12

      lenis = new Lenis({
        duration: 1.2,
        lerp,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: true,
        touchMultiplier: 1,
        wheelMultiplier: 1,
      })

      lenis.on('scroll', ScrollTrigger.update)

      const updateLenis = (time: number) => {
        lenis?.raf(time * 1000)
      }

      gsap.ticker.add(updateLenis)
      gsap.ticker.lagSmoothing(0)

      const batchTargets = gsap.utils?.toArray('[data-scroll-batch]') ?? []
      if (batchTargets.length > 0) {
        ScrollTrigger.batch(batchTargets, {
          start: 'top 88%',
          end: 'bottom 12%',
          onEnter: (batch: any[]) => {
            batch.forEach((el: any) => {
              el.style.willChange = 'transform, opacity'
            })
          },
          onLeaveBack: (batch: any[]) => {
            batch.forEach((el: any) => {
              el.style.willChange = 'auto'
            })
          },
        })
      }

      runtimeWindow.__pieLenisRuntime = {
        destroy: () => {
          gsap.ticker.remove(updateLenis)
          lenis?.off('scroll', ScrollTrigger.update)
          lenis?.destroy()
          lenis = null
        },
      }
    }

    init()

    return () => {
      runtimeWindow.__pieLenisRuntime?.destroy()
      delete runtimeWindow.__pieLenisRuntime
    }
  }, [])

  return <>{children}</>
}
