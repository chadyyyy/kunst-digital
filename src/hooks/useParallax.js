import { useEffect, useState, useRef } from 'react'

export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      
      // Schedule update on next frame
      rafRef.current = requestAnimationFrame(() => {
        setOffset(window.scrollY * speed)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial calculation
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [speed])

  return offset
}

export default useParallax
