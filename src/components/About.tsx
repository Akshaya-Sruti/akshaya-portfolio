import { useEffect, useRef, useState } from 'react'

function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.2,
      },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative border-t border-[var(--border)] px-6 py-32"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-16 md:grid-cols-2">
        {/* Left column */}
        <div>
          <p
            className={`mb-6 font-mono text-sm text-[var(--accent)] transition-all duration-700 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-5 opacity-0'
            }`}
          >
            01 / ABOUT
          </p>

          <h2
            className={`text-4xl font-semibold leading-tight tracking-tight transition-all duration-1000 delay-100 ease-out md:text-6xl ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-6 opacity-0'
            }`}
          >
            Curious by nature.
            <br />
            Technical by choice.
          </h2>
        </div>

        {/* Right column */}
        <div className="space-y-6 text-lg leading-relaxed text-[var(--muted)]">
          <p
            className={`transition-all duration-700 delay-200 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-5 opacity-0'
            }`}
          >
            I am a final-year Computer Science student focused on building
            intelligent and interactive digital experiences.
          </p>

          <p
            className={`transition-all duration-700 delay-300 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-5 opacity-0'
            }`}
          >
            My interests sit at the intersection of artificial intelligence,
            computer vision, software development, and extended reality.
          </p>

          <p
            className={`transition-all duration-700 delay-[400ms] ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-5 opacity-0'
            }`}
          >
            I enjoy turning ideas into working systems, experimenting with new
            technologies, and solving problems that combine software with
            real-world interaction.
          </p>

          <div
            className={`grid grid-cols-2 gap-6 border-t border-[var(--border)] pt-6 font-mono text-sm transition-all duration-700 delay-500 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-5 opacity-0'
            }`}
          >
            <div>
              <p className="mb-2 text-[var(--foreground)]">
                FOCUS
              </p>

              <p>AI / ML</p>
              <p>Computer Vision</p>
              <p>XR Development</p>
            </div>

            <div>
              <p className="mb-2 text-[var(--foreground)]">
                BUILDING WITH
              </p>

              <p>Python</p>
              <p>React / TypeScript</p>
              <p>Java / SQL</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About