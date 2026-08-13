import { useState } from 'react'

type Project = {
  number: string
  title: string
  description: string
  stack: string
  category: string
  credential?: string
}

const projects: Project[] = [
  {
    number: '01',
    title: 'AI DIET TRACKER',
    description:
      'A web application that analyzes food intake and provides nutrition insights using external food and nutrition APIs.',
    stack: 'PYTHON · STREAMLIT · API · DATA',
    category: 'AI / DATA',
  },
  {
    number: '02',
    title: 'MR BATTLEFIELD',
    description:
      'A mixed-reality experience built for Meta Quest 3, combining spatial interaction, AI-driven behavior, and real-world environment understanding.',
    stack: 'UNITY · C# · XR · MR',
    category: 'EXTENDED REALITY',
  },
  {
    number: '03',
    title: 'AI POWERPOINT CONTROLLER',
    description:
      'A computer-vision-based presentation controller that enables hands-free PowerPoint interaction through real-time hand gesture recognition.',
    stack: 'PYTHON · OPENCV · MEDIAPIPE · CV',
    category: 'COMPUTER VISION',
  },
  {
    number: '04',
    title: 'WEB APP VULNERABILITY SCANNER',
    description:
      'A security-focused application designed to identify common web application vulnerabilities through automated scanning.',
    stack: 'PYTHON · OWASP ZAP · SECURITY',
    category: 'CYBERSECURITY',
  },
  {
    number: '05',
    title: 'INVENTORY MANAGEMENT SYSTEM',
    description:
      'A confidential inventory management system developed for a defense-related project. Implementation details remain private due to the sensitive nature of the project.',
    stack: 'JAVA · DATABASE · SOFTWARE',
    category: 'SOFTWARE ENGINEERING',
    credential:
      'CONFIDENTIAL DEFENSE PROJECT · BUILT WITHOUT AI ASSISTANCE',
  },
]

function Work() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHoveringCard, setIsHoveringCard] = useState(false)

  const nextProject = () => {
    setActiveIndex(
      (current) => (current + 1) % projects.length,
    )
  }

  const previousProject = () => {
    setActiveIndex(
      (current) =>
        (current - 1 + projects.length) %
        projects.length,
    )
  }

  return (
    <section
      id="work"
      className="relative min-h-screen overflow-hidden border-t border-[var(--border)] px-6 py-32"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col">
        <div className="mb-16">
          <p className="mb-6 font-mono text-sm text-[var(--accent)]">
            02 / SELECTED WORK
          </p>

          <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Built to solve.
            <br />
            Designed to explore.
          </h2>
        </div>

        <div className="flex flex-1 flex-col items-center">
          {/* Project deck */}
          <div className="relative flex h-[520px] w-full max-w-4xl items-center justify-center">
            {projects.map((project, index) => {
              const offset =
                (index -
                  activeIndex +
                  projects.length) %
                projects.length

              const isActive =
                index === activeIndex

              let transform = ''
              let opacity = 0
              let zIndex = 0
              let filter = ''

              if (offset === 0) {
                transform = isHoveringCard
                  ? 'translate3d(0, -8px, 0) scale(1.012) rotateX(0deg)'
                  : 'translate3d(0, 0, 0) scale(1) rotateX(0deg)'

                opacity = 1
                zIndex = 30
                filter = 'brightness(1)'
              } else if (offset === 1) {
                transform =
                  'translate3d(38px, 20px, -20px) scale(0.94) rotate(1.2deg)'

                opacity = 0.5
                zIndex = 20
                filter = 'brightness(0.85)'
              } else if (offset === 2) {
                transform =
                  'translate3d(68px, 38px, -40px) scale(0.88) rotate(2deg)'

                opacity = 0.25
                zIndex = 10
                filter = 'brightness(0.7)'
              } else {
                transform =
                  'translate3d(0, 55px, -60px) scale(0.82) rotate(3deg)'

                opacity = 0
                zIndex = 0
                filter = 'brightness(0.6)'
              }

              return (
                <button
                  key={project.number}
                  type="button"
                  onClick={
                    isActive
                      ? nextProject
                      : undefined
                  }
                  onMouseEnter={() =>
                    isActive &&
                    setIsHoveringCard(true)
                  }
                  onMouseLeave={() =>
                    setIsHoveringCard(false)
                  }
                  aria-label={
                    isActive
                      ? `View next project: ${project.title}`
                      : undefined
                  }
                  className={`absolute left-1/2 top-1/2 h-[390px] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 text-left ${
                    isActive
                      ? 'cursor-pointer'
                      : 'pointer-events-none'
                  }`}
                  style={{
                    transform,
                    opacity,
                    zIndex,
                    filter,
                    transition:
                      'transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms ease, filter 600ms ease',
                    perspective: '1200px',
                  }}
                >
                  <div
                    className={`relative flex h-full w-full flex-col justify-between overflow-hidden border bg-[var(--background)] p-8 transition-all duration-700 md:p-12 ${
                      isActive
                        ? 'border-[var(--accent)]/30 shadow-[0_20px_80px_rgba(124,92,255,0.10)]'
                        : 'border-[var(--border)] shadow-none'
                    }`}
                  >
                    {/* Decorative grid */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.035]"
                      style={{
                        backgroundImage:
                          'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)',
                        backgroundSize:
                          '40px 40px',
                      }}
                    />

                    {/* Subtle active glow */}
                    <div
                      className={`pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[var(--accent)] blur-3xl transition-opacity duration-700 ${
                        isActive
                          ? 'opacity-[0.06]'
                          : 'opacity-0'
                      }`}
                    />

                    {/* Top metadata */}
                    <div className="relative z-10 flex items-start justify-between">
                      <span className="font-mono text-sm text-[var(--accent)]">
                        {project.number}
                      </span>

                      <span className="font-mono text-xs tracking-wider text-[var(--muted)]">
                        {project.category}
                      </span>
                    </div>

                    {/* Main content */}
                    <div className="relative z-10">
                      <h3 className="max-w-xl text-4xl font-semibold leading-[0.95] tracking-tight md:text-6xl">
                        {project.title}
                      </h3>

                      <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
                        {project.description}
                      </p>

                      {project.credential && (
                        <p className="mt-5 font-mono text-[10px] tracking-wider text-[var(--accent)] md:text-xs">
                          {project.credential}
                        </p>
                      )}
                    </div>

                    {/* Bottom metadata */}
                    <div className="relative z-10 flex flex-col gap-4 border-t border-[var(--border)] pt-5 md:flex-row md:items-end md:justify-between">
                      <span className="font-mono text-xs tracking-wide text-[var(--muted)]">
                        {project.stack}
                      </span>

                      {isActive && (
                        <span
                          className={`font-mono text-xs text-[var(--foreground)] transition-transform duration-500 ${
                            isHoveringCard
                              ? 'translate-x-1'
                              : 'translate-x-0'
                          }`}
                        >
                          CLICK TO CONTINUE →
                        </span>
                      )}
                    </div>

                    {/* Accent corner */}
                    <div
                      className={`absolute right-0 top-0 h-20 w-20 border-l border-b border-[var(--accent)] transition-opacity duration-500 ${
                        isActive
                          ? 'opacity-50'
                          : 'opacity-20'
                      }`}
                    />
                  </div>
                </button>
              )
            })}
          </div>

          {/* Controls */}
          <div className="mt-8 flex w-full max-w-2xl items-center justify-between border-t border-[var(--border)] pt-6">
            <button
              type="button"
              onClick={previousProject}
              className="font-mono text-xs tracking-wide text-[var(--muted)] transition-all duration-300 hover:-translate-x-1 hover:text-[var(--foreground)]"
            >
              ← PREVIOUS
            </button>

            <div className="font-mono text-xs tracking-widest text-[var(--muted)]">
              <span className="text-[var(--foreground)]">
                {String(
                  activeIndex + 1,
                ).padStart(2, '0')}
              </span>

              <span className="mx-2">/</span>

              {String(projects.length).padStart(
                2,
                '0',
              )}
            </div>

            <button
              type="button"
              onClick={nextProject}
              className="font-mono text-xs tracking-wide text-[var(--muted)] transition-all duration-300 hover:translate-x-1 hover:text-[var(--foreground)]"
            >
              NEXT →
            </button>
          </div>

          <p className="mt-8 font-mono text-[10px] tracking-widest text-[var(--muted)] opacity-60">
            CLICK THE CARD TO EXPLORE
          </p>
        </div>
      </div>
    </section>
  )
}

export default Work