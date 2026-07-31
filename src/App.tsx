import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Skills from './components/Skills'
import Footer from './components/Footer'
import { GitHubProjectsProvider } from './context/GitHubProjectsContext'

export default function App() {
  return (
    <GitHubProjectsProvider>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
      </main>
      <Footer />
    </GitHubProjectsProvider>
  )
}
