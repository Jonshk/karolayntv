import { SiteProvider } from './context/SiteContext'
import { useCursor } from './hooks/useCursor'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import About from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Redes from './components/Redes'
import ContactForm from './components/ContactForm'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminRoute from './admin/AdminRoute'

function Site() {
  const { cursorRef, ringRef } = useCursor()
  return (
    <>
      <Cursor cursorRef={cursorRef} ringRef={ringRef} />
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <Services />
        <Portfolio />
        <Redes />
        <ContactForm />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  // Simple client-side routing: /admin -> panel, else -> site
  const isAdmin = window.location.pathname === '/admin'

  return (
    <SiteProvider>
      {isAdmin ? <AdminRoute /> : <Site />}
    </SiteProvider>
  )
}
