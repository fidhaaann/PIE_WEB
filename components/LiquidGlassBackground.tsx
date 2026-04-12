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
  const velocity = useRef({ x: 0, y: 0 })
  const prevSmooth = useRef({ x: 0.5, y: 0.5 })
  const startTime = useRef(performance.now())

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
    /* ── pointer move ──────────────────────────────────────── */
    const onPointerMove = (e: PointerEvent) => {
      cursor.current.x = e.clientX / window.innerWidth
      cursor.current.y = e.clientY / window.innerHeight
    }

    /* ── click ripple ──────────────────────────────────────── */
    const onPointerDown = (e: PointerEvent) => {
      triggerRipple(e.clientX / window.innerWidth, e.clientY / window.innerHeight)
    }

    /* ── rAF loop ──────────────────────────────────────────── */
    const animate = (now: number) => {
      const t = (now - startTime.current) * 0.001 // seconds

      /* smooth cursor */
      const lerpT = 0.072
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

        /* orbital drift */
        const angle = t * b.speed + b.phase
        const driftX = Math.sin(angle) * b.rx * (vmin / 100)
        const driftY = Math.cos(angle * 0.77) * b.ry * (vmin / 100)

        /* magnetic pull toward cursor */
        const pullStrength = 0.18
        const pullX = (smoothCur.current.x - b.bx) * W * b.depth * pullStrength
        const pullY = (smoothCur.current.y - b.by) * H * b.depth * pullStrength

        const cx = b.bx * W + driftX + pullX
        const cy = b.by * H + driftY + pullY

        const sz = b.size * (vmin / 100)

        /* slight size breath on cursor proximity */
        const distX = smoothCur.current.x - b.bx
        const distY = smoothCur.current.y - b.by
        const dist = Math.sqrt(distX * distX + distY * distY)
        const scale = 1 + Math.max(0, (0.4 - dist)) * 0.22

        el.style.transform = `translate3d(${(cx - sz * 0.5).toFixed(2)}px, ${(cy - sz * 0.5).toFixed(2)}px, 0) scale(${scale.toFixed(4)})`
        el.style.width = `${sz.toFixed(1)}px`
        el.style.height = `${sz.toFixed(1)}px`
      }

      /* ── glass overlay parallax + tilt ────────────────── */
      if (glassRef.current) {
        const dx = (smoothCur.current.x - 0.5) * 2   // -1 to 1
        const dy = (smoothCur.current.y - 0.5) * 2
        const tiltX = dy * -6   // degrees
        const tiltY = dx * 6
        const shiftX = dx * 12
        const shiftY = dy * 8
        glassRef.current.style.transform =
          `translate3d(${shiftX.toFixed(2)}px, ${shiftY.toFixed(2)}px, 0) rotateX(${tiltX.toFixed(3)}deg) rotateY(${tiltY.toFixed(3)}deg)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
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
      <div ref={glassRef} className="lgb__glass" style={{ willChange: 'transform' }}>
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
