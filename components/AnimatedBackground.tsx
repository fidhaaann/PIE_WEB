'use client'

import { useEffect, useMemo, useRef } from 'react'

type Layer = {
  width: string
  left: string
  opacity: number
  depth: number
  blur: number
  duration: number
  delay: number
  gradient: string
}

const LAYERS: Layer[] = [
  {
    width: '8vw',
    left: '8%',
    opacity: 0.38,
    depth: 0.35,
    blur: 8,
    duration: 26,
    delay: -8,
    gradient:
      'linear-gradient(180deg, rgba(7,102,83,0.16) 0%, rgba(10,85,68,0.34) 42%, rgba(12,52,44,0.72) 100%)',
  },
  {
    width: '11vw',
    left: '22%',
    opacity: 0.44,
    depth: 0.5,
    blur: 10,
    duration: 30,
    delay: -14,
    gradient:
      'linear-gradient(180deg, rgba(7,102,83,0.08) 0%, rgba(7,102,83,0.28) 48%, rgba(10,85,68,0.66) 100%)',
  },
  {
    width: '7vw',
    left: '36%',
    opacity: 0.34,
    depth: 0.28,
    blur: 7,
    duration: 28,
    delay: -5,
    gradient:
      'linear-gradient(180deg, rgba(10,85,68,0.1) 0%, rgba(12,52,44,0.44) 55%, rgba(0,0,0,0.82) 100%)',
  },
  {
    width: '13vw',
    left: '48%',
    opacity: 0.48,
    depth: 0.8,
    blur: 12,
    duration: 32,
    delay: -12,
    gradient:
      'linear-gradient(180deg, rgba(7,102,83,0.1) 0%, rgba(10,85,68,0.4) 42%, rgba(12,52,44,0.8) 100%)',
  },
  {
    width: '8vw',
    left: '64%',
    opacity: 0.36,
    depth: 0.42,
    blur: 9,
    duration: 24,
    delay: -10,
    gradient:
      'linear-gradient(180deg, rgba(7,102,83,0.08) 0%, rgba(7,102,83,0.22) 50%, rgba(12,52,44,0.74) 100%)',
  },
  {
    width: '10vw',
    left: '76%',
    opacity: 0.4,
    depth: 0.56,
    blur: 11,
    duration: 29,
    delay: -17,
    gradient:
      'linear-gradient(180deg, rgba(10,85,68,0.12) 0%, rgba(7,102,83,0.3) 46%, rgba(12,52,44,0.72) 100%)',
  },
]

export default function AnimatedBackground() {
  const barRefs = useRef<Array<HTMLDivElement | null>>([])
  const rafRef = useRef<number | null>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  const layers = useMemo(() => LAYERS, [])

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5
      const ny = event.clientY / window.innerHeight - 0.5
      target.current.x = nx
      target.current.y = ny
    }

    const animate = (time: number) => {
      const smoothing = 0.085
      current.current.x += (target.current.x - current.current.x) * smoothing
      current.current.y += (target.current.y - current.current.y) * smoothing

      for (let i = 0; i < layers.length; i += 1) {
        const bar = barRefs.current[i]
        if (!bar) continue

        const layer = layers[i]
        const driftX = Math.sin(time * 0.00018 + i * 0.82) * 8
        const driftY = Math.cos(time * 0.00014 + i * 0.63) * 10
        const parallaxX = current.current.x * 38 * layer.depth
        const parallaxY = current.current.y * 24 * layer.depth

        bar.style.transform = `translate3d(${(driftX + parallaxX).toFixed(2)}px, ${(driftY + parallaxY).toFixed(2)}px, 0)`
      }

      rafRef.current = window.requestAnimationFrame(animate)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })

    rafRef.current = window.requestAnimationFrame(animate)

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [layers])

  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="ambient-bg__base" />
      <div className="ambient-bg__center-glow" />
      <div className="ambient-bg__bars">
        {layers.map((layer, index) => (
          <div
            key={`${layer.left}-${layer.width}`}
            ref={(el) => {
              barRefs.current[index] = el
            }}
            className="ambient-bg__bar"
            style={{
              left: layer.left,
              width: layer.width,
              opacity: layer.opacity,
              filter: `blur(${layer.blur}px)`,
              background: layer.gradient,
              animationDuration: `${layer.duration}s`,
              animationDelay: `${layer.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="ambient-bg__noise" />
    </div>
  )
}
