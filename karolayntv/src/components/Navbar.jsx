import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const links = [
  { label: 'Sobre mí', href: '#about' },
  { label: 'Servicios', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Redes', href: '#redes' },
  { label: 'Trabaja conmigo', href: '#contactform' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <a href="#hero" className={styles.logo}>
          <img src="/logo-kv.png" alt="Karolayntv" className={styles.logoImg} />
        </a>
        <div className={styles.links}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className={styles.link}>
              {l.label}
            </a>
          ))}
        </div>
        <a href="#contactform" className={styles.cta}>
          Trabajemos juntos
          <span className={styles.ctaArrow}>↗</span>
        </a>
        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span />
          <span />
        </button>
      </nav>

      <div className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`}>
        <div className={styles.overlayInner}>
          <img
            src="/logo-kv.png"
            alt="Karolayntv"
            style={{ height: '56px', width: 'auto', filter: 'brightness(0) invert(1)', marginBottom: '32px' }}
          />
          {links.map((l, i) => (
            <button
              key={l.href}
              className={styles.overlayLink}
              style={{ transitionDelay: menuOpen ? `${i * 0.08 + 0.1}s` : '0s' }}
              onClick={() => handleLink(l.href)}
            >
              {l.label}
            </button>
          ))}
          
          <a href="#contactform"
            className={styles.overlayCta}
            style={{ transitionDelay: menuOpen ? '0.42s' : '0s' }}
            onClick={() => setMenuOpen(false)}
          >
            Trabajemos juntos ↗
          </a>
        </div>
      </div>
    </>
  )
}