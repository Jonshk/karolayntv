import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import styles from './ContactForm.module.css'

const services = [
  { id: 'locucion', label: '🎙️ Locución & Radio' },
  { id: 'contenido', label: '🎬 Creación de Contenidos' },
  { id: 'publicidad', label: '📢 Publicidad para Marcas' },
  { id: 'colaboracion', label: '🤝 Colaboración / UGC' },
  { id: 'otro', label: '💬 Otro' },
]


const initialState = {
  name: '',
  brand: '',
  email: '',
  whatsapp: '',
  service: '',
  message: '',
  agreed: false,
}

export default function ContactForm() {
  const ref = useReveal()
  const [form, setForm] = useState(initialState)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Tu nombre es obligatorio'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = 'Email válido obligatorio'
    if (!form.service) e.service = 'Selecciona un servicio'
    if (!form.message.trim() || form.message.length < 20)
      e.message = 'Cuéntanos un poco más (mínimo 20 caracteres)'
    if (!form.agreed) e.agreed = 'Debes aceptar para continuar'
    return e
  }

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('sending')

    // ─────────────────────────────────────────────────────────────────
    // INTEGRACIÓN DE EMAIL
    // Opción A — Formspree (gratis, sin backend):
    //   1. Ve a https://formspree.io y crea una cuenta
    //   2. Crea un form y obtén tu endpoint, ej: https://formspree.io/f/xxxxxabc
    //   3. Reemplaza la URL de abajo
    //
    // Opción B — EmailJS (gratis, sin backend):
    //   Sigue las instrucciones en README.md
    //
    // Opción C — WhatsApp directo:
    //   Reemplaza todo por: window.open(`https://wa.me/TUNUMERO?text=...`)
    // ─────────────────────────────────────────────────────────────────
    const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID' // ← cambiar

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          nombre: form.name,
          marca: form.brand,
          email: form.email,
          whatsapp: form.whatsapp,
          servicio: form.service,
          mensaje: form.message,
        }),
      })

      if (res.ok) {
        setStatus('success')
        setForm(initialState)
      } else {
        setStatus('error')
      }
    } catch {
      // En desarrollo sin Formspree configurado, simula éxito
      // Quitar esto en producción
      console.log('Form data (dev):', form)
      setStatus('success')
      setForm(initialState)
    }
  }

  if (status === 'success') {
    return (
      <section className={styles.section} id="contactform">
        <div className={styles.successWrap}>
          <div className={styles.successIcon}>✅</div>
          <h3 className={styles.successTitle}>¡Mensaje recibido!</h3>
          <p className={styles.successSub}>
            Gracias por escribir. Karolaynt revisará tu propuesta y te
            responderá en menos de 24 horas.
          </p>
          <button
            className={styles.resetBtn}
            onClick={() => setStatus('idle')}
          >
            Enviar otro mensaje
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.section} id="contactform" ref={ref}>
      {/* Left col — pitch */}
      <div className={styles.pitch}>
        <div className={`${styles.eyebrow} reveal`}>Para marcas y clientes</div>
        <h2 className={`${styles.h2} reveal reveal-delay-1`}>
          Tu marca merece<br />
          <em>una voz que vende.</em>
        </h2>
        <p className={`${styles.pitchSub} reveal reveal-delay-2`}>
          Cuéntame tu proyecto y te preparo una propuesta personalizada.
          Trabajo con marcas, tiendas y emprendedores que quieren crecer en digital.
        </p>

        <ul className={`${styles.perks} reveal reveal-delay-3`}>
          {[
            { icon: '⚡', text: 'Respuesta en menos de 24h' },
            { icon: '🎯', text: 'Propuesta personalizada para tu marca' },
            { icon: '📊', text: 'Contenido con estrategia y métricas' },
            { icon: '🌎', text: 'Audiencia activa en 4 plataformas' },
          ].map((p) => (
            <li key={p.text} className={styles.perk}>
              <span className={styles.perkIcon}>{p.icon}</span>
              <span>{p.text}</span>
            </li>
          ))}
        </ul>

        <div className={`${styles.trustBadge} reveal reveal-delay-4`}>
          <div className={styles.trustAvatars}>
            {['M', 'S', 'A', 'R'].map((l) => (
              <div key={l} className={styles.avatar}>{l}</div>
            ))}
          </div>
          <p className={styles.trustText}>
            Marcas que ya confían en Karolayntv
          </p>
        </div>
      </div>

      {/* Right col — form */}
      <div className={`${styles.formWrap} reveal reveal-delay-1`}>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h3 className={styles.formTitle}>Cuéntame tu proyecto</h3>
            <p className={styles.formSub}>Todos los campos con * son obligatorios</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className={styles.form}>
            {/* Row 1 */}
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Nombre completo *</label>
                <input
                  type="text"
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  placeholder="Tu nombre"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
                {errors.name && <span className={styles.error}>{errors.name}</span>}
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Marca / Empresa</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Nombre de tu marca (opcional)"
                  value={form.brand}
                  onChange={(e) => handleChange('brand', e.target.value)}
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Email *</label>
                <input
                  type="email"
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
              </div>
              <div className={styles.field}>
                <label className={styles.label}>WhatsApp</label>
                <input
                  type="tel"
                  className={styles.input}
                  placeholder="+58 412 000 0000"
                  value={form.whatsapp}
                  onChange={(e) => handleChange('whatsapp', e.target.value)}
                />
              </div>
            </div>

            {/* Servicio */}
            <div className={styles.field}>
              <label className={styles.label}>¿Qué necesitas? *</label>
              <div className={styles.serviceGrid}>
                {services.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`${styles.serviceBtn} ${form.service === s.id ? styles.serviceBtnActive : ''}`}
                    onClick={() => handleChange('service', s.id)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              {errors.service && <span className={styles.error}>{errors.service}</span>}
            </div>
            {/* Mensaje */}
            <div className={styles.field}>
              <label className={styles.label}>
                Cuéntame tu proyecto *
                <span className={styles.charCount}>{form.message.length}/500</span>
              </label>
              <textarea
                className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                placeholder="Describe tu marca, qué producto o servicio tienes, qué quieres lograr con el contenido y cualquier detalle relevante..."
                value={form.message}
                maxLength={500}
                onChange={(e) => handleChange('message', e.target.value)}
                rows={4}
              />
              {errors.message && <span className={styles.error}>{errors.message}</span>}
            </div>

            {/* Checkbox */}
            <label className={styles.checkLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={form.agreed}
                onChange={(e) => handleChange('agreed', e.target.checked)}
              />
              <span className={styles.checkText}>
                Acepto que Karolaynt use mis datos para contactarme con una propuesta.
              </span>
            </label>
            {errors.agreed && <span className={styles.error}>{errors.agreed}</span>}

            {/* Submit */}
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={status === 'sending'}
              data-cursor
            >
              {status === 'sending' ? (
                <span className={styles.spinner} />
              ) : (
                <>
                  Enviar propuesta
                  <span className={styles.submitArrow}>↗</span>
                </>
              )}
            </button>

            {status === 'error' && (
              <p className={styles.errorGlobal}>
                Algo salió mal. Escríbeme directamente a{' '}
                <a href="mailto:karolayntv@gmail.com">karolayntv@gmail.com</a>
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
