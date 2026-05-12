import { useState } from 'react'
import { useSite } from '../context/SiteContext'
import styles from './AdminPanel.module.css'

const tabs = [
  { id: 'hero', label: '🏠 Hero' },
  { id: 'about', label: '👤 Sobre mí' },
  { id: 'services', label: '🎯 Servicios' },
  { id: 'portfolio', label: '🎬 Portfolio' },
  { id: 'redes', label: '📱 Redes' },
  { id: 'contact', label: '✉️ Contacto' },
]

function Field({ label, value, onChange, type = 'text', hint }) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      {hint && <span className={styles.fieldHint}>{hint}</span>}

      {type === 'textarea' ? (
        <textarea
          className={styles.textarea}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
        />
      ) : (
        <input
          type={type}
          className={styles.input}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  )
}

function FileUploadField({ label, value, onChange, accept = 'image/*', hint }) {
  const handleFile = (file) => {
    if (!file) return

    const maxSizeMB = 12
    const sizeMB = file.size / 1024 / 1024

    if (sizeMB > maxSizeMB) {
      alert(`El archivo pesa ${sizeMB.toFixed(1)} MB. Máximo permitido: ${maxSizeMB} MB.`)
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      onChange(reader.result)
    }

    reader.readAsDataURL(file)
  }

  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      {hint && <span className={styles.fieldHint}>{hint}</span>}

      <label className={styles.uploadBox}>
        <input
          type="file"
          accept={accept}
          className={styles.fileInput}
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        <span className={styles.uploadIcon}>⬆</span>
        <span className={styles.uploadText}>Seleccionar archivo</span>
        <span className={styles.uploadHint}>Imagen o video desde tu PC</span>
      </label>

      {value && String(value).startsWith('data:') && (
        <div className={styles.previewBox}>
          {String(value).startsWith('data:video') ? (
            <video className={styles.previewVideo} src={value} controls />
          ) : (
            <img className={styles.previewImage} src={value} alt="Vista previa" />
          )}

          <button
            type="button"
            className={styles.clearMediaBtn}
            onClick={() => onChange('')}
          >
            Quitar archivo
          </button>
        </div>
      )}
    </div>
  )
}

function HeroTab({ data, onChange }) {
  return (
    <div className={styles.tabContent}>
      <div className={styles.sectionTitle}>Texto principal</div>

      <Field label="Nombre línea 1" value={data.headline1} onChange={(v) => onChange('headline1', v)} />
      <Field label="Nombre línea 2" value={data.headline2} onChange={(v) => onChange('headline2', v)} />
      <Field label="Subtítulo" value={data.subtitle} onChange={(v) => onChange('subtitle', v)} type="textarea" />
      <Field label="Texto del botón principal" value={data.ctaLabel} onChange={(v) => onChange('ctaLabel', v)} />

      <div className={styles.sectionTitle} style={{ marginTop: 32 }}>
        Slides de fondo
      </div>

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
            label="Color acento"
            value={slide.accent}
            type="color"
            onChange={(v) => {
              const slides = [...data.slides]
              slides[i] = { ...slides[i], accent: v }
              onChange('slides', slides)
            }}
          />

          <FileUploadField
            label="Subir imagen de fondo"
            value={slide.image}
            accept="image/*"
            hint="Recomendado para hero: imagen horizontal 1920x1080."
            onChange={(v) => {
              const slides = [...data.slides]
              slides[i] = { ...slides[i], image: v }
              onChange('slides', slides)
            }}
          />

          <Field
            label="O pegar URL manual"
            value={slide.image && !String(slide.image).startsWith('data:') ? slide.image : ''}
            hint="Ejemplo: /hero/foto1.jpg"
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
      <Field label="Eyebrow" value={data.eyebrow} onChange={(v) => onChange('eyebrow', v)} />
      <Field label="Título principal" value={data.title} onChange={(v) => onChange('title', v)} type="textarea" />
      <Field label="Párrafo 1" value={data.para1} onChange={(v) => onChange('para1', v)} type="textarea" />
      <Field label="Párrafo 2" value={data.para2} onChange={(v) => onChange('para2', v)} type="textarea" />

      <div className={styles.sectionTitle} style={{ marginTop: 24 }}>
        Imagen / tarjeta izquierda
      </div>

      <FileUploadField
        label="Subir imagen Sobre mí"
        value={data.image || ''}
        accept="image/*"
        hint="Imagen vertical recomendada."
        onChange={(v) => onChange('image', v)}
      />

      <Field label="Nombre del badge" value={data.badgeName || ''} onChange={(v) => onChange('badgeName', v)} />
      <Field label="Rol del badge" value={data.badgeRole || ''} onChange={(v) => onChange('badgeRole', v)} />

      <div className={styles.sectionTitle} style={{ marginTop: 24 }}>
        Chips / habilidades
      </div>

      <div className={styles.chipsList}>
        {data.chips.map((chip, i) => (
          <div key={i} className={styles.chipRow}>
            <input
              className={styles.chipInput}
              value={chip}
              onChange={(e) => editChip(i, e.target.value)}
            />

            <button className={styles.removeBtn} onClick={() => removeChip(i)}>
              ✕
            </button>
          </div>
        ))}

        <button className={styles.addBtn} onClick={addChip}>
          + Agregar habilidad
        </button>
      </div>
    </div>
  )
}

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

          <div className={styles.fieldLabel} style={{ marginTop: 8 }}>
            Tags
          </div>

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

function PortfolioTab({ data, onChange }) {
  const update = (i, field, value) => {
    const next = [...data]
    next[i] = { ...next[i], [field]: value }

    if (field === 'embedId' && value) next[i].type = 'youtube'
    if (field === 'embedUrl' && value) next[i].type = 'instagram'
    if (field === 'tiktokUrl' && value) next[i].type = 'tiktok'
    if (field === 'mediaFile' && value) {
      next[i].type = String(value).startsWith('data:video') ? 'video' : 'image'
    }

    if (
      !next[i].embedId &&
      !next[i].embedUrl &&
      !next[i].tiktokUrl &&
      !next[i].mediaFile
    ) {
      next[i].type = 'placeholder'
    }

    onChange(next)
  }

  const updateTag = (wi, ti, value) => {
    const next = [...data]
    const tags = [...(next[wi].tags || [])]
    tags[ti] = value
    next[wi] = { ...next[wi], tags }
    onChange(next)
  }

  const addTag = (wi) => {
    const next = [...data]
    next[wi] = {
      ...next[wi],
      tags: [...(next[wi].tags || []), 'Nuevo tag']
    }
    onChange(next)
  }

  const removeTag = (wi, ti) => {
    const next = [...data]
    next[wi] = {
      ...next[wi],
      tags: (next[wi].tags || []).filter((_, index) => index !== ti)
    }
    onChange(next)
  }

  return (
    <div className={styles.tabContent}>
      <div className={styles.infoBox}>
        ✅ Soporta YouTube, Instagram, TikTok, subida directa de imagen/video y placeholder automático.
      </div>

      {data.map((item, i) => (
        <div key={item.id} className={styles.portfolioBlock}>
          <div className={styles.slideNum}>
            Trabajo {i + 1} — {item.category}
          </div>

          <Field label="Categoría" value={item.category} onChange={(v) => update(i, 'category', v)} />
          <Field label="Título" value={item.title} onChange={(v) => update(i, 'title', v)} />
          <Field label="Descripción" value={item.desc} onChange={(v) => update(i, 'desc', v)} type="textarea" />
          <Field label="Plataforma" value={item.platform} onChange={(v) => update(i, 'platform', v)} />
          <Field label="Emoji placeholder" value={item.emoji} onChange={(v) => update(i, 'emoji', v)} />
          <Field label="Gradiente placeholder" value={item.gradient || ''} hint="Ej: linear-gradient(135deg, #111, #e63946)" onChange={(v) => update(i, 'gradient', v)} />

          <FileUploadField
            label="Subir imagen o video"
            value={item.mediaFile || ''}
            accept="image/*,video/*"
            hint="Para videos pesados, mejor usar YouTube/TikTok."
            onChange={(v) => update(i, 'mediaFile', v)}
          />

          <div className={styles.embedRow}>
            <Field
              label="ID YouTube"
              value={item.embedId || ''}
              hint="Ej: dQw4w9WgXcQ"
              onChange={(v) => {
                let id = v
              
                if (v.includes('youtube.com/watch?v=')) {
                  id = v.split('v=')[1]?.split('&')[0]
                }
              
                if (v.includes('youtu.be/')) {
                  id = v.split('youtu.be/')[1]?.split('?')[0]
                }
              
                update(i, 'embedId', id)
              }}            />

            <Field
              label="URL Instagram"
              value={item.embedUrl || ''}
              hint="Ej: https://www.instagram.com/p/DXEjIjEhdRX/"
              onChange={(v) => update(i, 'embedUrl', v)}
            />
          </div>

          <Field
            label="URL TikTok"
            value={item.tiktokUrl || ''}
            hint="Ej: https://www.tiktok.com/@usuario/video/123456789"
            onChange={(v) => update(i, 'tiktokUrl', v)}
          />

          <div className={styles.sectionTitle} style={{ marginTop: 10 }}>
            Tags
          </div>

          {(item.tags || []).map((tag, ti) => (
            <div key={ti} className={styles.chipRow}>
              <input
                className={styles.chipInput}
                value={tag}
                onChange={(e) => updateTag(i, ti, e.target.value)}
              />

              <button className={styles.removeBtn} onClick={() => removeTag(i, ti)}>
                ✕
              </button>
            </div>
          ))}

          <button className={styles.addBtn} onClick={() => addTag(i)}>
            + Agregar tag
          </button>

          <div className={styles.typeIndicator}>
            Modo actual:{' '}
            <strong>
              {item.mediaFile
                ? String(item.mediaFile).startsWith('data:video')
                  ? '🎬 Video subido'
                  : '🖼️ Imagen subida'
                : item.tiktokUrl
                  ? '🎵 TikTok'
                  : item.embedId
                    ? '▶ YouTube'
                    : item.embedUrl
                      ? '📸 Instagram'
                      : '🎨 Placeholder'}
            </strong>
          </div>
        </div>
      ))}
    </div>
  )
}

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
          <Field label="Seguidores" value={red.followers} onChange={(v) => update(i, 'followers', v)} />
          <Field label="Descripción" value={red.desc} onChange={(v) => update(i, 'desc', v)} type="textarea" />
          <Field label="URL del perfil" value={red.url} onChange={(v) => update(i, 'url', v)} />
        </div>
      ))}
    </div>
  )
}

function ContactTab({ data, onChange }) {
  return (
    <div className={styles.tabContent}>
      <Field label="Email de contacto" value={data.email} onChange={(v) => onChange('email', v)} />
      <Field label="WhatsApp" value={data.whatsapp} hint="Ej: +584120000000" onChange={(v) => onChange('whatsapp', v)} />
      <Field label="Formspree ID" value={data.formspreeId} onChange={(v) => onChange('formspreeId', v)} />

      {data.formspreeId && (
        <div className={styles.successBox}>
          ✅ Formulario conectado. Los mensajes llegarán a <strong>{data.email}</strong>
        </div>
      )}
    </div>
  )
}

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
        : field,
    }))
  }

  return (
    <div className={styles.panel}>
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

      <main className={styles.main}>
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

        <div className={styles.mainBody}>
          {activeTab === 'hero' && (
            <HeroTab data={localContent.hero} onChange={(field, value) => updateSection('hero', field, value)} />
          )}

          {activeTab === 'about' && (
            <AboutTab data={localContent.about} onChange={(field, value) => updateSection('about', field, value)} />
          )}

          {activeTab === 'services' && (
            <ServicesTab data={localContent.services} onChange={(newArr) => setLocalContent((p) => ({ ...p, services: newArr }))} />
          )}

          {activeTab === 'portfolio' && (
            <PortfolioTab data={localContent.portfolio} onChange={(newArr) => setLocalContent((p) => ({ ...p, portfolio: newArr }))} />
          )}

          {activeTab === 'redes' && (
            <RedesTab data={localContent.redes} onChange={(newArr) => setLocalContent((p) => ({ ...p, redes: newArr }))} />
          )}

          {activeTab === 'contact' && (
            <ContactTab data={localContent.contact} onChange={(field, value) => updateSection('contact', field, value)} />
          )}
        </div>
      </main>
    </div>
  )
}