import { useReveal } from '../hooks/useReveal'
import styles from './Contact.module.css'

export default function Contact() {
  const ref = useReveal()

  return (
    <section className={styles.contact} id="contact" ref={ref}>
      {/* Ambient glow */}
      <div className={styles.glow} />
      <div className={styles.glowAccent} />

      <div className={styles.inner}>
        <div className={`${styles.eyebrow} reveal`}>Contacto</div>

        <h2 className={`${styles.h2} reveal reveal-delay-1`}>
          ¿Lista para crear<br />algo <em>increíble?</em>
        </h2>

        <p className={`${styles.sub} reveal reveal-delay-2`}>
          Escríbeme y hablamos de tu proyecto, colaboración o campaña.
          Respondo en menos de 24 horas.
        </p>

        <a
          href="mailto:karolayntv@gmail.com"
          className={`${styles.emailBtn} reveal reveal-delay-3`}
          data-cursor
        >
          <div className={styles.emailIcon}>✉️</div>
          <span className={styles.emailText}>karolayntv@gmail.com</span>
          <span className={styles.emailArrow}>↗</span>
        </a>

        {/* Social quick links */}
        <div className={`${styles.socials} reveal reveal-delay-4`}>
          {[
            { label: 'TikTok', url: 'https://tiktok.com/@karolayntv' },
            { label: 'Instagram', url: 'https://instagram.com/karolayntv' },
            { label: 'YouTube', url: 'https://youtube.com/@karolayntv' },
            { label: 'Facebook', url: 'https://facebook.com/karolayntv' },
          ].map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              data-cursor
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
