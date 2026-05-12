import { useState, useRef, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useSite } from '../context/SiteContext'
import styles from './Portfolio.module.css'

export default function Portfolio() {
  const { content } = useSite()
  const works = content.portfolio

  const ref = useReveal()

  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [progress, setProgress] = useState(0)

  const intervalRef = useRef(null)
  const progressRef = useRef(null)

  const startAutoplay = () => {
    clearInterval(intervalRef.current)
    clearInterval(progressRef.current)

    setProgress(0)

    let p = 0

    progressRef.current = setInterval(() => {
      p += 100 / 50
      setProgress(Math.min(p, 100))
    }, 100)

    intervalRef.current = setInterval(() => {
      setProgress(0)

      setAnimating(true)

      setTimeout(() => {
        setActive((prev) => (prev + 1) % works.length)
        setAnimating(false)
      }, 400)

    }, 5000)
  }

  useEffect(() => {
    startAutoplay()

    return () => {
      clearInterval(intervalRef.current)
      clearInterval(progressRef.current)
    }
  }, [works.length])

  const goTo = (index) => {
    if (animating || index === active) return

    clearInterval(intervalRef.current)
    clearInterval(progressRef.current)

    setAnimating(true)
    setProgress(0)

    setTimeout(() => {
      setActive(index)
      setAnimating(false)
      startAutoplay()
    }, 400)
  }

  const current = works[active] || works[0]

  return (
    <section className={styles.section} id="portfolio" ref={ref}>

      <div className={styles.header}>
        <div className={`${styles.eyebrow} reveal`}>
          Portfolio
        </div>

        <h2 className={`${styles.h2} reveal reveal-delay-1`}>
          El trabajo habla
          <br />
          <em>por sí solo.</em>
        </h2>
      </div>

      <div className={`${styles.viewer} reveal reveal-delay-2`}>

        <div className={`${styles.preview} ${animating ? styles.previewOut : styles.previewIn}`}>

          {/* ───── VIDEO LOCAL ───── */}
          {current.type === 'video' && current.mediaFile && (
            <video
              key={current.id}
              className={styles.video}
              src={current.mediaFile}
              autoPlay
              muted
              loop
              controls
              playsInline
            />
          )}

          {/* ───── IMAGEN LOCAL ───── */}
          {current.type === 'image' && current.mediaFile && (
            <img
              key={current.id}
              className={styles.image}
              src={current.mediaFile}
              alt={current.title}
            />
          )}

          {/* ───── YOUTUBE ───── */}
          {current.type === 'youtube' && current.embedId && (
            <iframe
              key={current.id}
              className={styles.iframe}
              src={`https://www.youtube.com/embed/${current.embedId}?autoplay=1&mute=1&rel=0`}
              allow="autoplay; fullscreen"
              allowFullScreen
              title={current.title}
            />
          )}

          {/* ───── INSTAGRAM ───── */}
          {current.type === 'instagram' && current.embedUrl && (
            <a
              href={current.embedUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.instagramFallback}
            >
              <div>
                <span>📸</span>
                <strong>Abrir Reel Instagram</strong>
              </div>
            </a>
          )}

          {/* ───── TIKTOK ───── */}
          {current.type === 'tiktok' && current.tiktokUrl && (
            <a
              href={current.tiktokUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.tiktokFallback}
            >
              <div>
                <span>🎵</span>
                <strong>Abrir video TikTok</strong>
              </div>
            </a>
          )}

          {/* ───── PLACEHOLDER ───── */}
          {current.type === 'placeholder' && (
            <div
              className={styles.placeholder}
              style={{
                background: current.gradient
              }}
            >
              <div className={styles.placeholderNoise} />

              <div className={styles.placeholderEmoji}>
                {current.emoji}
              </div>

              <div className={styles.placeholderLines}>
                <div className={styles.line} style={{ width: '60%' }} />
                <div className={styles.line} style={{ width: '40%' }} />
              </div>

              <div className={styles.playBtn}>
                <span className={styles.playIcon}>▶</span>
                <span className={styles.playLabel}>
                  Ver trabajo
                </span>
              </div>

              <div className={styles.grid} />
            </div>
          )}

          {/* ───── OVERLAY ───── */}
          <div className={styles.overlay}>

            <div className={styles.overlayTop}>
              <span className={styles.platform}>
                {current.platform}
              </span>

              <span className={styles.counter}>
                {active + 1} / {works.length}
              </span>
            </div>

            <div className={styles.overlayBottom}>

              <div className={styles.category}>
                {current.category}
              </div>

              <h3 className={styles.workTitle}>
                {current.title}
              </h3>

              <p className={styles.workDesc}>
                {current.desc}
              </p>

              <div className={styles.tags}>
                {(current.tags || []).map((t) => (
                  <span key={t} className={styles.tag}>
                    {t}
                  </span>
                ))}
              </div>

            </div>

            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>

          </div>

        </div>

        {/* ───── THUMBS ───── */}
        <div className={styles.thumbs}>
          {works.map((w, i) => (
            <button
              key={w.id}
              className={`${styles.thumb} ${i === active ? styles.thumbActive : ''}`}
              onClick={() => goTo(i)}
            >

              <div
                className={styles.thumbBg}
                style={{
                  background: w.gradient
                }}
              >
                <span className={styles.thumbEmoji}>
                  {w.emoji}
                </span>

                {i === active && (
                  <div className={styles.thumbProgress}>
                    <div
                      className={styles.thumbProgressFill}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </div>

              <div className={styles.thumbInfo}>
                <span className={styles.thumbCategory}>
                  {w.category}
                </span>

                <span className={styles.thumbTitle}>
                  {w.title}
                </span>
              </div>

            </button>
          ))}
        </div>

      </div>

      <div className={`${styles.cta} reveal`}>
        <p className={styles.ctaText}>
          ¿Quieres ver más trabajos o hablar de una colaboración?
        </p>

        <a
          href="#contactform"
          className={styles.ctaBtn}
        >
          Hablemos de tu proyecto
          <span>↗</span>
        </a>
      </div>

    </section>
  )
}