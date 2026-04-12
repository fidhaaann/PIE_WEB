'use client'

import { useEffect, useRef, useCallback } from 'react'

/* ─── Blob configuration ─────────────────────────────────────── */
interface BlobConfig {
  id: number
  /** normalised base position [0-1] */
  bx: number
  by: number
  /** orbit radii in px-equivalent (scaled by vmin later in JS) */
  rx: number
  ry: number
  /** orbit speed (radians/s) */
  speed: number
  /** phase offset so blobs don't move in sync */
  phase: number
  /** depth factor – how strongly the blob reacts to cursor pull */
  depth: number
  size: number   // vmin
  colorA: string
  colorB: string
  opacity: number
  blur: number   // px
}

const BLOBS: BlobConfig[] = [
  {
    id: 0,
    bx: 0.18, by: 0.28,
    rx: 9, ry: 7,
    speed: 0.18, phase: 0,
    depth: 0.55,
    size: 44,
    colorA: '#076653', colorB: '#3fad92',
    opacity: 0.45, blur: 56,
  },
  {
    id: 1,
    bx: 0.72, by: 0.20,
    rx: 11, ry: 8,
    speed: 0.13, phase: 1.2,
    depth: 0.7,
    size: 52,
    colorA: '#065c4a', colorB: '#6ec1ac',
    opacity: 0.38, blur: 64,
  },
  {
    id: 2,
    bx: 0.50, by: 0.65,
    rx: 14, ry: 9,
    speed: 0.10, phase: 2.4,
    depth: 0.45,
    size: 60,
    colorA: '#054d3d', colorB: '#9dd4c6',
    opacity: 0.32, blur: 72,
  },
  {
    id: 3,
    bx: 0.82, by: 0.72,
    rx: 8, ry: 11,
    speed: 0.16, phase: 3.8,
    depth: 0.8,
    size: 38,
    colorA: '#b0c018', colorB: '#E3EF26',
    opacity: 0.18, blur: 48,
  },
  {
    id: 4,
    bx: 0.12, by: 0.80,
    rx: 10, ry: 6,
    speed: 0.22, phase: 0.8,
    depth: 0.35,
    size: 34,
    colorA: '#0C342C', colorB: '#3fad92',
    opacity: 0.5, blur: 44,
  },
  {
    id: 5,
    bx: 0.60, by: 0.38,
    rx: 6, ry: 10,
    speed: 0.14, phase: 5.1,
    depth: 0.6,
    size: 28,
    colorA: '#CBDD1E', colorB: '#6ec1ac',
    opacity: 0.14, blur: 40,
  },
]

/* ─── Helpers ────────────────────────────────────────────────── */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export default function LiquidGlassBackground() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const blobRefs = useRef<(HTMLDivElement | null)[]>([])
  const glassRef = useRef<HTMLDivElement>(null)
  const rippleRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  /* live state – kept in refs to avoid re-renders */
  const cursor = useRef({ x: 0.5, y: 0.5 })   // normalised [0-1]
  const smoothCur = useRef({ x: 0.5, y: 0.5 })
  const gyro = useRef({ x: 0.0, y: 0.0 })    // normalised [-1,1]
  const isMobile = useRef(false)
  const isTouching = useRef(false)
  const lastTouch = useRef({ x: 0.5, y: 0.5 })
  const velocity = useRef({ x: 0, y: 0 })
  const prevSmooth = useRef({ x: 0.5, y: 0.5 })
  const startTime = useRef(0)

  /* ── ripple helper ─────────────────────────────────────────── */
  const triggerRipple = useCallback((nx: number, ny: number) => {
    const el = rippleRef.current
    if (!el) return
    el.style.left = `${nx * 100}%`
    el.style.top = `${ny * 100}%`
    el.classList.remove('lgb-ripple--active')
    // Force reflow
    void el.offsetWidth
    el.classList.add('lgb-ripple--active')
  }, [])

  useEffect(() => {
    /* ── device detection ──────────────────────────────────── */
    const coarseQ = window.matchMedia('(pointer: coarse)')
    const smallQ = window.matchMedia('(max-width: 900px)')
    startTime.current = performance.now()
    const update = () => { isMobile.current = coarseQ.matches || smallQ.matches }
    update()
    coarseQ.addEventListener('change', update)
    smallQ.addEventListener('change', update)

    /* ── pointer move ──────────────────────────────────────── */
    const onPointerMove = (e: PointerEvent) => {
      if (isMobile.current || isTouching.current) return
      cursor.current.x = e.clientX / window.innerWidth
      cursor.current.y = e.clientY / window.innerHeight
    }

    /* ── click ripple ──────────────────────────────────────── */
    const onPointerDown = (e: PointerEvent) => {
      if (isMobile.current) return
      triggerRipple(e.clientX / window.innerWidth, e.clientY / window.innerHeight)
    }

    /* ── touch ─────────────────────────────────────────────── */
    const onTouchStart = (e: TouchEvent) => {
      isTouching.current = true
      const t = e.touches[0]
      lastTouch.current = {
        x: t.clientX / window.innerWidth,
        y: t.clientY / window.innerHeight,
      }
      cursor.current = { ...lastTouch.current }
    }
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      cursor.current = {
        x: t.clientX / window.innerWidth,
        y: t.clientY / window.innerHeight,
      }
    }
    const onTouchEnd = () => {
      isTouching.current = false
      // Drift back to centre slowly
      cursor.current = { x: 0.5, y: 0.5 }
    }

    /* ── gyroscope ─────────────────────────────────────────── */
    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!isMobile.current || isTouching.current) return
      const beta = e.beta ?? 0  // –180 to 180 (tilt fwd/back)
      const gamma = e.gamma ?? 0  // –90  to 90  (tilt left/right)
      gyro.current.x = Math.max(-1, Math.min(1, gamma / 45))
      gyro.current.y = Math.max(-1, Math.min(1, (beta - 45) / 45))
      cursor.current = {
        x: 0.5 + gyro.current.x * 0.35,
        y: 0.5 + gyro.current.y * 0.35,
      }
    }

    let running = true

    /* ── rAF loop ──────────────────────────────────────────── */
    const animate = (now: number) => {
      if (!running) return
      const t = (now - startTime.current) * 0.001 // seconds

      /* smooth cursor with different lerp on mobile vs desktop */
      const lerpT = isMobile.current ? 0.04 : 0.072
      smoothCur.current.x = lerp(smoothCur.current.x, cursor.current.x, lerpT)
      smoothCur.current.y = lerp(smoothCur.current.y, cursor.current.y, lerpT)

      /* velocity from positional delta (for glass tilt) */
      velocity.current.x = (smoothCur.current.x - prevSmooth.current.x) * 60
      velocity.current.y = (smoothCur.current.y - prevSmooth.current.y) * 60
      prevSmooth.current = { ...smoothCur.current }

      const W = window.innerWidth
      const H = window.innerHeight
      const vmin = Math.min(W, H)

      /* ── animate each blob ─────────────────────────────── */
      for (let i = 0; i < BLOBS.length; i++) {
        const el = blobRefs.current[i]
        if (!el) continue
        const b = BLOBS[i]

        let cx = b.bx * W
        let cy = b.by * H
        let scale = 1

        if (!isMobile.current) {
          const angle = t * b.speed + b.phase
          const driftX = Math.sin(angle) * b.rx * (vmin / 100)
          const driftY = Math.cos(angle * 0.77) * b.ry * (vmin / 100)

          const pullX = (smoothCur.current.x - b.bx) * W * b.depth * 0.18
          const pullY = (smoothCur.current.y - b.by) * H * b.depth * 0.18

          cx += driftX + pullX
          cy += driftY + pullY

          const distX = smoothCur.current.x - b.bx
          const distY = smoothCur.current.y - b.by
          const dist = Math.sqrt(distX * distX + distY * distY)
          scale = 1 + Math.max(0, (0.4 - dist)) * 0.22
        }

        const sz = b.size * (vmin / 100)

        el.style.transform = `translate3d(${(cx - sz * 0.5).toFixed(2)}px, ${(cy - sz * 0.5).toFixed(2)}px, 0) scale(${scale.toFixed(4)})`
        el.style.width = `${sz.toFixed(1)}px`
        el.style.height = `${sz.toFixed(1)}px`
      }

      /* ── glass overlay parallax + tilt ────────────────── */
      if (!isMobile.current && glassRef.current) {
        const dx = (smoothCur.current.x - 0.5) * 2
        const dy = (smoothCur.current.y - 0.5) * 2
        const tiltX = dy * -6
        const tiltY = dx * 6
        const shiftX = dx * 12
        const shiftY = dy * 8
        glassRef.current.style.transform =
          `translate3d(${shiftX.toFixed(2)}px, ${shiftY.toFixed(2)}px, 0) rotateX(${tiltX.toFixed(3)}deg) rotateY(${tiltY.toFixed(3)}deg)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    const stopLoop = () => {
      running = false
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }

    const startLoop = () => {
      if (running) return
      running = true
      startTime.current = performance.now()
      rafRef.current = requestAnimationFrame(animate)
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        stopLoop()
      } else {
        startLoop()
      }
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      stopLoop()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('deviceorientation', onDeviceOrientation)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      coarseQ.removeEventListener('change', update)
      smallQ.removeEventListener('change', update)
    }
  }, [triggerRipple])

  return (
    <div ref={wrapperRef} className="lgb" aria-hidden="true">

      {/* ── Layer 1: Carbon base gradient ── */}
      <div className="lgb__base" />

      {/* ── Layer 2: Liquid blob field ── */}
      <div className="lgb__blobs">
        {BLOBS.map((b, i) => (
          <div
            key={b.id}
            ref={el => { blobRefs.current[i] = el }}
            className="lgb__blob"
            style={{
              background: `radial-gradient(ellipse at 38% 38%, ${b.colorA} 0%, ${b.colorB} 45%, transparent 72%)`,
              opacity: b.opacity,
              filter: `blur(${b.blur}px)`,
              willChange: 'transform',
            }}
          />
        ))}
      </div>

      {/* ── Layer 3: Glass refraction sheet ── */}
      <div ref={glassRef} className="lgb__glass hidden md:block" style={{ willChange: 'transform' }}>
        <div className="lgb__glass-inner" />
        <div className="lgb__glass-highlight" />
        <div className="lgb__glass-scan" />
      </div>

      {/* ── Layer 4: Lime accent halo ── */}
      <div className="lgb__lime-halo" />

      {/* ── Layer 5: Noise grain ── */}
      <div className="lgb__noise" />

      {/* ── Layer 6: Click ripple ── */}
      <div ref={rippleRef} className="lgb-ripple" />

    </div>
  )
}
