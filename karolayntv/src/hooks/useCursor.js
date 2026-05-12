import { useEffect, useRef } from 'react'

export function useCursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const rafId = useRef(null)

  useEffect(() => {
    const dot = cursorRef.current
    const ringEl = ringRef.current
    if (!dot || !ringEl) return

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      dot.style.left = e.clientX + 'px'
      dot.style.top = e.clientY + 'px'
    }

    const animateRing = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12
      ringEl.style.left = ring.current.x + 'px'
      ringEl.style.top = ring.current.y + 'px'
      rafId.current = requestAnimationFrame(animateRing)
    }

    const onEnterInteractive = () => {
      ringEl.style.width = '64px'
      ringEl.style.height = '64px'
      ringEl.style.opacity = '0.35'
      dot.style.transform = 'translate(-50%, -50%) scale(0.5)'
    }

    const onLeaveInteractive = () => {
      ringEl.style.width = '36px'
      ringEl.style.height = '36px'
      ringEl.style.opacity = '0.6'
      dot.style.transform = 'translate(-50%, -50%) scale(1)'
    }

    document.addEventListener('mousemove', onMove)
    rafId.current = requestAnimationFrame(animateRing)

    const interactives = document.querySelectorAll(
      'a, button, [data-cursor]'
    )
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive)
      el.addEventListener('mouseleave', onLeaveInteractive)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return { cursorRef, ringRef }
}
