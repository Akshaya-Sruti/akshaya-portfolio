import { useEffect, useRef, useState } from 'react'

function Contact() {
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
        threshold: 0.15,
      },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-[80vh] border-t border-[var(--border)] px-6 py-32"
    >
      <div className="mx-auto flex min-h-[60vh] w-full max-w-7xl flex-col justify-between">
        {/* Heading */}
        <div>
          <p
            className={`mb-6 font-mono text-sm text-[var(--accent)] transition-all duration-700 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-5 opacity-0'
            }`}
          >
            04 / CONTACT
          </p>

          <h2
            className={`max-w-5xl text-5xl font-semibold leading-[0.95] tracking-tight transition-all duration-1000 delay-100 ease-out md:text-7xl lg:text-8xl ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            LET'S BUILD
            <br />
            SOMETHING
            <br />
            <span className="text-[var(--muted)]">
              INTELLIGENT.
            </span>
          </h2>
        </div>

        {/* Contact content */}
        <div className="mt-20 grid gap-12 md:grid-cols-2 md:items-end">
          <div
            className={`transition-all duration-700 delay-300 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-6 opacity-0'
            }`}
          >
            <p className="max-w-md text-lg leading-relaxed text-[var(--muted)]">
              Open to opportunities, collaborations, and
              interesting problems across AI, software,
              computer vision, and extended reality.
            </p>
          </div>

          <div
            className={`flex flex-col gap-5 md:items-end transition-all duration-700 delay-400 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-6 opacity-0'
            }`}
          >
            <a
              href="mailto:srutisri.piratla@gmail.com"
              className="group flex items-center font-mono text-sm text-[var(--foreground)]"
            >
              <span className="border-b border-[var(--foreground)] pb-1 transition-all duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                EMAIL ME
              </span>

              <span className="ml-3 inline-block text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>

            <a
              href="https://www.linkedin.com/in/akshaya-srutisri-codes29/"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center font-mono text-sm text-[var(--foreground)]"
            >
              <span className="border-b border-[var(--foreground)] pb-1 transition-all duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                LINKEDIN
              </span>

              <span className="ml-3 inline-block text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>

            <a
              href="https://github.com/Akshaya-Sruti"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center font-mono text-sm text-[var(--foreground)]"
            >
              <span className="border-b border-[var(--foreground)] pb-1 transition-all duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                GITHUB
              </span>

              <span className="ml-3 inline-block text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer
          className={`mt-24 flex flex-col gap-4 border-t border-[var(--border)] pt-6 font-mono text-xs text-[var(--muted)] transition-all duration-700 delay-500 ease-out md:flex-row md:items-center md:justify-between ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0'
          }`}
        >
          <span>AKSHAYA.SRUTISRI</span>

          <span>BUILDING INTELLIGENT EXPERIENCES.</span>

          <span>
            © {new Date().getFullYear()}
          </span>
        </footer>
      </div>
    </section>
  )
}

export default Contact