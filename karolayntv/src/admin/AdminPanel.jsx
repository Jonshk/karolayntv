import { useState } from 'react'
import { useSite } from '../context/SiteContext'
import styles from './AdminPanel.module.css'

const tabs = [
  { id: 'hero',      label: '🏠 Hero' },
  { id: 'about',     label: '👤 Sobre mí' },
  { id: 'services',  label: '🎯 Servicios' },
  { id: 'portfolio', label: '🎬 Portfolio' },
  { id: 'redes',     label: '📱 Redes' },
  { id: 'contact',   label: '✉️ Contacto' },
]

function Field({ label, value, onChange, type = 'text', hint }) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      {hint && <span className={styles.fieldHint}>{hint}</span>}
      {type === 'textarea' ? (
        <textarea
          className={styles.textarea}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
        />
      ) : (
        <input
          type={type}
          className={styles.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  )
}

// ── TAB: Hero ────────────────────────────────────────────────
function HeroTab({ data, onChange }) {
  return (
    <div className={styles.tabContent}>
      <div className={styles.sectionTitle}>Texto principal</div>
      <Field label="Nombre línea 1" value={data.headline1} onChange={(v) => onChange('headline1', v)} />
      <Field label="Nombre línea 2 (cursiva)" value={data.headline2} onChange={(v) => onChange('headline2', v)} />
      <Field label="Subtítulo" value={data.subtitle} onChange={(v) => onChange('subtitle', v)} type="textarea" />
      <Field label="Texto del botón principal" value={data.ctaLabel} onChange={(v) => onChange('ctaLabel', v)} />

      <div className={styles.sectionTitle} style={{ marginTop: 32 }}>Slides de fondo (rotan cada 5 seg)</div>
      {data.slides.map((slide, i) => (
        <div key={i} className={styles.slideBlock}>
          <div className={styles.slideNum}>Slide {i + 1}</div>
          <Field
            label="Etiqueta"
            value={slide.label}
            onChange={(v) => {
              const slides = [...data.slides]
              slides[i] = { ...slides[i], label: v }
              onChange('slides', slides)
            }}
          />
          <Field
            label="Color acento (hex)"
            value={slide.accent}
            type="color"
            onChange={(v) => {
              const slides = [...data.slides]
              slides[i] = { ...slides[i], accent: v }
              onChange('slides', slides)
            }}
          />
          <Field
            label="URL imagen de fondo (opcional)"
            value={slide.image}
            hint="Ej: /hero/foto1.jpg — sube la imagen a la carpeta /public/hero/"
            onChange={(v) => {
              const slides = [...data.slides]
              slides[i] = { ...slides[i], image: v }
              onChange('slides', slides)
            }}
          />
        </div>
      ))}
    </div>
  )
}

// ── TAB: About ───────────────────────────────────────────────
function AboutTab({ data, onChange }) {
  const addChip = () => onChange('chips', [...data.chips, 'Nueva habilidad'])
  const removeChip = (i) => onChange('chips', data.chips.filter((_, idx) => idx !== i))
  const editChip = (i, v) => {
    const chips = [...data.chips]
    chips[i] = v
    onChange('chips', chips)
  }

  return (
    <div className={styles.tabContent}>
      <Field label="Eyebrow (texto pequeño arriba)" value={data.eyebrow} onChange={(v) => onChange('eyebrow', v)} />
      <Field label="Título principal" value={data.title} onChange={(v) => onChange('title', v)} type="textarea" />
      <Field label="Párrafo 1" value={data.para1} onChange={(v) => onChange('para1', v)} type="textarea" />
      <Field label="Párrafo 2" value={data.para2} onChange={(v) => onChange('para2', v)} type="textarea" />

      <div className={styles.sectionTitle} style={{ marginTop: 24 }}>Chips / habilidades</div>
      <div className={styles.chipsList}>
        {data.chips.map((chip, i) => (
          <div key={i} className={styles.chipRow}>
            <input
              className={styles.chipInput}
              value={chip}
              onChange={(e) => editChip(i, e.target.value)}
            />
            <button className={styles.removeBtn} onClick={() => removeChip(i)}>✕</button>
          </div>
        ))}
        <button className={styles.addBtn} onClick={addChip}>+ Agregar habilidad</button>
      </div>
    </div>
  )
}

// ── TAB: Services ────────────────────────────────────────────
function ServicesTab({ data, onChange }) {
  const update = (i, field, value) => {
    const next = [...data]
    next[i] = { ...next[i], [field]: value }
    onChange(next)
  }
  const updateTag = (si, ti, value) => {
    const next = [...data]
    const tags = [...next[si].tags]
    tags[ti] = value
    next[si] = { ...next[si], tags }
    onChange(next)
  }

  return (
    <div className={styles.tabContent}>
      {data.map((svc, i) => (
        <div key={i} className={styles.serviceBlock}>
          <div className={styles.slideNum}>Servicio {i + 1}</div>
          <Field label="Emoji" value={svc.emoji} onChange={(v) => update(i, 'emoji', v)} />
          <Field label="Nombre" value={svc.name} onChange={(v) => update(i, 'name', v)} />
          <Field label="Descripción" value={svc.desc} onChange={(v) => update(i, 'desc', v)} type="textarea" />
          <div className={styles.fieldLabel} style={{ marginTop: 8 }}>Tags</div>
          {svc.tags.map((tag, ti) => (
            <input
              key={ti}
              className={styles.tagInput}
              value={tag}
              onChange={(e) => updateTag(i, ti, e.target.value)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

// ── TAB: Portfolio ───────────────────────────────────────────
function PortfolioTab({ data, onChange }) {
  const update = (i, field, value) => {
    const next = [...data]
    next[i] = { ...next[i], [field]: value }
    // Auto-set type based on what's filled
    if (field === 'embedId' && value)    next[i].type = 'youtube'
    if (field === 'embedUrl' && value)   next[i].type = 'instagram'
    if (field === 'embedId' && !value && !next[i].embedUrl) next[i].type = 'placeholder'
    if (field === 'embedUrl' && !value && !next[i].embedId) next[i].type = 'placeholder'
    onChange(next)
  }

  return (
    <div className={styles.tabContent}>
      <div className={styles.infoBox}>
        💡 Para mostrar un video real: rellena el <strong>ID de YouTube</strong> (lo que va después de ?v=) o la <strong>URL del Reel</strong> de Instagram. Si dejas ambos vacíos, se muestra el placeholder visual.
      </div>
      {data.map((item, i) => (
        <div key={item.id} className={styles.portfolioBlock}>
          <div className={styles.slideNum}>Trabajo {i + 1} — {item.category}</div>
          <Field label="Categoría" value={item.category} onChange={(v) => update(i, 'category', v)} />
          <Field label="Título" value={item.title} onChange={(v) => update(i, 'title', v)} />
          <Field label="Descripción" value={item.desc} onChange={(v) => update(i, 'desc', v)} type="textarea" />
          <Field label="Plataforma" value={item.platform} onChange={(v) => update(i, 'platform', v)} />
          <Field label="Emoji (placeholder)" value={item.emoji} onChange={(v) => update(i, 'emoji', v)} />
          <div className={styles.embedRow}>
            <Field
              label="ID de YouTube"
              value={item.embedId}
              hint="Ej: dQw4w9WgXcQ (de youtube.com/watch?v=dQw4w9WgXcQ)"
              onChange={(v) => update(i, 'embedId', v)}
            />
            <Field
              label="URL Reel Instagram"
              value={item.embedUrl}
              hint="Ej: https://www.instagram.com/reel/XXXXX/embed"
              onChange={(v) => update(i, 'embedUrl', v)}
            />
          </div>
          <div className={styles.typeIndicator}>
            Modo actual:{' '}
            <strong>
              {item.embedId ? '▶ YouTube' : item.embedUrl ? '📸 Instagram Reel' : '🎨 Placeholder visual'}
            </strong>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── TAB: Redes ───────────────────────────────────────────────
function RedesTab({ data, onChange }) {
  const update = (i, field, value) => {
    const next = [...data]
    next[i] = { ...next[i], [field]: value }
    onChange(next)
  }

  return (
    <div className={styles.tabContent}>
      {data.map((red, i) => (
        <div key={red.platform} className={styles.redBlock}>
          <div className={styles.slideNum}>{red.platform}</div>
          <Field label="Handle / nombre" value={red.handle} onChange={(v) => update(i, 'handle', v)} />
          <Field label="Seguidores (texto)" value={red.followers} hint="Ej: 12.5K+" onChange={(v) => update(i, 'followers', v)} />
          <Field label="Descripción" value={red.desc} onChange={(v) => update(i, 'desc', v)} type="textarea" />
          <Field label="URL del perfil" value={red.url} onChange={(v) => update(i, 'url', v)} />
        </div>
      ))}
    </div>
  )
}

// ── TAB: Contact ─────────────────────────────────────────────
function ContactTab({ data, onChange }) {
  return (
    <div className={styles.tabContent}>
      <Field
        label="Email de contacto"
        value={data.email}
        onChange={(v) => onChange('email', v)}
      />
      <Field
        label="WhatsApp (con código de país)"
        value={data.whatsapp}
        hint="Ej: +584120000000"
        onChange={(v) => onChange('whatsapp', v)}
      />
      <Field
        label="Formspree ID"
        value={data.formspreeId}
        hint="Obtén tu ID gratis en formspree.io — los mensajes del formulario llegarán a tu email"
        onChange={(v) => onChange('formspreeId', v)}
      />
      {data.formspreeId && (
        <div className={styles.successBox}>
          ✅ Formulario conectado. Los mensajes llegarán a <strong>{data.email}</strong>
        </div>
      )}
    </div>
  )
}

// ── MAIN PANEL ───────────────────────────────────────────────
export default function AdminPanel({ onLogout }) {
  const { content, saveContent, resetContent } = useSite()
  const [activeTab, setActiveTab] = useState('hero')
  const [localContent, setLocalContent] = useState(() => JSON.parse(JSON.stringify(content)))
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    saveContent(localContent)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleReset = () => {
    if (confirm('¿Resetear todo el contenido a los valores originales? No se puede deshacer.')) {
      resetContent()
      window.location.reload()
    }
  }

  const updateSection = (section, field, value) => {
    setLocalContent((prev) => ({
      ...prev,
      [section]: typeof field === 'string'
        ? { ...prev[section], [field]: value }
        : field, // field is the whole new array
    }))
  }

  return (
    <div className={styles.panel}>

      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.logoText}>Karolayntv</span>
          <span className={styles.logoAdmin}>Admin</span>
        </div>

        <nav className={styles.nav}>
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`${styles.navBtn} ${activeTab === t.id ? styles.navBtnActive : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className={styles.sidebarBottom}>
          <a href="/" target="_blank" className={styles.viewSiteBtn}>
            Ver sitio →
          </a>
          <button className={styles.logoutBtn} onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={styles.main}>

        {/* Header */}
        <div className={styles.mainHeader}>
          <div>
            <h1 className={styles.mainTitle}>
              {tabs.find((t) => t.id === activeTab)?.label}
            </h1>
            <p className={styles.mainSub}>
              Los cambios se guardan cuando presionas "Guardar cambios"
            </p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.resetBtn} onClick={handleReset}>
              Resetear todo
            </button>
            <button
              className={`${styles.saveBtn} ${saved ? styles.saveBtnOk : ''}`}
              onClick={handleSave}
            >
              {saved ? '✓ Guardado' : 'Guardar cambios'}
            </button>
          </div>
        </div>

        {/* Tab content */}
        <div className={styles.mainBody}>
          {activeTab === 'hero' && (
            <HeroTab
              data={localContent.hero}
              onChange={(field, value) => updateSection('hero', field, value)}
            />
          )}
          {activeTab === 'about' && (
            <AboutTab
              data={localContent.about}
              onChange={(field, value) => updateSection('about', field, value)}
            />
          )}
          {activeTab === 'services' && (
            <ServicesTab
              data={localContent.services}
              onChange={(newArr) => setLocalContent((p) => ({ ...p, services: newArr }))}
            />
          )}
          {activeTab === 'portfolio' && (
            <PortfolioTab
              data={localContent.portfolio}
              onChange={(newArr) => setLocalContent((p) => ({ ...p, portfolio: newArr }))}
            />
          )}
          {activeTab === 'redes' && (
            <RedesTab
              data={localContent.redes}
              onChange={(newArr) => setLocalContent((p) => ({ ...p, redes: newArr }))}
            />
          )}
          {activeTab === 'contact' && (
            <ContactTab
              data={localContent.contact}
              onChange={(field, value) => updateSection('contact', field, value)}
            />
          )}
        </div>
      </main>
    </div>
  )
}
