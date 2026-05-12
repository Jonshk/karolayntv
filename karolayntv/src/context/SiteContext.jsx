import { createContext, useContext, useState, useEffect } from 'react'
import { defaultContent } from './siteContent'

const STORAGE_KEY = 'karolayntv_content'

const SiteContext = createContext(null)

export function SiteProvider({ children }) {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        // Deep merge saved over defaults (handles new fields added later)
        const parsed = JSON.parse(saved)
        return deepMerge(defaultContent, parsed)
      }
    } catch {}
    return defaultContent
  })

  const updateContent = (path, value) => {
    setContent((prev) => {
      const next = deepClone(prev)
      setDeep(next, path, value)
      return next
    })
  }

  const saveContent = (newContent) => {
    setContent(newContent)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent))
  }

  const resetContent = () => {
    localStorage.removeItem(STORAGE_KEY)
    setContent(defaultContent)
  }

  return (
    <SiteContext.Provider value={{ content, updateContent, saveContent, resetContent }}>
      {children}
    </SiteContext.Provider>
  )
}

export const useSite = () => useContext(SiteContext)

// ── Helpers ──────────────────────────────────────────────────
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function setDeep(obj, path, value) {
  const keys = path.split('.')
  let cur = obj
  for (let i = 0; i < keys.length - 1; i++) {
    cur = cur[keys[i]]
  }
  cur[keys[keys.length - 1]] = value
}

function deepMerge(base, override) {
  const result = deepClone(base)
  for (const key of Object.keys(override)) {
    if (
      override[key] &&
      typeof override[key] === 'object' &&
      !Array.isArray(override[key])
    ) {
      result[key] = deepMerge(base[key] || {}, override[key])
    } else {
      result[key] = override[key]
    }
  }
  return result
}
