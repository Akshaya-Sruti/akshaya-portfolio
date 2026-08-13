import { useEffect, useRef } from 'react'

type Point = {
  x: number
  y: number
}

type PaintParticle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  maxLife: number
  rotation: number
  rotationSpeed: number
}

function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef<Point>({ x: 0, y: 0 })
  const previousMouse = useRef<Point>({ x: 0, y: 0 })
  const current = useRef<Point>({ x: 0, y: 0 })
  const particles = useRef<PaintParticle[]>([])
  const animationFrame = useRef<number | null>(null)
  const initialized = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) return

    const context = canvas.getContext('2d')

    if (!context) return

    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches

    if (isTouchDevice) return

    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = window.innerWidth * pixelRatio
      canvas.height = window.innerHeight * pixelRatio

      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    resizeCanvas()

    window.addEventListener('resize', resizeCanvas)

    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX
      mouse.current.y = event.clientY

      if (!initialized.current) {
        current.current.x = event.clientX
        current.current.y = event.clientY

        previousMouse.current.x = event.clientX
        previousMouse.current.y = event.clientY

        initialized.current = true
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const createPaint = () => {
      const dx = mouse.current.x - previousMouse.current.x
      const dy = mouse.current.y - previousMouse.current.y

      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 1) return

      const speed = Math.min(distance, 35)

      const count = Math.min(
        Math.max(Math.floor(speed / 4), 1),
        7,
      )

      for (let i = 0; i < count; i++) {
        const angle =
          Math.atan2(dy, dx) +
          Math.PI / 2 +
          (Math.random() - 0.5) * 1.6

        const spread = Math.random() * Math.min(speed * 0.45, 14)

        const life = 35 + Math.random() * 35

        particles.current.push({
          x:
            mouse.current.x +
            (Math.random() - 0.5) * spread,

          y:
            mouse.current.y +
            (Math.random() - 0.5) * spread,

          vx:
            -Math.cos(angle) *
            (0.2 + Math.random() * speed * 0.025),

          vy:
            -Math.sin(angle) *
            (0.2 + Math.random() * speed * 0.025),

          size:
            8 +
            Math.random() * 18 +
            Math.min(speed * 0.25, 10),

          life,
          maxLife: life,

          rotation: Math.random() * Math.PI * 2,

          rotationSpeed:
            (Math.random() - 0.5) * 0.04,
        })
      }

      previousMouse.current.x = mouse.current.x
      previousMouse.current.y = mouse.current.y
    }

    const drawParticle = (
      particle: PaintParticle,
    ) => {
      const opacity =
        Math.max(particle.life / particle.maxLife, 0) * 0.22

      if (opacity <= 0) return

      context.save()

      context.translate(
        particle.x,
        particle.y,
      )

      context.rotate(particle.rotation)

      const gradient = context.createRadialGradient(
        0,
        0,
        0,
        0,
        0,
        particle.size,
      )

      gradient.addColorStop(
        0,
        `rgba(168, 85, 247, ${opacity})`,
      )

      gradient.addColorStop(
        0.45,
        `rgba(147, 51, 234, ${opacity * 0.7})`,
      )

      gradient.addColorStop(
        1,
        'rgba(126, 34, 206, 0)',
      )

      context.fillStyle = gradient

      context.scale(
        1.45,
        0.7,
      )

      context.beginPath()

      context.arc(
        0,
        0,
        particle.size,
        0,
        Math.PI * 2,
      )

      context.fill()

      context.restore()
    }

    const animate = () => {
      /*
       * Smoothly follow the mouse.
       */
      current.current.x +=
        (mouse.current.x - current.current.x) *
        0.18

      current.current.y +=
        (mouse.current.y - current.current.y) *
        0.18

      /*
       * Create paint based on mouse movement.
       */
      createPaint()

      /*
       * Transparent clear creates the dissolving trail.
       */
      context.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight,
      )

      /*
       * Draw a soft core behind the cursor.
       */
      const coreGradient =
        context.createRadialGradient(
          current.current.x,
          current.current.y,
          0,
          current.current.x,
          current.current.y,
          55,
        )

      coreGradient.addColorStop(
        0,
        'rgba(168, 85, 247, 0.18)',
      )

      coreGradient.addColorStop(
        0.35,
        'rgba(147, 51, 234, 0.09)',
      )

      coreGradient.addColorStop(
        1,
        'rgba(126, 34, 206, 0)',
      )

      context.fillStyle = coreGradient

      context.beginPath()

      context.arc(
        current.current.x,
        current.current.y,
        55,
        0,
        Math.PI * 2,
      )

      context.fill()

      /*
       * Update and draw paint.
       */
      for (
        let i = particles.current.length - 1;
        i >= 0;
        i--
      ) {
        const particle = particles.current[i]

        particle.x += particle.vx
        particle.y += particle.vy

        particle.vx *= 0.97
        particle.vy *= 0.97

        particle.life -= 1

        particle.rotation +=
          particle.rotationSpeed

        particle.size *= 0.992

        drawParticle(particle)

        if (particle.life <= 0) {
          particles.current.splice(i, 1)
        }
      }

      /*
       * Keep the particle count under control.
       */
      if (particles.current.length > 450) {
        particles.current.splice(
          0,
          particles.current.length - 450,
        )
      }

      animationFrame.current =
        requestAnimationFrame(animate)
    }

    animationFrame.current =
      requestAnimationFrame(animate)

    return () => {
      window.removeEventListener(
        'resize',
        resizeCanvas,
      )

      window.removeEventListener(
        'mousemove',
        handleMouseMove,
      )

      if (animationFrame.current) {
        cancelAnimationFrame(
          animationFrame.current,
        )
      }

      particles.current = []
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[100] hidden md:block"
      aria-hidden="true"
    />
  )
}

export default CustomCursor