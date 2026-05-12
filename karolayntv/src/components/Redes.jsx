import { useReveal } from '../hooks/useReveal'
import { useSite } from '../context/SiteContext'
import styles from './Redes.module.css'

const TikTokIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z"/></svg>)
const InstagramIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>)
const YouTubeIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>)
const FacebookIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>)

const iconMap = { TikTok: TikTokIcon, Instagram: InstagramIcon, YouTube: YouTubeIcon, Facebook: FacebookIcon }
const styleMap = {
  TikTok:    { iconBg: '#000', iconColor: '#fff', barGradient: 'linear-gradient(to right,#ff0050,#00f2ea)' },
  Instagram: { iconBg: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', iconColor: '#fff', barGradient: 'linear-gradient(to right,#f09433,#dc2743,#bc1888)' },
  YouTube:   { iconBg: '#FF0000', iconColor: '#fff', barGradient: 'linear-gradient(to right,#FF0000,#ff6b6b)' },
  Facebook:  { iconBg: '#1877F2', iconColor: '#fff', barGradient: 'linear-gradient(to right,#1877F2,#42a5f5)' },
}

export default function Redes() {
  const { content } = useSite()
  const redes = content.redes
  const ref = useReveal()

  return (
    <section className={styles.redes} id="redes" ref={ref}>
      <div className={styles.header}>
        <div className={`${styles.eyebrow} reveal`}>Sígueme</div>
        <h2 className={`${styles.h2} reveal reveal-delay-1`}>Encuéntrame en<br />todas partes.</h2>
        <p className={`${styles.sub} reveal reveal-delay-2`}>Contenido diario en cada plataforma. Elige dónde seguirme.</p>
      </div>
      <div className={styles.grid}>
        {redes.map((r, i) => {
          const Icon = iconMap[r.platform]
          const s = styleMap[r.platform] || { iconBg: '#333', iconColor: '#fff', barGradient: '#333' }
          return (
            <a key={r.platform} href={r.url} target="_blank" rel="noopener noreferrer"
              className={`${styles.card} reveal`} style={{ transitionDelay:`${i*0.1}s` }} data-cursor>
              <div className={styles.cardTop}>
                <div className={styles.iconWrap} style={{ background: s.iconBg, color: s.iconColor }}>
                  {Icon && <Icon />}
                </div>
                <div className={styles.platformInfo}>
                  <span className={styles.platformName}>{r.platform}</span>
                  <span className={styles.followers}>{r.followers} seguidores</span>
                </div>
                <span className={styles.externalArrow}>↗</span>
              </div>
              <div className={styles.handle}>{r.handle}</div>
              <p className={styles.desc}>{r.desc}</p>
              <div className={styles.followRow}><span className={styles.followBtn}>Seguir →</span></div>
              <div className={styles.bar} style={{ background: s.barGradient }} />
            </a>
          )
        })}
      </div>
    </section>
  )
}
