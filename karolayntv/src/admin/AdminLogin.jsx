import { useState } from 'react'
import styles from './AdminLogin.module.css'

// ─────────────────────────────────────────────────────────────
// CONTRASEÑA ADMIN
// Cámbiala aquí antes de subir a producción:
// ─────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = 'karolayntv2025'

export default function AdminLogin({ onLogin }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      onLogin()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 600)
      setPw('')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} />

      <div className={`${styles.card} ${shake ? styles.shake : ''}`}>
        <div className={styles.logo}>Karolayntv</div>
        <div className={styles.subtitle}>Panel de Administración</div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldWrap}>
            <label className={styles.label}>Contraseña</label>
            <input
              type="password"
              className={`${styles.input} ${error ? styles.inputError : ''}`}
              placeholder="••••••••••••"
              value={pw}
              autoFocus
              onChange={(e) => { setPw(e.target.value); setError(false) }}
            />
            {error && (
              <span className={styles.errorMsg}>Contraseña incorrecta</span>
            )}
          </div>

          <button type="submit" className={styles.btn}>
            Entrar al panel →
          </button>
        </form>

        <a href="/" className={styles.backLink}>← Volver al sitio</a>
      </div>
    </div>
  )
}
