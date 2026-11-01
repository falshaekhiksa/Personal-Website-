import { LangProvider } from './i18n'
import { Navbar, Hero, About, Skills, Experience, Contact, Footer } from './components.jsx'

export default function App() {
  return (
    <LangProvider>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </LangProvider>
  )
}
