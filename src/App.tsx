import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import Hero from './components/Hero'
import ProWork from './components/ProWork'
import About from './components/About'
import Experience from './components/Experience'
import Contact from './components/Contact'
import ParticleField from './components/ParticleField'

function App() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      {/* Global particle background */}
      <ParticleField />

      {/* Interface */}
      <Navbar />

      <div className="relative z-10">
        <Hero />
        <ProWork />
        <About />
        <Experience />
        <Contact />
      </div>

      {/* Interactive cursor */}
      <CustomCursor />
    </main>
  )
}

export default App