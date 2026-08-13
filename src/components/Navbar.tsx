import { useEffect, useState, type MouseEvent } from 'react'

const navItems = [
  { label: 'WORK', href: '#work' },
  { label: 'ABOUT', href: '#about' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'CONTACT', href: '#contact' },
]

function Navbar() {
  const [activeSection, setActiveSection] = useState('#work')
  const [menuOpen, setMenuOpen] = useState(false)

  /*
   * Detect which section is currently being viewed.
   */
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (ticking) return

      window.requestAnimationFrame(() => {
        const activationPoint = window.innerHeight * 0.35
        let currentSection = '#work'

        for (const item of navItems) {
          const section = document.querySelector(item.href)

          if (!section) continue

          const rect = section.getBoundingClientRect()

          if (rect.top <= activationPoint) {
            currentSection = item.href
          }
        }

        setActiveSection((current) =>
          current === currentSection ? current : currentSection,
        )

        ticking = false
      })

      ticking = true
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  /*
   * Close mobile menu with Escape.
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  /*
   * Prevent background scrolling while mobile menu is open.
   */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  /*
   * Smooth navigation.
   */
  const handleNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault()

    setActiveSection(href)
    setMenuOpen(false)

    const section = document.querySelector(href)

    if (section) {
      window.setTimeout(() => {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 150)
    }
  }

  return (
    <>
      <nav className="fixed left-0 top-0 z-50 w-full px-6 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="relative z-[60] font-mono text-sm tracking-wide text-[var(--foreground)] transition-opacity duration-300 hover:opacity-70"
          >
            AKSHAYA.SRUTISRI
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 rounded-full border border-white/[0.06] bg-black/10 p-1 backdrop-blur-sm md:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.href

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) =>
                    handleNavigation(event, item.href)
                  }
                  className={`group relative rounded-full px-4 py-2 font-mono text-sm transition-all duration-300 ${
                    isActive
                      ? 'text-[var(--foreground)]'
                      : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {/* Active capsule */}
                  <span
                    className={`absolute inset-0 -z-10 rounded-full transition-all duration-500 ease-out ${
                      isActive
                        ? 'scale-100 bg-white/[0.07] opacity-100'
                        : 'scale-90 bg-white/[0.04] opacity-0 group-hover:scale-100 group-hover:opacity-100'
                    }`}
                  />

                  {/* Accent glow */}
                  <span
                    className={`absolute bottom-1.5 left-1/2 h-px -translate-x-1/2 rounded-full bg-[var(--accent)] transition-all duration-500 ${
                      isActive
                        ? 'w-4 opacity-100'
                        : 'w-0 opacity-0 group-hover:w-2 group-hover:opacity-50'
                    }`}
                  />

                  <span className="relative z-10">
                    {item.label}
                  </span>
                </a>
              )
            })}
          </div>

          {/* Desktop Resume */}
          <a
            href="#"
            className="relative z-[60] hidden font-mono text-xs text-[var(--accent)] transition-all duration-300 hover:translate-x-0.5 hover:opacity-60 md:block"
          >
            RESUME ↗
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="relative z-[60] flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/10 px-4 py-2 font-mono text-xs text-[var(--foreground)] backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.05] md:hidden"
          >
            <span>{menuOpen ? 'CLOSE' : 'MENU'}</span>

            <span
              className={`flex h-3 w-3 items-center justify-center transition-transform duration-300 ${
                menuOpen ? 'rotate-45' : 'rotate-0'
              }`}
            >
              <span className="absolute h-px w-3 bg-[var(--accent)]" />
              <span
                className={`absolute h-px w-3 bg-[var(--accent)] transition-transform duration-300 ${
                  menuOpen ? 'rotate-90' : 'rotate-0'
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 z-40 bg-[var(--background)] transition-all duration-500 md:hidden ${
          menuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className={`flex h-full flex-col justify-center px-8 transition-transform duration-500 ${
            menuOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          <div className="mb-10">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
              Navigation
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) =>
                    handleNavigation(event, item.href)
                  }
                  className={`group relative flex items-center justify-between overflow-hidden rounded-2xl px-5 py-4 font-mono text-2xl transition-all duration-500 ${
                    menuOpen
                      ? 'translate-x-0 opacity-100'
                      : 'translate-x-4 opacity-0'
                  } ${
                    isActive
                      ? 'text-[var(--foreground)]'
                      : 'text-[var(--muted)]'
                  }`}
                  style={{
                    transitionDelay: menuOpen
                      ? `${index * 60 + 100}ms`
                      : '0ms',
                  }}
                >
                  <span
                    className={`absolute inset-0 -z-10 rounded-2xl transition-all duration-300 ${
                      isActive
                        ? 'bg-white/[0.06]'
                        : 'bg-white/[0.03] opacity-0 group-hover:opacity-100'
                    }`}
                  />

                  <span>{item.label}</span>

                  <span
                    className={`text-sm transition-all duration-300 ${
                      isActive
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-50'
                    }`}
                  >
                    ↗
                  </span>
                </a>
              )
            })}
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-white/[0.06] pt-5">
            <span className="font-mono text-[10px] text-[var(--muted)]">
              AKSHAYA.SRUTISRI
            </span>

            <a
              href="#"
              className="font-mono text-xs text-[var(--accent)] transition-opacity duration-300 hover:opacity-60"
              onClick={() => setMenuOpen(false)}
            >
              RESUME ↗
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar