import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrame: number

    const mouse = {
      x: -1000,
      y: -1000,
    }

    const particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()

    /*
     * Denser particle field.
     */
    const particleCount = Math.min(
      180,
      Math.max(
        120,
        Math.floor(
          (window.innerWidth * window.innerHeight) / 8500
        )
      )
    )

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,

        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,

        size: Math.random() * 1.6 + 0.7,
      })
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    window.addEventListener('resize', resize)

    window.addEventListener(
      'mousemove',
      handleMouseMove
    )

    window.addEventListener(
      'mouseleave',
      handleMouseLeave
    )

    /*
     * Maximum distance at which particles connect.
     */
    const connectionDistance = 135

    const animate = () => {
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      )

      /*
       * Move particles.
       */
      particles.forEach((particle) => {
        const dx = particle.x - mouse.x
        const dy = particle.y - mouse.y

        const distance = Math.sqrt(
          dx * dx + dy * dy
        )

        /*
         * Cursor repulsion.
         */
        if (
          distance > 0 &&
          distance < 150
        ) {
          const force =
            (150 - distance) / 150

          particle.x +=
            (dx / distance) *
            force *
            1.8

          particle.y +=
            (dy / distance) *
            force *
            1.8
        }

        particle.x += particle.vx
        particle.y += particle.vy

        /*
         * Wrap around screen.
         */
        if (particle.x < 0) {
          particle.x = canvas.width
        }

        if (particle.x > canvas.width) {
          particle.x = 0
        }

        if (particle.y < 0) {
          particle.y = canvas.height
        }

        if (particle.y > canvas.height) {
          particle.y = 0
        }
      })

      /*
       * Draw particle connections.
       */
      for (
        let i = 0;
        i < particles.length;
        i++
      ) {
        const particleA = particles[i]

        for (
          let j = i + 1;
          j < particles.length;
          j++
        ) {
          const particleB = particles[j]

          const dx =
            particleA.x - particleB.x

          const dy =
            particleA.y - particleB.y

          const distance = Math.sqrt(
            dx * dx + dy * dy
          )

          if (
            distance < connectionDistance
          ) {
            const strength =
              1 -
              distance /
                connectionDistance

            /*
             * More visible than before.
             */
            const opacity =
              0.08 +
              strength * 0.38

            ctx.beginPath()

            ctx.moveTo(
              particleA.x,
              particleA.y
            )

            ctx.lineTo(
              particleB.x,
              particleB.y
            )

            ctx.strokeStyle = `rgba(124, 92, 255, ${opacity})`

            ctx.lineWidth =
              0.45 +
              strength * 0.7

            ctx.stroke()
          }
        }
      }

      /*
       * Draw particles.
       */
      particles.forEach((particle) => {
        /*
         * Small soft glow.
         */
        const glow = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 4
        )

        glow.addColorStop(
          0,
          'rgba(124, 92, 255, 0.32)'
        )

        glow.addColorStop(
          1,
          'rgba(124, 92, 255, 0)'
        )

        ctx.fillStyle = glow

        ctx.beginPath()

        ctx.arc(
          particle.x,
          particle.y,
          particle.size * 4,
          0,
          Math.PI * 2
        )

        ctx.fill()

        /*
         * Main particle.
         */
        ctx.beginPath()

        ctx.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 2
        )

        ctx.fillStyle =
          'rgba(150, 120, 255, 0.85)'

        ctx.fill()
      })

      animationFrame =
        requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrame)

      window.removeEventListener(
        'resize',
        resize
      )

      window.removeEventListener(
        'mousemove',
        handleMouseMove
      )

      window.removeEventListener(
        'mouseleave',
        handleMouseLeave
      )
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  )
}

export default ParticleField