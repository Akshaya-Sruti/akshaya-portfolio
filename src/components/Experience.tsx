import { useEffect, useRef, useState } from 'react'

const experiences = [
  {
    number: '01',
    period: 'NOV 2023 — NOV 2024',
    role: 'BOARD MEMBER',
    company: 'WOMEN EMPOWERMENT CELL · GITAM',
    description:
      'Contributed to student-led initiatives focused on women empowerment and technology. Organized two sub-events of Master Chef GITAM and hosted a women and technology conference featuring Sri Bharat.',
    focus: 'LEADERSHIP · EVENTS · COMMUNITY',
  },
  {
    number: '02',
    period: 'DEC 2024 — ONGOING',
    role: 'CORE COMMITTEE MEMBER',
    company: 'GENESIS · GITAM',
    description:
      'Contributing as a core committee member to the planning, coordination, and execution of student-led initiatives and events at GITAM.',
    focus: 'LEADERSHIP · COORDINATION · EVENTS',
  },
  {
    number: '03',
    period: 'AUG 2023 — ONGOING',
    role: 'COMPANY QUARTER MASTER SERGEANT',
    company: '2(A) GBN NCC',
    description:
      'Responsible for the security and safety of participants across fests and events while leading a team of 45 cadets and supporting the smooth functioning of NCC activities throughout the academic year.',
    focus: 'LEADERSHIP · SECURITY · TEAM MANAGEMENT',
    perk: 'LEADERSHIP PERK · LEADING 45 CADETS',
  },
  {
    number: '04',
    period: 'AUG 2025 — OCT 2025',
    role: 'AICTE INTERN',
    company: 'IBM SKILLSBUILD',
    description:
      'Developed hands-on experience with AI and cloud computing through IBM SkillsBuild and Edunet Foundation programs. Presented a comprehensive final project, demonstrating both technical competency and the ability to communicate complex ideas effectively.',
    focus: 'AI · CLOUD · PRESENTATION',
  },
  {
    number: '05',
    period: 'MAY 2026 — JUN 2026',
    role: 'MIXED REALITY INTERN',
    company: 'CENTRE FOR EXTENDED REALITY · GITAM',
    description:
      'Designed and developed Mixed Reality applications in Unity for Meta Quest 3, integrating immersive interactions and spatial computing concepts. Built and tested interactive MR projects involving real-time gameplay mechanics, object interactions, and environment optimization using the Meta XR SDK.',
    focus: 'UNITY · C# · MIXED REALITY · META QUEST 3',
  },
]

function Experience() {
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
        threshold: 0.12,
      },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative border-t border-[var(--border)] px-6 py-32"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section heading */}
        <div className="mb-16">
          <p
            className={`mb-6 font-mono text-sm text-[var(--accent)] transition-all duration-700 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-5 opacity-0'
            }`}
          >
            03 / EXPERIENCE
          </p>

          <h2
            className={`max-w-4xl text-4xl font-semibold leading-tight tracking-tight transition-all duration-1000 delay-100 ease-out md:text-6xl ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-6 opacity-0'
            }`}
          >
            Beyond the
            <br />
            classroom.
          </h2>

          <p
            className={`mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)] transition-all duration-700 delay-300 ease-out ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-5 opacity-0'
            }`}
          >
            A mix of technical experience, leadership, and hands-on work across
            AI, software, extended reality, and student organizations.
          </p>
        </div>

        {/* Experience list */}
        <div className="border-t border-[var(--border)]">
          {experiences.map((experience, index) => (
            <article
              key={experience.number}
              className={`group grid gap-8 border-b border-[var(--border)] py-10 transition-all duration-700 ease-out hover:bg-white/[0.02] md:grid-cols-[80px_220px_1fr] md:gap-12 ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
              style={{
                transitionDelay: `${450 + index * 120}ms`,
              }}
            >
              <span className="font-mono text-sm text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                {experience.number}
              </span>

              <div className="font-mono text-xs tracking-wide text-[var(--muted)]">
                {experience.period}
              </div>

              <div>
                <p className="font-mono text-xs tracking-widest text-[var(--accent)]">
                  {experience.role}
                </p>

                <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                  {experience.company}
                </h3>

                <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--muted)]">
                  {experience.description}
                </p>

                {experience.perk && (
                  <div className="mt-6 inline-flex border border-[var(--accent)]/30 px-3 py-2 transition-colors duration-300 group-hover:border-[var(--accent)]/50">
                    <span className="font-mono text-[10px] tracking-widest text-[var(--accent)]">
                      {experience.perk}
                    </span>
                  </div>
                )}

                <p className="mt-5 font-mono text-xs tracking-wide text-[var(--foreground)]">
                  {experience.focus}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience