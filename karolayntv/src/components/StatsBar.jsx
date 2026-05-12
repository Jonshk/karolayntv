import { useRef, useEffect, useState } from 'react'
import styles from './StatsBar.module.css'

const stats = [
  { num: '4', suffix: '+', label: 'Plataformas activas' },
  { num: '100', suffix: '%', label: 'Contenido original' },
  { num: '∞', suffix: '', label: 'Creatividad' },
  { num: '24', suffix: 'h', label: 'Respuesta rápida' },
]

export default function StatsBar() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={styles.bar} ref={ref}>
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`${styles.item} ${visible ? styles.visible : ''}`}
          style={{ transitionDelay: `${i * 0.1}s` }}
        >
          <div className={styles.num}>
            {s.num}<span className={styles.suffix}>{s.suffix}</span>
          </div>
          <div className={styles.label}>{s.label}</div>
        </div>
      ))}
    </div>
  )
}
