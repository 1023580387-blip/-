import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Footer from './components/Footer'

function App() {
  return (
    <div className="relative bg-[#0a0a0f] min-h-screen">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  )
}

export default App