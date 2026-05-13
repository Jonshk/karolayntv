import { createContext, useContext, useState, useEffect } from 'react'
import { defaultContent } from './siteContent'

const STORAGE_KEY = 'karolayntv_content'
const BIN_ID      = '6a039742250b1311c33f17d8'
const ACCESS_KEY  = '$2a$10$N84VnO0Zx4lNyVUGGwE99eY6Di8l3WoDOr8fE2FxqSyfL9ZBOWzgS'
const BIN_URL     = `https://api.jsonbin.io/v3/b/${BIN_ID}`

const SiteContext = createContext(null)

async function fetchFromCloud() {
  try {
    const res = await fetch(BIN_URL + '/latest', {
      headers: { 'X-Access-Key': ACCESS_KEY }
    })
    const data = await res.json()
    if (data.record && data.record.hero) return data.record
    return null
  } catch { return null }
}

async function saveToCloud(content) {
  try {
    await fetch(BIN_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Key': ACCESS_KEY
      },
      body: JSON.stringify(content)
    })
  } catch (e) { console.error('Error saving to cloud:', e) }
}

export function SiteProvider({ children }) {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
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

  useEffect(() => {
    fetchFromCloud().then((cloudContent) => {
      if (cloudContent) {
        const merged = deepMerge(defaultContent, cloudContent)
        setContent(merged)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
      }
    })
  }, [])

  const saveContent = async (newContent) => {
    setContent(newContent)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent))
    await saveToCloud(newContent)
  }

  const resetContent = async () => {
    localStorage.removeItem(STORAGE_KEY)
    setContent(defaultContent)
    await saveToCloud(defaultContent)
  }

  return (
    <SiteContext.Provider value={{ content, updateContent, saveContent, resetContent }}>
      {children}
    </SiteContext.Provider>
  )
}

export const useSite = () => useContext(SiteContext)

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