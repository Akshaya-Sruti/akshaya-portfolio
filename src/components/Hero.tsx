import { useEffect, useState } from 'react'

function Hero() {
  const [mouse, setMouse] = useState({
    x: 50,
    y: 50,
  })

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x:
          (event.clientX / window.innerWidth) * 100,

        y:
          (event.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener(
      'mousemove',
      handleMouseMove,
    )

    const timer = window.setTimeout(() => {
      setLoaded(true)
    }, 100)

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove,
      )

      window.clearTimeout(timer)
    }
  }, [])

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6">
      {/* Mouse-following ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30 transition-[background] duration-500 ease-out"
        style={{
          background: `radial-gradient(
            500px circle at ${mouse.x}% ${mouse.y}%,
            rgba(124, 92, 255, 0.18),
            transparent 70%
          )`,
        }}
      />

      <div
        className={`relative z-10 mx-auto w-full max-w-7xl transition-all duration-1000 ease-out ${
          loaded
            ? 'translate-y-0 opacity-100'
            : 'translate-y-6 opacity-0'
        }`}
      >
        {/* Eyebrow */}
        <div
          className={`mb-7 flex items-center gap-3 transition-all duration-700 delay-100 ${
            loaded
              ? 'translate-y-0 opacity-100'
              : 'translate-y-3 opacity-0'
          }`}
        >
          <span className="h-px w-8 bg-[var(--accent)]" />

          <p className="font-mono text-xs tracking-[0.18em] text-[var(--accent)]">
            FINAL-YEAR COMPUTER SCIENCE STUDENT
          </p>
        </div>

        {/* Main heading */}
        <h1
          className={`max-w-6xl text-6xl font-semibold leading-[0.88] tracking-[-0.04em] transition-all duration-1000 delay-200 md:text-8xl lg:text-9xl ${
            loaded
              ? 'translate-y-0 opacity-100'
              : 'translate-y-5 opacity-0'
          }`}
        >
          BUILDING
          <br />
          <span className="text-[var(--foreground)]">
            INTELLIGENT
          </span>
          <br />
          <span className="text-[var(--muted)]">
            EXPERIENCES.
          </span>
        </h1>

        {/* Supporting line */}
        <div
          className={`mt-10 flex items-center gap-4 transition-all duration-700 delay-500 ${
            loaded
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0'
          }`}
        >
          <p className="font-mono text-xs tracking-[0.16em] text-[var(--muted)] md:text-sm">
            AI · COMPUTER VISION · SOFTWARE · XR
          </p>
        </div>
      </div>

      {/* Bottom metadata */}
      <div
        className={`absolute bottom-8 left-6 right-6 z-10 flex items-end justify-between font-mono text-[10px] tracking-[0.15em] text-[var(--muted)] transition-all duration-700 delay-700 md:left-auto md:right-12 ${
          loaded
            ? 'translate-y-0 opacity-100'
            : 'translate-y-3 opacity-0'
        }`}
      >
        <span>SCROLL TO EXPLORE</span>

        <span className="hidden md:block">
          01 / 05
        </span>
      </div>
    </section>
  )
}

export default Hero