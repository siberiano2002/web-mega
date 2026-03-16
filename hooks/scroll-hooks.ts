"use client"

import { useState, useEffect, useCallback } from "react"
import { useThrottle } from "@/hooks/performance-hooks"

export function useScrollPosition(threshold: number = 50) {
  const [scrolled, setScrolled] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    setScrollY(currentScrollY)
    setScrolled(currentScrollY > threshold)
  }, [threshold])

  const throttledHandleScroll = useThrottle(handleScroll, 16) // ~60fps

  useEffect(() => {
    window.addEventListener("scroll", throttledHandleScroll, { passive: true })
    return () => window.removeEventListener("scroll", throttledHandleScroll)
  }, [throttledHandleScroll])

  return { scrolled, scrollY }
}

export function useActiveSection(sections: string[]) {
  const [activeSection, setActiveSection] = useState(sections[0] || "")

  const updateActiveSection = useCallback(() => {
    const scrollPosition = window.scrollY + 100
    
    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        const { offsetTop, offsetHeight } = element
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }
  }, [sections])

  const throttledUpdate = useThrottle(updateActiveSection, 100)

  useEffect(() => {
    window.addEventListener("scroll", throttledUpdate, { passive: true })
    return () => window.removeEventListener("scroll", throttledUpdate)
  }, [throttledUpdate])

  return activeSection
}
