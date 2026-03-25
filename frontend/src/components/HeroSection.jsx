import { useEffect, useRef } from 'react'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  const canvasRef = useRef(null)
  const fpCanvasRef = useRef(null)

  /* ── Particle canvas (background) ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.2 + 0.2,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.5 + 0.08,
    }))

    let animId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.speedX; p.y += p.speedY
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,255,106,${p.opacity})`
        ctx.fill()
      })
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const d = Math.hypot(p1.x - p2.x, p1.y - p2.y)
          if (d < 90) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(0,255,106,${0.07 * (1 - d / 90)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      animId = requestAnimationFrame(animate)
    }
    animate()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  /* ── Fingerprint canvas — realistic spiral ridges ── */
  useEffect(() => {
    const canvas = fpCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width  = 520
    const H = canvas.height = 520
    const cx = W / 2, cy = H / 2

    ctx.clearRect(0, 0, W, H)

    /* Background grid motif — very subtle whitish-grey */
    ctx.save()
    ctx.globalAlpha = 0.06
    for (let gx = 0; gx < W; gx += 20) {
      ctx.beginPath()
      ctx.moveTo(gx, 0); ctx.lineTo(gx, H)
      ctx.strokeStyle = 'rgba(200,218,210,1)'
      ctx.lineWidth = 0.4
      ctx.stroke()
    }
    for (let gy = 0; gy < H; gy += 20) {
      ctx.beginPath()
      ctx.moveTo(0, gy); ctx.lineTo(W, gy)
      ctx.strokeStyle = 'rgba(200,218,210,1)'
      ctx.lineWidth = 0.4
      ctx.stroke()
    }
    ctx.restore()

    /* Radial fade mask — makes grid fade at centre/edges */
    const maskGrad = ctx.createRadialGradient(cx, cy, 30, cx, cy, 240)
    maskGrad.addColorStop(0, 'rgba(0,0,0,0)')
    maskGrad.addColorStop(0.5, 'rgba(0,0,0,0)')
    maskGrad.addColorStop(1, 'rgba(2,11,6,0.9)')
    ctx.fillStyle = maskGrad
    ctx.fillRect(0, 0, W, H)

    /* Fingerprint ridges */
    const ridgeCount = 42
    for (let r = 0; r < ridgeCount; r++) {
      const baseR    = 7 + r * 6.2
      const angleOff = r * 0.20
      const segments = Math.max(90, Math.floor(baseR * 3.0))

      ctx.beginPath()
      for (let s = 0; s <= segments; s++) {
        const t     = s / segments
        const angle = t * Math.PI * 2 + angleOff
        const waveA = Math.sin(angle * 7 + r * 0.4) * (1.6 + r * 0.045)
        const waveB = Math.cos(angle * 5 + r * 0.3) * (1.3 + r * 0.035)
        /* slight discontinuity at ~135° — mimics a real arch/whorl */
        const archPull = Math.sin(angle + Math.PI * 0.75) * (r * 0.055)
        const rx = baseR * 1.07 + waveA + archPull
        const ry = baseR * 0.87 + waveB
        const x  = cx + rx * Math.cos(angle)
        const y  = cy + ry * Math.sin(angle)
        s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.closePath()

      /* colour blend: inner ridges lean green, outer lean whitish-grey */
      const progress = r / ridgeCount
      const alpha    = progress < 0.5
        ? 0.55 + progress * 0.65
        : 0.88 - (progress - 0.5) * 1.05
      const clampedAlpha = Math.max(0.05, alpha)

      /* Interpolate stroke: green near core → whitish-grey at edges */
      const greenAmt = Math.max(0, 1 - progress * 1.6)
      const greyAmt  = 1 - greenAmt
      const r_ch = Math.round(0   * greenAmt + 200 * greyAmt)
      const g_ch = Math.round(255 * greenAmt + 218 * greyAmt)
      const b_ch = Math.round(106 * greenAmt + 208 * greyAmt)

      ctx.strokeStyle = `rgba(${r_ch},${g_ch},${b_ch},${clampedAlpha})`
      ctx.lineWidth   = progress > 0.7 ? 0.55 : 0.8
      ctx.stroke()
    }

    /* Core highlight — green centre glow */
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 26)
    grad.addColorStop(0, 'rgba(0,255,120,0.65)')
    grad.addColorStop(0.6, 'rgba(180,255,210,0.20)')
    grad.addColorStop(1, 'rgba(200,255,220,0)')
    ctx.beginPath()
    ctx.arc(cx, cy, 26, 0, Math.PI * 2)
    ctx.fillStyle = grad
    ctx.fill()

    /* Outer ghost ring — whitish-grey */
    const outerGrad = ctx.createRadialGradient(cx, cy, 220, cx, cy, 260)
    outerGrad.addColorStop(0, 'rgba(190,210,202,0)')
    outerGrad.addColorStop(0.5, 'rgba(190,210,202,0.06)')
    outerGrad.addColorStop(1, 'rgba(190,210,202,0)')
    ctx.beginPath()
    ctx.arc(cx, cy, 240, 0, Math.PI * 2)
    ctx.fillStyle = outerGrad
    ctx.fill()
  }, [])

  return (
    <>
      {/* ── HERO FRAME — the big bordered card from reference ── */}
      <section className={styles.heroFrame} id="about">
        <canvas ref={canvasRef} className={styles.canvas} />
        <div className={styles.scanLine} />

        {/* Left: content */}
        <div className={styles.content}>

          <h1 className={styles.title}>
            CIPHER<span className={styles.accent}>CLASH</span>
          </h1>

          <p className={styles.subtitle}>
            CRYPTOGRAPHY · LOGICAL PUZZLES · CODE-BREAKING
          </p>

          <p className={styles.description}>
            Cipher Clash is a fast-paced quiz event that challenges participants
            with cryptography, logical puzzles, and code-breaking tasks. It tests
            analytical thinking, teamwork, and problem-solving under time pressure
            in an engaging competitive format.
          </p>

          {/* Two CTA buttons like reference */}
          <div className={styles.ctaRow}>
            <a href="#register" className={styles.ctaPrimary}>
              REGISTER NOW
            </a>
            <a href="https://www.instagram.com/cybersecurity_psgtech?igsh=MXVoOHFtcjBiNzNhcg==" target="_blank" rel="noopener noreferrer" className={styles.ctaSecondary}>
              CONNECT
            </a>
          </div>

          {/* Prize highlight strip */}
          <div className={styles.trusted}>
            <div className={styles.trustedItems}>
              <span className={styles.trustedItemBold}>Exciting Prize Pool for Winners</span>
            </div>
          </div>
        </div>

        {/* Right: LARGE fingerprint — exactly like reference */}
        <div className={styles.fpWrap}>
          <canvas ref={fpCanvasRef} className={styles.fpCanvas} />
        </div>
      </section>

      {/* ── STATS BAR — four event detail tiles ── */}
      <div className={styles.statsBar}>
        {[
          { num: 'APR 1',    label: 'Event Date' },
          { num: 'PSG Tech', label: 'PSG College of Technology' },
          { num: '1–2',     label: 'Members per Team' },
        ].map(s => (
          <div key={s.num} className={styles.statTile}>
            <span className={styles.statNum}>{s.num}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>
    </>
  )
}
