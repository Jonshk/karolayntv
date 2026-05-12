import { useReveal } from '../hooks/useReveal'
import { useSite } from '../context/SiteContext'
import styles from './Services.module.css'

export default function Services() {
  const { content } = useSite()
  const services = content.services
  const ref = useReveal()

  return (
    <section className={styles.services} id="services" ref={ref}>
      <div className={styles.bgText} aria-hidden>KAROLAYNTV</div>
      <div className={styles.header}>
        <div className={`${styles.eyebrow} reveal`}>Qué hago</div>
        <h2 className={`${styles.h2} reveal reveal-delay-1`}>
          Servicios que<br />transforman tu marca.
        </h2>
        <p className={`${styles.headerSub} reveal reveal-delay-2`}>
          Cada servicio está diseñado para generar conexión real entre tu marca y tu audiencia.
        </p>
      </div>
      <div className={styles.grid}>
        {services.map((s, i) => (
          <div key={s.num} className={`${styles.card} reveal`} style={{ transitionDelay: `${i * 0.12}s` }} data-cursor>
            <div className={styles.cardTop}>
              <span className={styles.cardNum}>{s.num}</span>
              <div className={styles.cardIcon}>{s.emoji}</div>
            </div>
            <h3 className={styles.cardName}>{s.name}</h3>
            <p className={styles.cardDesc}>{s.desc}</p>
            <div className={styles.cardTags}>
              {s.tags.map((t) => <span key={t} className={styles.cardTag}>{t}</span>)}
            </div>
            <div className={styles.cardArrow}>↗</div>
          </div>
        ))}
      </div>
      <div className={`${styles.cta} reveal`}>
        <a href="#contact" className={styles.ctaBtn} data-cursor>
          ¿Tu proyecto encaja? Hablemos
          <span className={styles.ctaArrow}>↗</span>
        </a>
      </div>
    </section>
  )
}
