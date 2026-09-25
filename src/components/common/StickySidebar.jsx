import { useEffect, useRef, useState } from 'react'

// Gap kept between the sticky navbar and the sidebar.
const TOP_OFFSET = 96

/**
 * Desktop sidebar that sticks while the main content scrolls, then scrolls
 * away with the column once its bottom meets the end of the content.
 * A sidebar taller than the viewport sticks by its bottom edge instead, so
 * every item stays reachable.
 */
export default function StickySidebar({ children }) {
  const ref = useRef(null)
  const [top, setTop] = useState(TOP_OFFSET)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () =>
      setTop(Math.min(TOP_OFFSET, window.innerHeight - el.offsetHeight - 24))
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    window.addEventListener('resize', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div ref={ref} className="hl-sticky-side" style={{ '--hl-sticky-top': `${top}px` }}>
      {children}
    </div>
  )
}
