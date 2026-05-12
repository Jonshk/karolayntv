import { useState, useEffect } from 'react'
import { useSite } from '../context/SiteContext'
import styles from './Hero.module.css'

const defaultSlides = [
  { label: 'Locutora de Radio',      accent: '#e63946', image: '', gradient: 'linear-gradient(135deg, #1a0808 0%, #3d0f0f 50%, #0a0505 100%)' },
  { label: 'Creadora de Contenidos', accent: '#4361ee', image: '', gradient: 'linear-gradient(135deg, #080a1a 0%, #101840 50%, #050508 100%)' },
  { label: 'Publicidad Digital',     accent: '#f4a261', image: '', gradient: 'linear-gradient(135deg, #1a080f 0%, #3d0f20 50%, #0a0508 100%)' },
  { label: 'Influencer & UGC',       accent: '#4ade80', image: '', gradient: 'linear-gradient(135deg, #08150a 0%, #0f3018 50%, #050a05 100%)' },
]

const gradients = [
  'linear-gradient(135deg, #1a0808 0%, #3d0f0f 50%, #0a0505 100%)',
  'linear-gradient(135deg, #080a1a 0%, #101840 50%, #050508 100%)',
  'linear-gradient(135deg, #1a080f 0%, #3d0f20 50%, #0a0508 100%)',
  'linear-gradient(135deg, #08150a 0%, #0f3018 50%, #050a05 100%)',
]

export default function Hero() {
  const { content } = useSite()
  const hero = content.hero
  const slides = hero.slides.map((s, i) => ({
    ...s,
    gradient: gradients[i] || gradients[0],
  }))

  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState(null)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (current + 1) % slides.length
      setPrev(current)
      setTransitioning(true)
      setTimeout(() => { setCurrent(next); setTransitioning(false); setPrev(null) }, 900)
    }, 5000)
    return () => clearInterval(interval)
  }, [current, slides.length])

  const goTo = (i) => {
    if (i === current || transitioning) return
    setPrev(current)
    setTransitioning(true)
    setTimeout(() => { setCurrent(i); setTransitioning(false); setPrev(null) }, 900)
  }

  const slide = slides[current] || slides[0]

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.bgStack}>
        {slides.map((s, i) => (
          <div
            key={i}
            className={[styles.bgSlide, i === current ? styles.bgActive : '', i === prev ? styles.bgPrev : ''].join(' ')}
            style={s.image
              ? { backgroundImage: `url(${s.image})`, backgroundSize: 'cover', backgroundPosition: 'center top' }
              : { background: s.gradient }}
          >
            <div className={styles.vignette} />
          </div>
        ))}
      </div>
      <div className={styles.noise} />
      <div className={styles.content}>
        <div className={styles.tag}>
          <span className={styles.tagDot} style={{ background: slide.accent }} />
          <span className={styles.tagText} key={`label-${current}`}>{slide.label}</span>
        </div>
        <h1 className={styles.headline}>
          <span className={styles.line1}>{hero.headline1}</span>
          <span className={styles.line2} style={{ color: slide.accent, transition: 'color 0.9s ease' }}>
            {hero.headline2}
          </span>
        </h1>
        <p className={styles.sub}>{hero.subtitle}</p>
        <div className={styles.actions}>
          <a href="#contactform" className={styles.btnPrimary} data-cursor>
            {hero.ctaLabel}
            <span className={styles.arrowWrap}>↗</span>
          </a>
          <a href="#services" className={styles.btnSecondary}>Ver servicios <span>→</span></a>
        </div>
        <div className={styles.dots}>
          {slides.map((s, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => goTo(i)}
              style={i === current ? { background: s.accent, width: '28px' } : {}}
              aria-label={`Ir a slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
      <div className={styles.scrollHint}>
        <div className={styles.scrollLine} style={{ background: `linear-gradient(to bottom, ${slide.accent}, transparent)` }} />
        <span className={styles.scrollText}>scroll</span>
      </div>
    </section>
  )
}
