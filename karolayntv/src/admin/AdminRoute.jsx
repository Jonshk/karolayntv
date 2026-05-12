import { useState, useEffect } from 'react'
import AdminLogin from './AdminLogin'
import AdminPanel from './AdminPanel'

const SESSION_KEY = 'karolayntv_admin_session'

export default function AdminRoute() {
  const [logged, setLogged] = useState(() => {
    return sessionStorage.getItem(SESSION_KEY) === 'true'
  })

  const handleLogin = () => {
    sessionStorage.setItem(SESSION_KEY, 'true')
    setLogged(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setLogged(false)
  }

  // Hide main site cursor in admin
  useEffect(() => {
    document.body.style.cursor = 'default'
    return () => { document.body.style.cursor = 'none' }
  }, [])

  return logged
    ? <AdminPanel onLogout={handleLogout} />
    : <AdminLogin onLogin={handleLogin} />
}
