import { useState, useEffect, useCallback, useRef } from 'react'

export function useSlideNavigation(totalSlides) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const touchStart = useRef(null)

  const goTo = useCallback((index) => {
    if (index < 0 || index >= totalSlides || index === current) return
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }, [current, totalSlides])

  const next = useCallback(() => {
    if (current < totalSlides - 1) {
      setDirection(1)
      setCurrent(c => c + 1)
    }
  }, [current, totalSlides])

  const prev = useCallback(() => {
    if (current > 0) {
      setDirection(-1)
      setCurrent(c => c - 1)
    }
  }, [current])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev()
      if (e.key === 'f' || e.key === 'F') {
        if (document.fullscreenElement) {
          document.exitFullscreen()
        } else {
          document.documentElement.requestFullscreen()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [next, prev])

  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStart.current = e.touches[0].clientX
    }
    const handleTouchEnd = (e) => {
      if (touchStart.current === null) return
      const diff = touchStart.current - e.changedTouches[0].clientX
      if (Math.abs(diff) > 50) {
        if (diff > 0) next()
        else prev()
      }
      touchStart.current = null
    }
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [next, prev])

  return { current, direction, next, prev, goTo }
}
