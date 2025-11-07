import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Custom hook that scrolls the window to the top
 * whenever the route changes, ensuring pages load at the top
 */
export function useScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto', // Use 'auto' for immediate scroll without animation
    })
  }, [pathname])
}