import { useReveal } from '../hooks/useReveal'
import { useSite } from '../context/SiteContext'
import styles from './About.module.css'

export default function About() {
  const { content } = useSite()
  const about = content.about
  const ref = useReveal()

  return (
    <section className={styles.about} id="about" ref={ref}>
      <div className={styles.imageCol}>
        <div className={`${styles.imageWrap} reveal`}>
          <div className={styles.imagePlaceholder}>
            <span className={styles.initials}>KV</span>
          </div>
          <div className={styles.imageOverlay} />
          <div className={styles.imageBadge}>
            <div className={styles.badgeName}>Karolaynt Villarroel</div>
            <div className={styles.badgeRole}>@Karolayntv · Creadora & Locutora</div>
          </div>
          <div className={styles.ring} />
        </div>
      </div>
      <div className={styles.textCol}>
        <div className={`${styles.eyebrow} reveal`}>{about.eyebrow}</div>
        <h2 className={`${styles.h2} reveal reveal-delay-1`}
          dangerouslySetInnerHTML={{ __html: about.title.replace('convierte', '<em>convierte</em>') }}
        />
        <p className={`${styles.p} reveal reveal-delay-2`}>{about.para1}</p>
        <p className={`${styles.p} reveal reveal-delay-3`}>{about.para2}</p>
        <div className={`${styles.chips} reveal reveal-delay-4`}>
          {about.chips.map((c) => (
            <span key={c} className={styles.chip} data-cursor>{c}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
